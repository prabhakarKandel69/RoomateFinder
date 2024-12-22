from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    GENDER_CHOICES = [
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    age = models.PositiveIntegerField(null=True, blank=True)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, null=True, blank=True)
    address = models.CharField(max_length=255, null=True, blank=True)
    smoking_allowed = models.BooleanField(null=True, blank=True)
    pets_allowed = models.BooleanField(null=True, blank=True)
    early_riser = models.BooleanField(null=True, blank=True)
    vegeterian = models.BooleanField(null=True, blank=True)
    gender_same_prefer = models.BooleanField(null=True, blank=True)
    introvert = models.BooleanField(null=True, blank=True)
    min_budget = models.PositiveIntegerField(null=True, blank=True)
    max_budget = models.PositiveIntegerField(null=True, blank=True)



    def __str__(self):
        return f"{self.user.username}'s profile"
    


