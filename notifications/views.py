from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import NotificationSerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Notification
from drf_yasg.utils import swagger_auto_schema

class NotificationView(APIView):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]


    @swagger_auto_schema(
        operation_description="Retrieve all notifications for the authenticated user",
        responses={
            200: NotificationSerializer(many=True),
            401: "Unauthorized",
            403: "Forbidden"
        }
    )
    def get(self, request):
        user = request.user
        notifications = Notification.objects.filter(user2=user)
        serializer = self.serializer_class(notifications, many=True)
        data = serializer.data
        for item in data:
            item['user1_username'] = Notification.objects.get(id=item['id']).user1.username
            item['user2_username'] = Notification.objects.get(id=item['id']).user2.username
        Notification.objects.filter(user2=user).update(seen=True)
        return Response(data)