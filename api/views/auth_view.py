from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status

from rest_framework.authtoken.models import Token
from api.models import MyUser

from django.core.mail import send_mail

import uuid
from datetime import datetime

from api.methods import auth_methods
from api.serializers import (
    SigninSerializer,
    SignupSerializer,
    ChangePasswordSerializer,
    CompleteProfileSerializer,
    ResetPasswordSerializer,
    CreatePasswordSerializer,
    UserSerializer,
)

from django.contrib.auth import authenticate


@api_view(["POST"])
def user_sign_in(request):
    if request.method == "POST":
        request_body = request.data

        serializer = SigninSerializer(data=request_body)

        if not serializer.is_valid():
            return Response(
                {"res": False, "data": serializer.errors},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        email = request_body["email"]
        password = request_body["password"]

        user_authenticate, token = auth_methods.authenticate_user(email, password)

        if user_authenticate == False:
            return Response(
                {"res": False, "data": "check username or password"},
                status=status.HTTP_404_NOT_FOUND,
            )
        else:
            return Response(
                {"res": True, "data": {"user": user_authenticate, "token": token}},
                status=status.HTTP_200_OK,
            )
    else:
        return Response(
            {"res": False, "data": "Method Not Allowed"},
            status=status.HTTP_404_NOT_FOUND,
        )


@api_view(["POST"])
def user_sign_up(request):
    if request.method == "POST":
        request_body = request.data

        serializer = SignupSerializer(data=request_body)

        if not serializer.is_valid():
            return Response(
                {"res": False, "data": serializer.errors},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        username = request_body["username"]
        email = request_body["email"]
        password = request_body["password"]

        try:
            auth_methods.create_new_user(username, email, password)
        except Exception as ex:
            return Response(
                {"res": False, "data": str(ex)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        return Response(
            {"res": True, "data": "User Created Successfully"},
            status=status.HTTP_200_OK,
        )
    else:
        return Response(
            {"res": False, "data": "Method Not Allowed"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["POST"])
def reset_password(request):
    if request.method == "POST":
        request_body = request.data

        serializer = ResetPasswordSerializer(data=request_body)

        if not serializer.is_valid():
            return Response(
                {"res": False, "data": serializer.errors},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        email = request_body["email"]

        try:
            user = MyUser.objects.get(email=email)
            uid = uuid.uuid4()
            hex_value = uid.hex[:30]

            user.password_reset_token = hex_value
            user.reset_start_time = datetime.now()
            user.save()

            # Send mail to notify user about password change
            send_mail(
                "Mini-Blog Password Change Request",
                "Somebody request password change for your account with this mail. If it's not you, ignore this mail."
                + "\n"
                + "You Can click on this link to change your password."
                + "\n"
                + "http://localhost:3000/resetpassword?token="
                + hex_value,
                "072bex406.ashish@pcampus.edu.np",  # Admin
                [
                    user.email,
                ],
            )

        except Exception as ex:
            return Response(
                {"res": False, "data": str(ex)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        return Response(
            {
                "res": True,
                "data": "Reset link send to email. Check your email to create new password.",
            },
            status=status.HTTP_200_OK,
        )
    else:
        return Response(
            {"res": False, "data": "Method Not Allowed"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["POST"])
def create_new_password(request):
    if request.method == "POST":
        request_body = request.data

        serializer = CreatePasswordSerializer(data=request_body)

        if not serializer.is_valid():
            return Response(
                {"res": False, "data": serializer.errors},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        token = request_body["token"]
        new_password = request_body["new_password"]

        try:
            user = MyUser.objects.get(password_reset_token=token)

            print(user, new_password)

            if user is not None:
                user.password_reset_token = ""
                user.reset_start_time = datetime.now()
                user.set_password = new_password
                user.save()

        except Exception as ex:
            return Response(
                {"res": False, "data": str(ex)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        return Response(
            {"res": True, "data": "Password Changed Successfully"},
            status=status.HTTP_200_OK,
        )
    else:
        return Response(
            {"res": False, "data": "Method Not Allowed"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def complete_profile(request):
    if request.method == "POST":
        request_body = request.data

        serializer = CompleteProfileSerializer(data=request_body)

        if not serializer.is_valid():
            return Response(
                {"res": False, "data": serializer.errors},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        user = Token.objects.get(key=request.auth.key).user

        profile_image = request_body["profile_image"]
        first_name = request_body["first_name"]
        last_name = request_body["last_name"]

        try:
            user.profile_picture = profile_image
            user.first_name = first_name
            user.last_name = last_name
            user.save()

            user = UserSerializer(user).data

            return Response(
                {"res": True, "data": {"user": user}},
                status=status.HTTP_200_OK,
            )

        except Exception as ex:
            return Response(
                {"res": False, "data": str(ex)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    else:
        return Response(
            {"res": False, "data": "Method Not Allowed"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def change_password(request):
    if request.method == "POST":
        request_body = request.data

        serializer = ChangePasswordSerializer(data=request_body)
        user = Token.objects.get(key=request.auth.key).user

        if not serializer.is_valid():
            return Response(
                {"res": False, "data": serializer.errors},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        old_password = request_body["old_password"]
        new_password = request_body["new_password"]

        authenticate_result = authenticate(username=user.email, password=old_password)

        if authenticate_result is None:
            return Response(
                {"res": True, "data": {"old_password": ["old password doesn't match"]}},
                status=status.HTTP_200_OK,
            )

        try:

            user.set_password(new_password)
            user.save()
        except Exception as ex:
            return Response(
                {"res": False, "data": str(ex)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        return Response(
            {"res": True, "data": "Password Changed Successfully"},
            status=status.HTTP_200_OK,
        )
    else:
        return Response(
            {"res": False, "data": "Method Not Allowed"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )
