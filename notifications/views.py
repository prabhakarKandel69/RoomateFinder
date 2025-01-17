from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import NotificationSerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Notification

class NotificationView(APIView):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def get(self,request):
        user = request.user
        notifications = Notification.objects.filter(user2=user)
        serializer = self.serializer_class(notifications, many=True)
        return Response(serializer.data)