# from django.shortcuts import render
# Create your views here.


from rest_framework.viewsets import ModelViewSet

from .models import CustomCamel
from .serializers import CustomCamelModelSerializer


class CustomCamelModelViewSet(ModelViewSet):
    queryset = CustomCamel.objects.all()
    serializer_class = CustomCamelModelSerializer
