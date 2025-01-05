from django.db import models
from django.contrib.auth.models import User

class Match(models.Model):

    user_1 = models.ForeignKey(User,on_delete=models.CASCADE,related_name='user1')
    user_2 = models.ForeignKey(User,on_delete=models.CASCADE,related_name='user2')

    matched = models.BooleanField(default=False)

    def __str__(self):
        verb = "matched" if self.matched else "requested match"
        return f"{self.user_1} {verb} with {self.user_2}"
