from django.db import models
from django.contrib.auth.models import User

class Notification(models.Model):

    action = ['matched','matchrequest','messaged']

    user1 = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_1')
    user2 = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_2')

    notification_action = models.CharField(max_length=20, choices=[(i,i) for i in action])
    time = models.DateTimeField(auto_now_add=True)

    seen = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.user1.username} {self.notification_action} {self.user2.username}'
    
