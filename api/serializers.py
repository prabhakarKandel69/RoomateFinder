from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password

from .models import UserProfile


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    

    
    class Meta:
        model = User
        fields = (
            'username', 'password', 'email','first_name','last_name'
            )

    

    def create(self, validated_data):
        

        # Create the User object
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        user.set_password(validated_data['password'])
        user.save()

        return user


class UserProfileSerializer(serializers.ModelSerializer):
    profile_pic = serializers.ImageField(required=False,allow_null=True)
    

    class Meta:
        model = UserProfile
        fields = (
            'age','gender','address','profile_pic', 'smoking_allowed',
            'pets_allowed', 'early_riser', 'vegeterian', 'gender_same_prefer',
            'introvert', 'min_budget', 'max_budget', 'is_looking'
        )

    

    def validate(self, attrs):
        # Ensure that min_budget is less than or equal to max_budget
        min_budget = attrs.get('min_budget')
        max_budget = attrs.get('max_budget')
        if min_budget and max_budget and min_budget > max_budget:
            raise serializers.ValidationError({
                'min_budget': "Minimum budget cannot be greater than maximum budget."
            })
        return attrs

class PublicUserProfileSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source="user.first_name",read_only=True)
    last_name = serializers.CharField(source="user.last_name",read_only=True)

    class Meta:
        model = UserProfile
        fields = ['first_name','last_name','address','profile_pic','min_budget','max_budget']

    
    