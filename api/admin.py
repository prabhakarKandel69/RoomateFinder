from django.contrib import admin
from .models import UserProfile,UserPhoto

# Register your models here.
admin.site.register(UserProfile)
admin.site.register(UserPhoto)
