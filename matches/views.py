from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from api.models import UserProfile
from api.serializers import PublicUserProfileSerializer
from rest_framework.response import Response
from rest_framework import status
from .models import Match
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from notifications.models import Notification



def calculate_match_score(user, profile):
    
    fields = ["smoking_allowed", "drinking_allowed", "pets_allowed", "early_riser", "vegeterian", "gender_same_prefer", "introvert"]
    
    weights = {
        "smoking_allowed": 0.20,
        "drinking_allowed": 0.15,
        "pets_allowed": 0.15,
        "early_riser": 0.10,
        "vegeterian": 0.05,
        "gender_same_prefer": 0.10,
        "introvert": 0.05,
        "budget": 0.15,
        "address": 0.05
    }
    curr_profile = user.profile

    total = 0
    for field in fields:
        if getattr(curr_profile, field) == getattr(profile, field):
            total += weights[field]

    overlap = max(0, min(curr_profile.max_budget, profile.max_budget) - max(curr_profile.min_budget, profile.min_budget))
    overlap = overlap / (curr_profile.max_budget - curr_profile.min_budget)
    total += weights["budget"] * overlap
    

    return total
    

    


class MatchGetView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PublicUserProfileSerializer

    @swagger_auto_schema(
        operation_id="get_matches",
        responses={200: openapi.Response('Success')},
        operation_description="Get all possible matches for the authenticated user.",
        reponses={404: openapi.Response('User profile not found.')},
    )

    
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
            
        for i in range(len(matched_profile)):
            for j in range(i,len(matched_profile)):
                if (matched_profile[j]["score"] > matched_profile[i]["score"]):
                    matched_profile[j],matched_profile[i] = matched_profile[i],matched_profile[j]


        
        for i in range(len(matched_profile)):
            print(matched_profile[i]["score"])

        
        matched_profile = [matched_profile[i]["profile"] for i in range(len(matched_profile))]
        

        response_list = PublicUserProfileSerializer(matched_profile, many=True).data
        

        return Response(response_list, status=status.HTTP_200_OK)
    

class MatchReqView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PublicUserProfileSerializer

    @swagger_auto_schema(
        operation_description="Send a match request to another user.",
        responses={200: openapi.Response('Success')},
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'username': openapi.Schema(type=openapi.TYPE_INTEGER, description='usernamne of the user to which match will be requested'),
            
            },
            required=['username'],
        ),
    )

    def post(self,request):
        requesting_user = request.user
        
        request_user = request.data.get('username')
    
        request_user = User.objects.get(username=request_user)

        try:
            requesting_user_profile = requesting_user.profile
            try:
                request_user_profile = request_user.profile
                try:
                    match = Match.objects.get(user_1=requesting_user,user_2=request_user)
                    return Response({"error": "Match request already sent."}, status=status.HTTP_400_BAD_REQUEST)
                except Match.DoesNotExist:
                    match = Match(user_1=requesting_user,user_2=request_user)
                    match.save()
                    Notification.objects.create(user1=requesting_user,user2=request_user,notification_action='matchrequest')
                    return Response({"success":f"Sent match request to {request_user.username}"},status=status.HTTP_200_OK)

            except UserProfile.DoesNotExist:
                return Response({"error": "The user you requested doesnt have a profile."}, status=status.HTTP_400_BAD_REQUEST)

        except UserProfile.DoesNotExist:
            return Response({"error": "Your Profile does not exist"}, status=status.HTTP_400_BAD_REQUEST)

class MatchRequests(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PublicUserProfileSerializer

    @swagger_auto_schema(
    operation_description="Get all match requests received by the authenticated user.",
    responses={200: openapi.Response('Success')},
    )

    def get(self,request):
        try:
            profile = request.user.profile
        except UserProfile.DoesNotExist:
            return Response({"error":"You don't have a profile"},status=status.HTTP_400_BAD_REQUEST)
        
        match_requests = Match.objects.filter(user_2=request.user,matched=False)
        requesting_profile_list = []

        for match_req in match_requests:
            requesting_profile_list.append(match_req.user_1.profile)
        
        match_requests = requesting_profile_list

        match_list = PublicUserProfileSerializer(match_requests, many=True).data
        return Response(match_list, status=status.HTTP_200_OK)
    

class MatchUser(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PublicUserProfileSerializer

    @swagger_auto_schema(
    operation_description="Match with a user who has requested a match.",
    responses={200: openapi.Response('Success'),
               
               },
               request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'username': openapi.Schema(type=openapi.TYPE_INTEGER, description='username of the user to which match request will be'),
            
            },
            required=['username'],
        ),)
    def post(self,request):
        try:
            curr_profile = request.user.profile
        except UserProfile.DoesNotExist:
            return Response({"error":"The user doesnot have a profile..."},status=status.HTTP_400_BAD_REQUEST)    
        
        try:
            next_user = User.objects.get(username=request.data.get('username'))
            next_profile = next_user.profile
        except UserProfile.DoesNotExist:
            return Response({"error":"The user you are trying to match with doesnot have a profile"},status=status.HTTP_400_BAD_REQUEST)
        
        try:
            match = Match.objects.get(user_1=next_profile.user,user_2=curr_profile.user)
        except Match.DoesNotExist:
            return Response({"error":"The user trying to create match with didnot request match"},status=status.HTTP_400_BAD_REQUEST)
        
        match.matched = True
        match.save()
        Notification.objects.create(user1=curr_profile.user,user2=next_profile.user,notification_action='matched')

        return Response({"Success":"Matched successfully"},status=status.HTTP_200_OK)


class MatchedView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PublicUserProfileSerializer

    @swagger_auto_schema(
    operation_description="Get all matched users for the authenticated user.",
    responses={200: openapi.Response('Success')},
    )
    def get(self,request):
        try:
            profile = request.user.profile
        except UserProfile.DoesNotExist:
            return Response({"error":"You don't have a profile"},status=status.HTTP_400_BAD_REQUEST)
        
        matches = Match.objects.filter(user_1=request.user,matched=True)
        matched_profile_list = []

        for match in matches:
            matched_profile_list.append(match.user_2.profile)
        
        matches = matched_profile_list

        match_list = PublicUserProfileSerializer(matches, many=True).data
        return Response(match_list, status=status.HTTP_200_OK)

