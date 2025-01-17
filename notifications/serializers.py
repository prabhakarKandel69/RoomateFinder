from rest_framework import serializers
from .models import Notification


class NotificationSerializer(serializers.ModelSerializer):
    user1_username = serializers.CharField(source='user1.username', read_only=True)
    user2_username = serializers.CharField(source='user2.username', read_only=True)


    class Meta:
        model = Notification
        fields = ('id', 'user1', 'user2', 'notification_action', 'time', 'user1_username', 'user2_username')


