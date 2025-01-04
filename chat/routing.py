from django.urls import path
import django
django.setup()
from .consumers import ChatConsumer

websocket_urlpatterns = [
    path('ws/chat/<str:room_name>/', ChatConsumer.as_asgi()),
]
