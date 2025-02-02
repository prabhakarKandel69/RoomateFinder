import jwt
from channels.middleware import BaseMiddleware
from django.contrib.auth import get_user_model
from django.conf import settings
from channels.db import database_sync_to_async
from collections import deque
import logging

logger = logging.getLogger('django')

from urllib.parse import parse_qs

class JWTAuthMiddleware(BaseMiddleware):
    def __init__(self, inner):
        super().__init__(inner)

    async def __call__(self, scope, receive, send):
        # Extract token from query parameters
        query_string = scope.get("query_string", b"").decode("utf-8")
        query_params = parse_qs(query_string)
        token = query_params.get("token", [None])[0]  # Get the token from query params

        logger.info(f"Extracted token: {token}")

        if token:
            try:
                payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
                logger.info(f"Decoded payload: {payload}")
                user = await self.get_user(payload['user_id'])  # Call explicitly
                scope['user'] = user
            except jwt.ExpiredSignatureError:
                logger.error("Token is expired")
                scope['user'] = None
            except jwt.DecodeError:
                logger.error("Token decoding failed")
                scope['user'] = None
        else:
            logger.error("No token found in query parameters")
            scope['user'] = None

        return await super().__call__(scope, receive, send)

    @staticmethod
    @database_sync_to_async
    def get_user(user_id):
        try:
            return get_user_model().objects.get(id=user_id)
        except get_user_model().DoesNotExist:
            return None