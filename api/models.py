from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    GENDER_CHOICES = [
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other'),
    ]
    ROOM_TYPE_CHOICES = [
        ('S', 'Shared'),
        ('P', 'Private'),
    ]

    

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    age = models.PositiveIntegerField()
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    address = models.CharField(max_length=255)
    profile_pic = models.ImageField(upload_to='user/profile_pics/', null=True, blank=True)
    smoking_allowed = models.BooleanField()
    drinking_allowed = models.BooleanField()
    pets_allowed = models.BooleanField()
    early_riser = models.BooleanField()
    vegeterian = models.BooleanField()
    gender_same_prefer = models.BooleanField()
    introvert = models.BooleanField()
    min_budget = models.PositiveIntegerField()
    max_budget = models.PositiveIntegerField()
    is_looking = models.BooleanField()
    drinking_allowed = models.BooleanField(default=False)

    has_room = models.BooleanField(default=False)
    room_type = models.CharField(max_length=1, choices=ROOM_TYPE_CHOICES, blank=True,null=True)



    def __str__(self):
        return f"{self.user.username}'s profile"

class UserPhoto(models.Model):
    type = [
        ('P', 'Profile'),
        ('L', 'Living Spcae'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='photos')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    photo = models.ImageField(upload_to='user/photos/')
    photo_type = models.CharField(max_length=1, choices=type)


    def __str__(self):
        return f"{self.user.username}'s photo of type {self.photo_type}"