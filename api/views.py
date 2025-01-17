from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import CreateAPIView
from .serializers import RegisterSerializer, UserProfileSerializer, PhotoSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
from .models import UserProfile
from rest_framework.permissions import IsAuthenticated
from .serializers import *
from django.contrib.auth.models import User
from django.core.mail import send_mail
from rest_framework_simplejwt.views import TokenObtainPairView
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework.parsers import MultiPartParser, FormParser



class CustomLogin(TokenObtainPairView):
    serializer_class = CustomLogin

class RegisterView(CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer

    def post(self,request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            subject = (
                "Thank you for choosing our platform!!!!"
            )
            message = (
                f"Hi {user.first_name} thanks for choosing roomatefinder\n\n"
            )

            send_mail(
                subject=subject,
                message=message,
                from_email=None,
                recipient_list=[user.email]
            )
            return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": "Successfully logged out"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class ProfileView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserProfileSerializer

    @swagger_auto_schema(
        operation_id='get profile of the current authenticated user/all fields',
    )
    def get(self, request):
        try:
            profile = request.user.profile
            serializer = UserProfileSerializer(profile)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except UserProfile.DoesNotExist:
            return Response({"error": "Profile does not exist"}, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        operation_id='create profile',
        request_body=UserProfileSerializer,
        responses={
            201: openapi.Response(
                description="Profile created successfully",
                schema=UserProfileSerializer
            ),
            400: openapi.Response(
                description="Bad Request",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'error': openapi.Schema(type=openapi.TYPE_STRING)
                    }
                )
            )
        }
    )
    def post(self, request):
        if hasattr(request.user, 'profile'):
            return Response({"error": "Profile already exists"}, status=status.HTTP_400_BAD_REQUEST)

        serializer = UserProfileSerializer(data=request.data)
        if serializer.is_valid():
            profile_pic = request.FILES.get('profile_pic')
            # Save the profile with or without a profile picture
            serializer.save(user=request.user, profile_pic=profile_pic)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        operation_id='update profile',
        request_body=UserProfileSerializer,
        responses={
            200: openapi.Response(
                description="Profile updated successfully",
                schema=UserProfileSerializer
            ),
            400: openapi.Response(
                description="Bad Request",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'error': openapi.Schema(type=openapi.TYPE_STRING)
                    }
                )
            )
        }
    )
    def put(self, request):
        try:
            # Retrieve the current user's profile
            profile = request.user.profile
        except UserProfile.DoesNotExist:
            return Response({"error": "Profile does not exist"}, status=status.HTTP_400_BAD_REQUEST)

        # Extract the profile_pic separately from FILES
        profile_pic = request.FILES.get('profile_pic')

        # Use data from the request to update the profile
        serializer = UserProfileSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            # Save the profile, including an optional profile picture
            serializer.save(profile_pic=profile_pic)
            return Response(serializer.data, status=status.HTTP_200_OK)

        # Return validation errors
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
    @swagger_auto_schema(
        operation_id='delete profile',
        responses={
            200: openapi.Response(
                description="Profile deleted successfully",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'message': openapi.Schema(type=openapi.TYPE_STRING)
                    }
                )
            ),
            400: openapi.Response(
                description="Bad Request",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'error': openapi.Schema(type=openapi.TYPE_STRING)
                    }
                )
            )
        }
    )
    def delete(self, request):
        user = request.user
        profile = request.user.profile
        try:
            profile.delete()
            return Response({"message": f"Profile deleted for {user.username}"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class DeleteAccountView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_id='delete account',
        responses={
            200: openapi.Response(
                description="Account deleted successfully",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'message': openapi.Schema(type=openapi.TYPE_STRING)
                    }
                )
            ),
            400: openapi.Response(
                description="Bad Request",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'error': openapi.Schema(type=openapi.TYPE_STRING)
                    }
                )
            )
        }
    )

    def delete(self,request):
        user = request.user
        try:
            user.delete()
            return Response({"message":f"Account deleted of {user.username}"},status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"message":e},status=status.HTTP_400_BAD_REQUEST)


class PublicProfileView(APIView):
    permission_classes = [AllowAny]
    def get(self, request, username):
        try:
            user = User.objects.get(username=username)
            profile = user.profile
            serializer = PublicUserProfileSerializer(profile)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
        except UserProfile.DoesNotExist:
            return Response({"error": "Profile not found."}, status=status.HTTP_404_NOT_FOUND)

class PhotoUploadView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PhotoSerializer
    parser_classes = [MultiPartParser, FormParser]

    @swagger_auto_schema(
    operation_id='uploadPhoto',
    operation_description="Upload a photo for the authenticated user.",
    request_body=PhotoSerializer,
    responses={
        201: openapi.Response(
            description="Photo uploaded successfully",
            schema=PhotoSerializer
        ),
        400: openapi.Response(
            description="Bad Request",
            schema=openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    'error': openapi.Schema(type=openapi.TYPE_STRING, description='Error message detailing what went wrong.'),
                    'required_fields': openapi.Schema(type=openapi.TYPE_ARRAY, items=openapi.Items(type=openapi.TYPE_STRING)),
                    'details': openapi.Schema(type=openapi.TYPE_OBJECT)
                }
            )
        )
    },
    tags=['Photo']
)

    def post(self, request, *args, **kwargs):
        try:
            profile = request.user.profile
        except UserProfile.DoesNotExist:
            return Response({"error": "Profile needs to be there for photo uploads."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            serializer = PhotoSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(user=request.user)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response({
                    "error": "Validation failed",
                    "required_fields": ["photo", "photo_type"],
                    "details": serializer.errors
                }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        

class PhotoGetView(APIView):
    @swagger_auto_schema(
        operation_id='getPhotos',
        operation_description="Retrieve all photos uploaded by the authenticated user.",
        responses={
            200: openapi.Response(
                description="Photos retrieved successfully",
                schema=PhotoSerializer(many=True)
            ),
            400: openapi.Response(
                description="Bad Request",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'error': openapi.Schema(type=openapi.TYPE_STRING, description='Failed to fetch photos.'),
                    }
                )
            )
        },
        tags=['Photo']
    )
    
    def get(self, request):
        try:
            photos = request.user.photos.all()
            serializer = PhotoSerializer(photos, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class PhotoDeleteView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_id='deletePhoto',
        operation_description="Delete a photo for the authenticated user. The photo ID should be provided in the URL.",
        responses={
            200: openapi.Response(
                description="Photo deleted successfully",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'message': openapi.Schema(type=openapi.TYPE_STRING, description='Success message.')
                    }
                )
            ),
            404: openapi.Response(
                description="Photo not found",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'error': openapi.Schema(type=openapi.TYPE_STRING, description='Error message indicating the photo does not exist.')
                    }
                )
            ),
            400: openapi.Response(
                description="Bad Request",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'error': openapi.Schema(type=openapi.TYPE_STRING, description='Error message detailing what went wrong.')
                    }
                )
            )
        },
        tags=['Photo']
    )
    def delete(self, request, photo_id, *args, **kwargs):
        try:
            photo = UserPhoto.objects.get(id=photo_id, user=request.user)
            photo.delete()
            return Response({"message": "Photo deleted successfully"}, status=status.HTTP_200_OK)
        except UserPhoto.DoesNotExist:
            return Response({"error": "Photo does not exist"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class PublicPhotoGet(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_id='getPublicPhotos',
        operation_description="Retrieve all photos uploaded by a specified user.",
        manual_parameters=[
            openapi.Parameter(
                'username',
                openapi.IN_PATH,
                description="The username of the user whose photos are to be retrieved.",
                type=openapi.TYPE_STRING,
                required=True
            )
        ],
        responses={
            200: openapi.Response(
                description="Photos retrieved successfully",
                schema=PhotoSerializer(many=True)
            ),
            404: openapi.Response(
                description="User not found",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'error': openapi.Schema(type=openapi.TYPE_STRING, description='Error message indicating the user does not exist.')
                    }
                )
            ),
            400: openapi.Response(
                description="Bad Request",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'error': openapi.Schema(type=openapi.TYPE_STRING, description='Error message detailing what went wrong.')
                    }
                )
            )
        },
        tags=['Photo']
    )
    def get(self, request, username, *args, **kwargs):
        try:
            user = User.objects.get(username=username)
            photos = user.photos.all()
            serializer = PhotoSerializer(photos, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
