import django
django.setup()
from django.db.models import Q
from matches.models import Match
from channels.exceptions import StopConsumer
import base64
from RoomateFinder.settings import MEDIA_ROOT

import json
from channels.generic.websocket import AsyncWebsocketConsumer
from django.contrib.auth.models import User
from channels.db import database_sync_to_async
from django.db.models import Q
from matches.models import Match
import logging

logger = logging.getLogger('django')


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        users_in_room = self.room_name.split("_")
        self.room_group_name = f"chat_{min(users_in_room)}_{max(users_in_room)}"
        self.user = self.scope['user']

        # Parse the room name (e.g., "admin_prabh")
        
        if len(users_in_room) != 2:
            logger.error(f"Invalid room name: {self.room_name}")

            await self.close()
            return

        if self.user.username not in users_in_room:
            logger.error(f"User {self.user.username} not authorized for room {self.room_name}")
            await self.close()
            return

        self.matching_user = (
            users_in_room[0] if self.user.username == users_in_room[1] else users_in_room[1]
        )

        try:
            self.matching_user_obj = await database_sync_to_async(User.objects.get)(
                username=self.matching_user
            )
        except User.DoesNotExist:
            logger.error(f"Matching user {self.matching_user} does not exist.")
            await self.close()
            return

        is_valid_match = await self.check_match(self.user, self.matching_user_obj)
        if not is_valid_match:
            logger.error(f"No valid match found between {self.user.username} and {self.matching_user}")

            await self.close()
            return

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        logger.info(f"User {self.user.username} connected to {self.room_group_name}")
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
        logger.info(f"User {self.user.username} disconnected from {self.room_group_name}")

    async def receive(self, text_data):
        try:
            data = json.loads(text_data)
            message = data.get("message", "")
            attachment = data.get("attachment", None)

            # Log attachment data to check its format
            logger.info(f"Received attachment: {attachment}")

            if not message and not attachment:
                await self.send(text_data=json.dumps({
                    "error": "Message or attachment is required."
                }))
                return

            attachment_path = None
            if attachment:
                # If attachment exists, process the base64 image
                attachment_path = await database_sync_to_async(self.save_image_attachment)(attachment)

            await database_sync_to_async(self.save_message)(
                sender=self.user,
                recipient=self.matching_user_obj,
                message=message,
                attachment=attachment_path
            )

            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    "type": "chat_message",
                    "message": message,
                    "sender": self.user.username,
                    "attachment_url": attachment_path,  # Ensure this is the correct path
                }
            )
        except Exception as e:
            logger.error(f"Error in receive: {e}")
            await self.close()

    
    

    def save_image_attachment(self, base64_data):

        from pathlib import Path
        import uuid
        import base64
        from django.core.files.base import ContentFile

        try:
            # Split Base64 string and decode
            header, imgstr = base64_data.split(';base64,')
            img_data = base64.b64decode(imgstr)
        except (ValueError, base64.binascii.Error) as e:
            logger.error(f"Base64 decoding failed: {e}")
            raise ValueError("Invalid Base64 image data.")

        # Extract extension from header
        ext = header.split('/')[1].lower()
        allowed_extensions = ['jpg', 'jpeg', 'png']
        if ext not in allowed_extensions:
            logger.error(f"Unsupported file extension: {ext}")
            raise ValueError("Unsupported image format.")

        # Generate file name and path
        filename = f"user/attachments/{uuid.uuid4()}.{ext}"
        file_path = Path(MEDIA_ROOT) / filename

        # Ensure parent directory exists
        file_path.parent.mkdir(parents=True, exist_ok=True)

        try:
            # Save the file
            with open(file_path, "wb") as f:
                f.write(img_data)
        except Exception as e:
            logger.error(f"File saving failed: {e}")
            raise ValueError("Error saving image file.")

        # Confirm the file exists
        if not file_path.exists():
            logger.error(f"File saving failed: {file_path}")
            raise ValueError("File saving failed.")

        # Return the relative media URL
        return f"/media/{filename}"


            



    

        
    def save_message(self, sender, recipient, message,attachment):
        from chat.models import Message
        from notifications.models import Notification
        Message.objects.create(
            message_text=message,
            sender=sender,
            receiver=recipient,
            attachment=attachment,
        )

        Notification.objects.create(
            user1 = sender,
            user2 = recipient,
            notification_action = 'messaged'
        )

    @database_sync_to_async
    def check_match(self, user1, user2):
        return Match.objects.filter(
            (Q(user_1=user1, user_2=user2) | Q(user_1=user2, user_2=user1)),
            matched=True
        ).exists()

    async def chat_message(self, event):
        message = event["message"]
        sender = event["sender"]
        attachment_url = event.get("attachment_url")  # Fetch the attachment URL

        logger.info(f"Broadcasting message: {message} from {sender} with attachment: {attachment_url}")

        if self.user.username != sender:
            await self.send(text_data=json.dumps({
                "message": message,
                "sender": sender,
                "attachment_url": attachment_url,  # Include in response
            }))

