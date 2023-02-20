# from django.shortcuts import render
# Create your views here.


from rest_framework import mixins
from rest_framework.pagination import PageNumberPagination
from rest_framework.viewsets import GenericViewSet

from .models import CustomUser
from .serializers import CustomUserModelSerializer


class CustomUserPagination(PageNumberPagination):
    # default_limit = 4
    page_size = 4
    page_size_query_param = "page_size"


# class CustomUserModelViewSet(ModelViewSet):
#     queryset = CustomUser.objects.all()
#     serializer_class = CustomUserModelSerializer
#     pagination_class = CustomUserLimitOffsetPagination


class CustomUserModelViewSet(mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.ListModelMixin, GenericViewSet):
    # renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserModelSerializer
    pagination_class = CustomUserPagination
