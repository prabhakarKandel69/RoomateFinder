from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from api.models import UserProfile
from api.serializers import PublicUserProfileSerializer
from rest_framework.response import Response
from rest_framework import status


class MatchGetView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PublicUserProfileSerializer
    
    def get(self, request):
        try:
            user_profile = request.user.profile
        except UserProfile.DoesNotExist:
            return Response(
                {"error": "User profile not found."},
                status=status.HTTP_404_NOT_FOUND,
            )
        
        #Only based on smoking_allowed
        matching_profiles = UserProfile.objects.filter(smoking_allowed=user_profile.smoking_allowed).exclude(user=request.user)

        response_list = PublicUserProfileSerializer(matching_profiles, many=True).data

        return Response(response_list, status=status.HTTP_200_OK)
        
        
        
    





