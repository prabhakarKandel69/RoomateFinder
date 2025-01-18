from django.db import models
from django.contrib.auth.models import User

class Message(models.Model):
    sender = models.ForeignKey(
        User,on_delete=models.CASCADE,related_name="sent_from"
    )
    receiver = models.ForeignKey(
        User,on_delete=models.CASCADE,related_name="sent_to"
    )
    sent_at = models.DateTimeField(auto_now_add=True)
    message_text = models.TextField()
    attachment = models.ImageField(upload_to="user/attachments/",null=True,blank=True)
    seen = models.BooleanField(default=False)
    seenat = models.DateTimeField(null=True,blank=True)

    class Meta:
        ordering = ["-sent_at"]

    def __str__(self):
        return f"{self.sender} message to {self.receiver}"
        
    
    