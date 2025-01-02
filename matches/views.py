from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from api.models import UserProfile
from api.serializers import PublicUserProfileSerializer
from rest_framework.response import Response
from rest_framework import status



def calculate_match_score(user,profile):
    
    fields = ["smoking_allowed", "pets_allowed", "early_riser", "vegeterian", "gender_same_prefer", "introvert"]
    
    weights = {
        "smoking_allowed": 0.25,
        "pets_allowed": 0.20,
        "early_riser": 0.10,
        "vegeterian": 0.05,
        "gender_same_prefer": 0.10,
        "introvert": 0.05,
        "budget": 0.20,
        "address": 0.05
    }
    curr_profile = user.profile

    total = 0
    for field in fields:
        if (getattr(curr_profile,field) == getattr(profile,field)):
            total += weights[field]


    #for minimum and maximum budgets calculating overlap
    overlap = max(0,(min(curr_profile.max_budget,profile.max_budget) - max(curr_profile.min_budget,profile.min_budget)))  
    normalized_overlap = overlap/(curr_profile.max_budget - curr_profile.min_budget)

    total += (normalized_overlap)*weights["budget"]

    return total
    
    

    


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
        

        matched_profile = []
        matching_profile = UserProfile.objects.all().exclude(user=request.user)

        for profile in matching_profile:
            if(calculate_match_score(request.user,profile) > 0.5):
                print(calculate_match_score(request.user,profile))
                matched_profile.append(profile)

        
        

        response_list = PublicUserProfileSerializer(matched_profile, many=True).data
        

        return Response(response_list, status=status.HTTP_200_OK)
        
        
        
    





