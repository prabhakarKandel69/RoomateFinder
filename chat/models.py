from django.db import models
from django.contrib.auth.models import User


class Message(models.Model):
    msg_text = models.TextField()
    attachment = models.ImageField(upload_to="user/messsages/",null=True,blank=True)
    sent_from = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="sender",
    )
    sent_to = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="receiver",
    )
    sent_time = models.DateTimeField(auto_now_add=True)
    seen = models.BooleanField(default=False)



