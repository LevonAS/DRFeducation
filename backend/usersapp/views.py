# from django.shortcuts import render
# Create your views here.


from rest_framework import mixins
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import BasePermission
from rest_framework.viewsets import GenericViewSet

from .models import CustomUser
from .serializers import (CustomUserFullModelSerializer,
                          CustomUserModelSerializer)


class StaffOnly(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_staff


class CustomUserPagination(PageNumberPagination):
    # default_limit = 4
    page_size = 4
    page_size_query_param = "page_size"


# class CustomUserModelViewSet(ModelViewSet):
#     queryset = CustomUser.objects.all()
#     serializer_class = CustomUserModelSerializer
#     pagination_class = CustomUserLimitOffsetPagination


class CustomUserModelViewSet(mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.ListModelMixin, mixins.DestroyModelMixin, mixins.CreateModelMixin, GenericViewSet):
    # renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    # permission_classes = [AllowAny]
    # permission_classes = [IsAdminUser]
    # permission_classes = [StaffOnly]
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserModelSerializer
    pagination_class = CustomUserPagination

    def get_serializer_class(self):
        if self.request.version == "2.0":
            return CustomUserFullModelSerializer
        return CustomUserModelSerializer


# {
#     "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY3NzE1OTQ5MSwiaWF0IjoxNjc3MDczMDkxLCJqdGkiOiJkMTRmZjViNmM5MjM0ZjBjYTdkMWZjYWZhMjU5YjdkNCIsInVzZXJfaWQiOjl9.VHIjr8fY9_qsf_3tY7Dg8aKsn_eTj7OVDwaqpqm5b-c",
#     "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjc3MDczMzkxLCJpYXQiOjE2NzcwNzMwOTEsImp0aSI6ImQ4ZGEzZjQ3YzQzMzQwNTJhNTE5ZGZjYTdiN2JmMjM4IiwidXNlcl9pZCI6OX0.2YCYmhYU7eEZfcfCJq69n0XhNIlGCLhONA0wvMkPYYA"
# }
