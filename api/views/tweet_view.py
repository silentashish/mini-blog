from miniblog.settings import BASE_DIR
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status

from api.methods import auth_methods


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_new_tweet(request):
    if request.method == "POST":
        request_body = request.data

        user = Token.objects.get(key=request.auth.token).user
        message = request_body["message"]

        print(user, message)

        return Response(
            {"res": False, "data": "check username or password"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )

        # else:
        #     return Response(
        #         {"res": True, "data": user_authenticate}, status=status.HTTP_200_OK
        #     )
    else:
        return Response(
            {"res": False, "data": "Method Not Allowed"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )
