from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import CustomUser as CustomUser

admin.site.register(CustomUser, UserAdmin)

# @admin.register(users_models.CustomUser)
# class CustomUserAdmin(admin.ModelAdmin):
#     list_display = ['username', 'first_name','last_name','email']
