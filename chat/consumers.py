import django
django.setup()
from django.db.models import Q
from matches.models import Match


import json
from channels.generic.websocket import AsyncWebsocketConsumer
from django.contrib.auth.models import User
from channels.db import database_sync_to_async
from django.db.models import Q
from matches.models import Match  # Ensure this is the correct import


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f"chat_{self.room_name}"
        self.user = self.scope['user']

        # Parse the room name (e.g., "admin_prabh")
        users_in_room = self.room_name.split("_")
        if len(users_in_room) != 2:
            await self.close()
            return

        if self.user.username not in users_in_room:
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
            await self.close()
            return

        is_valid_match = await self.check_match(self.user, self.matching_user_obj)
        if not is_valid_match:
            await self.close()
            return

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        data = json.loads(text_data)
        message = data.get("message", "")

        if not message:
            await self.send(text_data=json.dumps({"error": "Message cannot be empty"}))
            return

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

        if self.user.username != sender:
            await self.send(text_data=json.dumps({
                "message": message,
                "sender": sender,
            }))
