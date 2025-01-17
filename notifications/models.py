from django.db import models
from django.contrib.auth.models import User

class Notification(models.Model):

    action = {
        'M':'matched',
        'm':'messaged',
    }

    user1 = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_1')
    user2 = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_2')

    notification_action = models.CharField(max_length=1, choices=action.items())

    def __str__(self):
        return f'{self.user1.username} {self.notification_action} {self.user2.username}'
    
