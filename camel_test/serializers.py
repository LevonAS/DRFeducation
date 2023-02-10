from rest_framework.serializers import ModelSerializer

from .models import CustomCamel


class CustomCamelModelSerializer(ModelSerializer):
    class Meta:
        model = CustomCamel
        # fields = '__all__'
        fields = (
            "first_name",
            "last_name",
            "birthday_year",
        )
