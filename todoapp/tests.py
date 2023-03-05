from django.contrib.auth.hashers import make_password
from django.test import TestCase
from mixer.backend.django import mixer
from rest_framework import status
from rest_framework.test import APIClient, APIRequestFactory, APITestCase

from usersapp.models import CustomUser

from .models import Project, ToDo
from .views import ProjectModelViewSet


# Create your tests here.
class TestProjectViewSet(TestCase):
    def setUp(self) -> None:
        self.name = "admin"
        self.password = "masteradmin"
        self.email = "admin@totonotes.ru"
        self.data = {
            "name": "Project_0",
        }
        self.url_p = "/api/projectapp/"
        self.admin = CustomUser.objects.create(
            username=self.name,
            password=make_password(self.password),
            email=self.email,
            is_superuser=True,
            is_staff=True,
        )
        self.user001 = CustomUser.objects.create(
            username="user",
            password=make_password(self.password),
            email="user@totonotes.ru",
            is_superuser=False,
            is_staff=True,
        )
        # return super().setUp()

    # Проверка на гостевой доступ к  api /api/projectapp/
    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get(self.url_p)
        view = ProjectModelViewSet.as_view({"get": "list"})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # Проверка на неавторизованное создание объекта в api /api/projectapp/
    def test_create_guest(self):
        factory = APIRequestFactory()
        request = factory.post(self.url_p, self.data, format="json")
        view = ProjectModelViewSet.as_view({"post": "create"})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    # Проверка на неавторизованное создание объекта в api /api/projectapp/
    # используя APIClient()
    def test_create_guest_api(self):
        client = APIClient()
        project_ = Project.objects.create(**self.data)
        project_.users.add(self.admin)
        response = client.put(f"{self.url_p}{project_.id}/")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    # Проверка на авторизованное изменение данных в  api /api/projectapp/
    def test_create_admin_api(self):
        client = APIClient()
        project_ = Project.objects.create(**self.data)
        project_.users.add(self.user001)
        client.login(username=self.admin, password=self.password)
        response = client.put(f"{self.url_p}{project_.id}/", {"name": "Project_update", "users": self.user001.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        proj = Project.objects.get(id=project_.id)
        self.assertEqual(proj.name, "Project_update")
        client.logout()

    def tearDown(self) -> None:
        pass
        # return super().tearDown()


class TestToDoViewSet(APITestCase):
    def setUp(self) -> None:
        self.name = "admin"
        self.password = "masteradmin"
        self.email = "admin@totonotes.ru"
        self.url_t = "/api/todoapp/"
        self.admin = CustomUser.objects.create(
            username=self.name,
            password=make_password(self.password),
            email=self.email,
            is_superuser=True,
            is_staff=True,
        )
        # return super().setUp()

    # Проверка на авторизованное изменение данных в  api /api/todoapp/
    def test_todo_put(self):
        project_ = Project.objects.create(name="Project_0")
        project_.users.add(self.admin)
        # print('0011 project', project.id, project)
        note = ToDo.objects.create(project=project_, text="Text_0", creator=self.admin)
        self.client.login(username=self.admin, password=self.password)
        response = self.client.put(
            f"{self.url_t}{note.id}/", {"project": note.project_id, "text": "Test_update", "creator": note.creator_id}
        )
        # print('2222', response.data)
        # print('3333', json.loads(response.content))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        note_ = ToDo.objects.get(id=note.id)
        self.assertEqual(note_.text, "Test_update")
        self.client.logout()

    # Проверка на гостевой доступ к api /api/todoapp/
    # а так же на неавторизованное и авторизованное изменение данных,
    # с использованием библиотеки Mixer
    def test_todo_get_put_mixer(self):
        response = self.client.get(self.url_t)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        note = mixer.blend(ToDo, text="Text_0")
        # print('0111 note', note.id, note,  note.creator_id, note.project_id)
        response = self.client.put(
            f"{self.url_t}{note.id}/", {"project": note.project_id, "text": "Test_update", "creator": note.creator_id}
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        self.client.login(username=self.admin, password=self.password)
        response = self.client.put(
            f"{self.url_t}{note.id}/", {"project": note.project_id, "text": "Test_update", "creator": note.creator_id}
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        note_ = ToDo.objects.get(id=note.id)
        # print('5555', note_)
        self.assertEqual(note_.text, "Test_update")
        self.client.logout()

    def tearDown(self) -> None:
        pass
        # return super().tearDown()
