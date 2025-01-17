from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import UserProfile,UserPhoto


class CustomLogin(TokenObtainPairSerializer):
    def validate(self,attrs):
        username_or_email = attrs.get("username")
        password = attrs.get("password")

        user = None

        try:
            user = User.objects.get(email=username_or_email)
            attrs['username'] = user.username
        except User.DoesNotExist:
            pass

        return super().validate(attrs)
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
    email = serializers.EmailField(source="user.email", read_only=True)
    first_name = serializers.CharField(source="user.first_name", read_only=True)
    last_name = serializers.CharField(source="user.last_name", read_only=True)
    user_id = serializers.IntegerField(source="user.id", read_only=True)
    username = serializers.CharField(source="user.username", read_only=True)
    

    class Meta:
        model = UserProfile
        fields = (
            'age','gender','address','first_name','last_name','profile_pic', 'smoking_allowed','drinking_allowed',
            'pets_allowed', 'early_riser', 'vegeterian', 'gender_same_prefer',
            'introvert', 'min_budget', 'max_budget', 'is_looking','has_room','room_type','user_id','username','email'
        )

    

    def validate(self, attrs):
        # Ensure that min_budget is less than or equal to max_budget
        min_budget = attrs.get('min_budget')
        max_budget = attrs.get('max_budget')
        
        has_room = attrs.get('has_room')
        room_type = attrs.get('room_type')
        if min_budget and max_budget and min_budget > max_budget:
            raise serializers.ValidationError({
                'min_budget': "Minimum budget cannot be greater than maximum budget."
            })
        
        if has_room and not room_type:
            raise serializers.ValidationError({
                'room_type': "Room type must be specified if has_room is True."
            })
        
        if not has_room and room_type:
            raise serializers.ValidationError({
                'room_type': "Room type must not be specified if has_room is False."
            })
        return attrs

class PublicUserProfileSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source="user.first_name", read_only=True)
    last_name = serializers.CharField(source="user.last_name", read_only=True)
    username = serializers.CharField(source="user.username", read_only=True)
    email = serializers.CharField(source="user.email", read_only=True)
    user_id = serializers.IntegerField(source="user.id", read_only=True)

    class Meta:
        model = UserProfile
        fields = [
            'username', 'user_id', 'first_name', 'last_name', 'email',
            'address', 'profile_pic', 'min_budget', 
            'max_budget', 'has_room', 'room_type'
        ]

    def validate(self, data):
        """
        Ensure that room_type is valid based on the has_room field.
        """
        has_room = data.get('has_room', self.instance.has_room if self.instance else False)
        room_type = data.get('room_type', self.instance.room_type if self.instance else None)

        if has_room and not room_type:
            raise serializers.ValidationError(
                {"room_type": "Room type is required when 'has_room' is True."}
            )
        if not has_room and room_type:
            raise serializers.ValidationError(
                {"room_type": "Room type should not be set when 'has_room' is False."}
            )

        return data

    def to_representation(self, instance):
        """
        Customize the output representation.
        Exclude room_type from the response when has_room is False.
        """
        representation = super().to_representation(instance)
        if not instance.has_room:
            representation.pop('room_type', None)  # Remove room_type if has_room is False
        return representation

class PhotoSerializer(serializers.ModelSerializer):
    uploaded_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)
    username = serializers.CharField(source="user.username", read_only=True)
    user_id = serializers.IntegerField(source="user.id", read_only=True)

    class Meta:
        model = UserPhoto
        fields = ('photo', 'photo_type','uploaded_at','id','username','user_id')

    
    
