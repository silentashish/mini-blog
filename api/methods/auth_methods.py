from api.models import MyUser
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token


def create_new_user(username, email, password):
    """Taker username, email and password and create the new user"""
    user = MyUser.objects.create_user(username, email, password)
    user.save()


def authenticate_user(email, password):
    """
    Take email and password and authenticate it with result
    Returns:
        user: False if not authenticated user data as user if sucess
    """

    user = authenticate(email=email, password=password)

    if user is not None:
        return False
    else:
        token, created = Token.objects.get_or_create(
            user=MyUser.objects.get(email=email)
        )
        return token.key


def update_profile(image, email):
    """
    Take user image and save in file
    """
    user = MyUser.objects.get(email=email)
    user.profile_picture = image
    user.save()
