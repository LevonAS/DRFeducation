"""notes URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from django.views.generic import TemplateView
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from graphene_django.views import GraphQLView
from rest_framework.authtoken import views
from rest_framework.routers import DefaultRouter
from rest_framework.schemas import get_schema_view as get_schema_view_base
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

from todoapp.views import ProjectModelViewSet, ToDoModelViewSet
from usersapp.views import CustomUserModelViewSet

schema_view = get_schema_view(
    openapi.Info(
        title="ToDo notes",
        default_version="v2",
        description="Education project",
        contact=openapi.Contact(email="admin@totonotes.ru"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    # permission_classes=[permissions.AllowAny],
)


router = DefaultRouter()
router.register("usersapp", CustomUserModelViewSet)
router.register("projectapp", ProjectModelViewSet)
router.register("todoapp", ToDoModelViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api-auth/", include("rest_framework.urls")),
    path("api-token-auth/", views.obtain_auth_token),
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/token/verify/", TokenVerifyView.as_view(), name="token_verify"),
    path("api/", include(router.urls)),
    # path('api/<str:version>/usersapp/', UserListApiView.as_view()),
    # path('api/usersapp/v1/', include('userapp.urls', namespace='v1')),
    # path('api/usersapp/v2/', include('userapp.urls', namespace='v2')),
    path(
        "openapi/",
        get_schema_view_base(title="ToDo notes", description="API mini", version="1.0.0"),
        name="openapi-schema",
    ),
    path("swagger/", schema_view.with_ui("swagger", cache_timeout=0), name="schema-swagger-ui"),
    # path('swagger/<str:format>', schema_view.without_ui()),
    path("redoc/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),
    # ...
    # Route TemplateView to serve Swagger UI template.
    #   * Provide `extra_context` with view name of `SchemaView`.
    path(
        "swagger-ui/",
        TemplateView.as_view(template_name="swagger-ui.html", extra_context={"schema_url": "openapi-schema"}),
        name="Swagger-ui",
    ),
    # ...
    # Route TemplateView to serve the ReDoc template.
    #   * Provide `extra_context` with view name of `SchemaView`.
    path(
        "redocbase/",
        TemplateView.as_view(template_name="redoc.html", extra_context={"schema_url": "openapi-schema"}),
        name="ReDocBase",
    ),
    # ...
    path("graphql/", GraphQLView.as_view(graphiql=True)),
]
