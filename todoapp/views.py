from rest_framework.generics import get_object_or_404
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .filters import ProjectFilter, TodoFilter
from .models import Project, ToDo
from .serializers import ProjectModelSerializer, ToDoModelSerializer


class ProjectUserLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class ProjectModelViewSet(ModelViewSet):
    serializer_class = ProjectModelSerializer
    queryset = Project.objects.all()
    filterset_class = ProjectFilter
    pagination_class = ProjectUserLimitOffsetPagination


class ToDoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class ToDoModelViewSet(ModelViewSet):
    serializer_class = ToDoModelSerializer
    queryset = ToDo.objects.all()
    # filterset_fields = ['project']
    filterset_class = TodoFilter
    pagination_class = ToDoLimitOffsetPagination

    def destroy(self, request, pk=None):
        instance = get_object_or_404(ToDo, pk=pk)
        instance.is_active = False
        instance.save()
        todoobj = ToDo.objects.all()
        serializer_class = ToDoModelSerializer(todoobj, many=True)
        return Response(serializer_class.data)
