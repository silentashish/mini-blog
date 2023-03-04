from miniblog.settings import BASE_DIR

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import JSONParser

from django.http import HttpResponse


@api_view(["POST"])
def user_sign_in(request):
    if request.method == "POST":
        request_body = request.data
        email = request_body["email"]
        password = request_body["password"]

        print(email)
        print(password)

        return Response({"res": True, "data": []}, status=status.HTTP_200_OK)
    else:
        return Response(
            {"res": False, "data": "Method Not Allowed"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )
