from api.models import MyUser
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from api.serializers import UserSerializer
import json


def create_new_user(username, email, password):
    """Taker username, email and password and create the new user"""
    user = MyUser.objects.create_user(username=username, email=email, password=password)
    user.save()


def authenticate_user(email, password):
    """
    Take email and password and authenticate it with result
    Returns:
        user: False if not authenticated user data as user if sucess
    """

    user = authenticate(username=email, password=password)

    if user is not None:
        token, created = Token.objects.get_or_create(user=user)
        user = UserSerializer(user).data
        return user, token.key

    return False, None


def update_profile(image, email):
    """
    Take user image and save in file
    """
    user = MyUser.objects.get(email=email)
    user.profile_picture = image
    user.save()
