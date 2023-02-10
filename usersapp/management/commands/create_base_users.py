from django.contrib.auth.hashers import make_password
from django.core.management.base import BaseCommand

from usersapp.models import CustomUser


class Command(BaseCommand):
    help = "Создание базовых пользователей"

    def handle(self, *args, **options):
        # Удаляем все пользоватлелей
        CustomUser.objects.all().delete()

        # Создание суперпользователя
        # User.objects.create_superuser(username='admin', email='admin@totonotes.ru', password='masteradmin')
        # CustomUser.objects.create_superuser(username='admin', email='admin@totonotes.ru', password='masteradmin')
        CustomUser.objects.create(
            username="admin",
            email="admin@totonotes.ru",
            password=make_password("masteradmin"),
            is_superuser=True,
            is_staff=True,
        )

        # Сощдание пользователей
        # user_count = options['count']
        # for i in range(user_count):
        #     CustomUser.objects.create_user(f'user{i}', f'user{i}@test.com', '123321')
        CustomUser.objects.create(username="user001", first_name="001", last_name="u", email="user001@totonotes.ru")
        CustomUser.objects.create(username="user002", first_name="002", last_name="u", email="user002@totonotes.ru")
        CustomUser.objects.create(username="user003", first_name="003", last_name="u", email="user003@totonotes.ru")
        CustomUser.objects.create(username="user004", first_name="004", last_name="u", email="user004@totonotes.ru")
        CustomUser.objects.create(username="user005", first_name="005", last_name="u", email="user005@totonotes.ru")
        # user_add = CustomUser(username='user001', first_name='u', last_name='n', email='user2001@totonotes.ru')
        # user_add.save()

        self.stdout.write(f"Пользователи созданы")
