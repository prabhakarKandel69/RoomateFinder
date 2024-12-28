from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password

from .models import UserProfile


class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)

    age = serializers.IntegerField(required=True)
    profile_pic = serializers.ImageField(required=False,allow_null=True)
    gender = serializers.ChoiceField(choices=UserProfile.GENDER_CHOICES, required=True)
    address = serializers.CharField(max_length=255, required=True)
    smoking_allowed = serializers.BooleanField(required=False)
    pets_allowed = serializers.BooleanField(required=False)
    early_riser = serializers.BooleanField(required=False)
    vegeterian = serializers.BooleanField(required=False)
    gender_same_prefer = serializers.BooleanField(required=False)
    introvert = serializers.BooleanField(required=False)
    min_budget = serializers.IntegerField(required=False)
    max_budget = serializers.IntegerField(required=False)
    is_looking = serializers.BooleanField(required=True)

    class Meta:
        model = User
        fields = (
            'username', 'password', 'password2', 'email', 'profile_pic','first_name', 'last_name', 
            'age', 'gender', 'address', 'smoking_allowed', 'pets_allowed', 
            'early_riser', 'vegeterian', 'gender_same_prefer', 'introvert', 
            'min_budget', 'max_budget', 'is_looking'
        )

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        # Extract fields for User and UserProfile
        profile_fields = {
            'age': validated_data.pop('age', None),
            'gender': validated_data.pop('gender', None),
            'address': validated_data.pop('address', None),
            'smoking_allowed': validated_data.pop('smoking_allowed', False),
            'pets_allowed': validated_data.pop('pets_allowed', False),
            'early_riser': validated_data.pop('early_riser', False),
            'vegeterian': validated_data.pop('vegeterian', False),
            'gender_same_prefer': validated_data.pop('gender_same_prefer', False),
            'introvert': validated_data.pop('introvert', False),
            'min_budget': validated_data.pop('min_budget', None),
            'max_budget': validated_data.pop('max_budget', None),
            'profile_pic': validated_data.pop('profile_pic', None),
            'is_looking': validated_data.pop('is_looking', True),
        }

        # Create the User object
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        user.set_password(validated_data['password'])
        user.save()

        # Create the UserProfile
        UserProfile.objects.create(user=user, **profile_fields)

        return user

from rest_framework import serializers

class UserProfileSerializer(serializers.ModelSerializer):
    profile_pic = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = UserProfile
        fields = [
            'age', 'gender', 'address', 'profile_pic', 'smoking_allowed',
            'pets_allowed', 'early_riser', 'vegeterian', 'gender_same_prefer',
            'introvert', 'min_budget', 'max_budget', 'is_looking'
        ]

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Exclude age, gender, and address from required fields
        excluded_fields = ['age', 'gender', 'address', 'profile_pic'] 
        for field_name, field in self.fields.items():
            if field_name not in excluded_fields:
                field.required = True

    def validate(self, attrs):
        # Ensure that min_budget is less than or equal to max_budget
        min_budget = attrs.get('min_budget')
        max_budget = attrs.get('max_budget')
        if min_budget and max_budget and min_budget > max_budget:
            raise serializers.ValidationError({
                'min_budget': "Minimum budget cannot be greater than maximum budget."
            })
        return attrs
    
    