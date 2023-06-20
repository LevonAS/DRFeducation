from django_filters import DateTimeFilter
from django_filters import rest_framework as filters

from .models import Project, ToDo


class ProjectFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr="contains")

    class Meta:
        model = Project
        fields = ["name"]


class TodoFilter(filters.FilterSet):
    # project_name = AllValuesFilter(field_name='project__name')
    # created = IsoDateTimeFromToRangeFilter()
    # created = DateTimeFromToRangeFilter()
    from_create_date = DateTimeFilter(field_name="create", lookup_expr="gte")
    to_create_date = DateTimeFilter(field_name="create", lookup_expr="lte")

    class Meta:
        model = ToDo
        fields = ["project", "from_create_date", "to_create_date"]
