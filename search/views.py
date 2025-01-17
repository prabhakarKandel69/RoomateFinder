from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
from api.models import UserProfile
from api.serializers import PublicUserProfileSerializer
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User


class Search(APIView):
    permission_classes = [AllowAny]
    serializer_class = PublicUserProfileSerializer

    @swagger_auto_schema(
        operation_description="Search user profiles based on the given filters.",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'age_min': openapi.Schema(type=openapi.TYPE_INTEGER, description="Minimum age for filtering."),
                'age_max': openapi.Schema(type=openapi.TYPE_INTEGER, description="Maximum age for filtering."),
                'min_budget': openapi.Schema(type=openapi.TYPE_INTEGER, description="Minimum budget for filtering."),
                'max_budget': openapi.Schema(type=openapi.TYPE_INTEGER, description="Maximum budget for filtering."),
                'address': openapi.Schema(type=openapi.TYPE_STRING, description="Address to filter by (partial match)."),
                'gender':openapi.Schema(type=openapi.TYPE_STRING,description="Gender of the user to find"),
                'preferences': openapi.Schema(
                    type=openapi.TYPE_ARRAY,
                    items=openapi.Schema(
                        type=openapi.TYPE_STRING,
                        enum=[
                            'smoking_allowed', 
                            'drinking_allowed', 
                            'pets_allowed', 
                            'vegetarian', 
                            'early_riser', 
                            'same_gender_prefer', 
                            'introvert', 
                            'has_room'
                        ]
                    ),
                    description="List of preferences for filtering. Possible values: smoking_allowed, drinking_allowed, pets_allowed, vegetarian, early_riser, same_gender_prefer, introvert, has_room."
                ),
            },
            required=[],
            description="Provide any combination of filters for the search."
        ),
        responses={
            200: openapi.Response(
                description="List of profiles that match the filters.",
                schema=PublicUserProfileSerializer(many=True)
            ),
            400: openapi.Response(
                description="Invalid request data.",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'error': openapi.Schema(type=openapi.TYPE_STRING, description="Error message.")
                    }
                )
            ),
        }
    )
    def post(self, request, *args, **kwargs):
        filters = request.data
        queryset = UserProfile.objects.all()

        if 'age_min' in filters and 'age_max' in filters:
            queryset = queryset.filter(age__gte=filters['age_min'], age__lte=filters['age_max'])

        if 'min_budget' in filters and 'max_budget' in filters:
            queryset = queryset.filter(
                Q(min_budget__lte=filters['max_budget']) & Q(max_budget__gte=filters['min_budget'])
            )

        if 'address' in filters:
            queryset = queryset.filter(address__icontains=filters['address'])

        if 'room_type' in filters:
            queryset = queryset.filter(room_type=filters['room_type'])

        if 'gender' in filters:
            queryset = queryset.filter(gender=filters['gender'])

        if 'preferences' in filters:
            if 'smoking_allowed' in filters['preferences']:
                queryset = queryset.filter(smoking_allowed=True)
            if 'drinking_allowed' in filters['preferences']:
                queryset = queryset.filter(drinking_allowed=True)
            if 'pets_allowed' in filters['preferences']:
                queryset = queryset.filter(pets_allowed=True)
            if 'vegetarian' in filters['preferences']:
                queryset = queryset.filter(vegetarian=True)
            if 'early_riser' in filters['preferences']:
                queryset = queryset.filter(early_riser=True)
            if 'same_gender_prefer' in filters['preferences']:
                queryset = queryset
            if 'introvert' in filters['preferences']:
                queryset = queryset.filter(introvert=True)
            if 'has_room' in filters['preferences']:
                queryset = queryset.filter(has_room=True)

        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class SearchByName(APIView):
    permission_classes = [AllowAny]
    serializer_class = PublicUserProfileSerializer

    @swagger_auto_schema(
        operation_description="Search user profiles by name.",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'name': openapi.Schema(type=openapi.TYPE_STRING, description="Name to search for (partial match)."),
            },
            required=['name'],
            description="Provide the name to search for."
        ),
        responses={
            200: openapi.Response(
                description="List of profiles that match the name.",
                schema=PublicUserProfileSerializer(many=True)
            ),
            400: openapi.Response(
                description="Invalid request data.",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'error': openapi.Schema(type=openapi.TYPE_STRING, description="Error message.")
                    }
                )
            ),
        }
    )
    def post(self, request, *args, **kwargs):
        data = request.data
        if 'name' not in data:
            return Response({'error': 'The name field is required.'}, status=status.HTTP_400_BAD_REQUEST)

        name = data['name']
        queryset = User.objects.filter(
            Q(first_name__icontains=name) | 
            Q(last_name__icontains=name) | 
            Q(username__icontains=name)
        )

        user_ids = queryset.values_list('id', flat=True)
        queryset = UserProfile.objects.filter(user_id__in=user_ids)

        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

