from miniblog.settings import BASE_DIR

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from api.methods import auth_methods


@api_view(["POST"])
def user_sign_in(request):
    if request.method == "POST":
        request_body = request.data
        email = request_body["email"]
        password = request_body["password"]

        user_authenticate = auth_methods.authenticate_user(email, password)

        if user_authenticate == False:
            return Response(
                {"res": False, "data": "check username or password"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
        else:
            return Response(
                {"res": True, "data": user_authenticate}, status=status.HTTP_200_OK
            )
    else:
        return Response(
            {"res": False, "data": "Method Not Allowed"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["POST"])
def user_sign_up(request):
    if request.method == "POST":
        request_body = request.data
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
def complete_profile(request):
    if request.method == "POST":
        request_body = request.data
        # first_name = request_body["username"]
        # last_name = request_body["email"]
        profile_image = request_body["profile_image"]
        email = request_body["email"]

        # print(profile_image)

        try:
            auth_methods.update_profile(profile_image, email)
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
