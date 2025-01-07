import django
django.setup()
from django.db.models import Q
from matches.models import Match


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
        data = json.loads(text_data)
        message = data.get("message", "")

        if not message:
            await self.send(text_data=json.dumps({"error": "Message cannot be empty"}))
            return

        logger.info(f"Received message from {self.user.username}: {message}")
        await database_sync_to_async(self.save_message)(
            sender=self.user,
            recipient=self.matching_user_obj,
            message=message
        )

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "chat_message",
                "message": message,
                "sender": self.user.username,
            }
        )

    def save_message(self, sender, recipient, message):
        from chat.models import Message
        Message.objects.create(
            message_text=message,
            sender=sender,
            receiver=recipient
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

        logger.info(f"Broadcasting message: {message} from {sender} in room {self.room_group_name}")

        if self.user.username != sender:
            await self.send(text_data=json.dumps({
                "message": message,
                "sender": sender,
            }))
