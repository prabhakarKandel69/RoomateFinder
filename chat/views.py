from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from .models import Message
from .serializers import MessageSerializer
from rest_framework.response import Response
from matches.models import Match
from django.db.models import Q
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from django.contrib.auth.models import User
from django.utils import timezone



class RecentMessages(APIView):




    permission_classes = [IsAuthenticated]
    serializer_class = MessageSerializer




    @swagger_auto_schema(
        operation_description="Get recent messages for the authenticated user",
        responses={
            200: openapi.Response(
                description="A list of recent messages",
                schema=openapi.Schema(
                    type=openapi.TYPE_ARRAY,
                    items=openapi.Schema(
                        type=openapi.TYPE_OBJECT,
                        properties={
                            'id': openapi.Schema(type=openapi.TYPE_INTEGER),
                            'sender_username': openapi.Schema(type=openapi.TYPE_STRING),
                            'receiver_username': openapi.Schema(type=openapi.TYPE_STRING),
                            'sent_at': openapi.Schema(type=openapi.TYPE_STRING),
                            'message_text': openapi.Schema(type=openapi.TYPE_STRING),
                            'attachment': openapi.Schema(type=openapi.TYPE_STRING),
                            'seen': openapi.Schema(type=openapi.TYPE_BOOLEAN),
                            'seenat': openapi.Schema(type=openapi.TYPE_STRING),
                            'sender': openapi.Schema(type=openapi.TYPE_INTEGER),
                            'receiver': openapi.Schema(type=openapi.TYPE_INTEGER),
                        }
                    )
                )
            )
        },
        manual_parameters=[
            openapi.Parameter(
                'Authorization',
                openapi.IN_HEADER,
                description="Authorization token",
                type=openapi.TYPE_STRING,
                required=True
            )
        ]
    )


    def get(self,request):
        matched_list = Match.objects.filter(Q(user_1=request.user) | Q(user_2=request.user),matched=True)
        matched_users = []
        for match in matched_list:
            if match.user_1 == request.user:
                matched_users.append(match.user_2)
            else:
                matched_users.append(match.user_1)
        
        recent_messages = []
        for matched_user in matched_users:
            last_message = Message.objects.filter(
            Q(sender=request.user, receiver=matched_user) | Q(sender=matched_user, receiver=request.user)
            ).order_by('-sent_at').first()
            if last_message:
                recent_messages.append(last_message)

        
        
        serializer = self.serializer_class(recent_messages, many=True)
        return Response(serializer.data)

class MessageDetail(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = MessageSerializer


    @swagger_auto_schema(
        operation_description="Get recent messages for the authenticated user with the given username",
        responses={
            200: openapi.Response(
                description="A list of recent messages",
                schema=openapi.Schema(
                    type=openapi.TYPE_ARRAY,
                    items=openapi.Schema(
                        type=openapi.TYPE_OBJECT,
                        properties={
                            'id': openapi.Schema(type=openapi.TYPE_INTEGER),
                            'sender_username': openapi.Schema(type=openapi.TYPE_STRING),
                            'receiver_username': openapi.Schema(type=openapi.TYPE_STRING),
                            'sent_at': openapi.Schema(type=openapi.TYPE_STRING),
                            'message_text': openapi.Schema(type=openapi.TYPE_STRING),
                            'attachment': openapi.Schema(type=openapi.TYPE_STRING),
                            'seen': openapi.Schema(type=openapi.TYPE_BOOLEAN),
                            'seenat': openapi.Schema(type=openapi.TYPE_STRING),
                            'sender': openapi.Schema(type=openapi.TYPE_INTEGER),
                            'receiver': openapi.Schema(type=openapi.TYPE_INTEGER),
                        }
                    )
                )
            )
        },
        manual_parameters=[
            openapi.Parameter(
                'Authorization',
                openapi.IN_HEADER,
                description="Authorization token",
                type=openapi.TYPE_STRING,
                required=True
            )
        ]
    )
    def get(self,request,username):
        other_user = User.objects.get(username=username)
        curr_user = request.user

        try:
            match = Match.objects.get(Q(user_1=curr_user,user_2=other_user) | Q(user_1=other_user,user_2=curr_user),matched=True)
        except Match.DoesNotExist:
            return Response({"error":"The users are not matched....."},status=status.HTTP_400_BAD_REQUEST)
        
        messages = Message.objects.filter(
            Q(sender=curr_user, receiver=other_user) | Q(sender=other_user, receiver=curr_user)
        ).order_by('sent_at')

        messages.update(seen=True, seenat=timezone.now())



        return Response(MessageSerializer(messages,many=True).data)
        

    
    
