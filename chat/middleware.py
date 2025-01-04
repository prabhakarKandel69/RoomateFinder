import jwt
from channels.middleware import BaseMiddleware
from django.contrib.auth import get_user_model
from django.conf import settings
from channels.db import database_sync_to_async
from collections import deque

class JWTAuthMiddleware(BaseMiddleware):
    def __init__(self, inner):
        super().__init__(inner)

    async def __call__(self, scope, receive, send):
        # Extract JWT from the 'Authorization' header
        token = None
        for item in scope.get('headers', []):
            if item[0] == b'authorization':
                token = item[1].decode('utf-8').split(' ')[1]  # Extract token after 'Bearer'

        # If there's a token, validate it
        if token:
            try:
                payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
                user = await self.get_user(payload['user_id'])
                scope['user'] = user  # Attach user to scope
            except jwt.ExpiredSignatureError:
                # Token expired
                scope['user'] = None
            except jwt.DecodeError:
                # Invalid token
                scope['user'] = None
        else:
            # No token found, assign anonymous user
            scope['user'] = None

        # Call the next layer (e.g., consumer)
        return await super().__call__(scope, receive, send)

    # This method will retrieve the user from the database
    @database_sync_to_async
    def get_user(self, user_id):
        try:
            return get_user_model().objects.get(id=user_id)
        except get_user_model().DoesNotExist:
            return None
