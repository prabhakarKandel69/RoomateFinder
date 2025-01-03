from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from api.models import UserProfile
from api.serializers import PublicUserProfileSerializer
from rest_framework.response import Response
from rest_framework import status
from .models import Match



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

        #for each profile calculating the match score
        for profile in matching_profile:
            print(calculate_match_score(request.user,profile))
            matched_profile.append({"profile":profile,"score":calculate_match_score(request.user,profile)})




        #sorting the the dictionary based on score
        for i in range(len(matched_profile)):
            for j in range(i,len(matched_profile)):
                if (matched_profile[j]["score"] > matched_profile[i]["score"]):
                    matched_profile[j],matched_profile[i] = matched_profile[i],matched_profile[j]

        
        
        matched_profile = [matched_profile[i]["profile"] for i in range(len(matched_profile))]
        

        response_list = PublicUserProfileSerializer(matched_profile, many=True).data
        

        return Response(response_list, status=status.HTTP_200_OK)
    

class MatchReqView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PublicUserProfileSerializer

    def post(self,request):
        requesting_user = request.user
        
        request_user = request.POST.get('first_name')
    
        request_user = User.objects.get(first_name=request_user)

        try:
            requesting_user_profile = requesting_user.profile
            try:
                request_user_profile = request_user.profile
                match = Match(user_1=requesting_user,user_2=request_user)
                match.save()
                return Response({"success":f"Sent match request to {request_user.first_name}"},status=status.HTTP_200_OK)

            except UserProfile.DoesNotExist:
                return Response({"error": "The user you requested doesnt have a profile."}, status=status.HTTP_400_BAD_REQUEST)

        except UserProfile.DoesNotExist:
            return Response({"error": "Your Profile does not exist"}, status=status.HTTP_400_BAD_REQUEST)

class MatchRequests(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PublicUserProfileSerializer

    def get(self,request):
        try:
            profile = request.user.profile
        except UserProfile.DoesNotExist:
            return Response({"error":"You don't have a profile"},status=status.HTTP_400_BAD_REQUEST)
        
        match_requests = Match.objects.filter(user_2=request.user)
        requesting_profile_list = []

        for match_req in match_requests:
            requesting_profile_list.append(match_req.user_1.profile)
        
        match_requests = requesting_profile_list

        match_list = PublicUserProfileSerializer(match_requests, many=True).data
        return Response(match_list, status=status.HTTP_200_OK)
    

class MatchUser(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PublicUserProfileSerializer

    def post(self,request):
        try:
            curr_profile = request.user.profile
        except UserProfile.DoesNotExist:
            return Response({"error":"The user doesnot have a profile..."},status=status.HTTP_400_BAD_REQUEST)    
        
        try:
            next_user = User.objects.get(first_name=request.POST.get('first_name'))
            next_profile = next_user.profile
        except UserProfile.DoesNotExist:
            return Response({"error":"The user you are trying to match with doesnot have a profile"},status=status.HTTP_400_BAD_REQUEST)
        
        try:
            match = Match.objects.get(user_1=next_profile.user,user_2=curr_profile.user)
        except Match.DoesNotExist:
            return Response({"error":"The user trying to create match with didnot request match"},status=status.HTTP_400_BAD_REQUEST)
        
        match.matched = True
        match.save()

        return Response({"Success":"Matched successfully"},status=status.HTTP_200_OK)
        












        
        
    





