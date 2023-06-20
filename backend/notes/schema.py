import graphene
from graphene_django import DjangoObjectType
from todoapp.models import Project, ToDo
from usersapp.models import CustomUser

# class Query(graphene.ObjectType):
#     hello = graphene.String(default_value="Hi!")


class CustomUserType(DjangoObjectType):
    class Meta:
        model = CustomUser
        fields = "__all__"


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = "__all__"


class ToDoType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = "__all__"


# Create Input Object Types
class UserInput(graphene.InputObjectType):
    id = graphene.ID(required=False)
    name = graphene.String()
    email = graphene.String()


class ProjectInput(graphene.InputObjectType):
    id = graphene.ID(required=False)
    name = graphene.String()
    users = graphene.List(UserInput)


# User creation mutation
class CreateUser(graphene.Mutation):
    class Arguments:
        input = UserInput(required=True)

    stat = graphene.Boolean()
    message = graphene.String()
    user = graphene.Field(CustomUserType)

    @staticmethod
    def mutate(root, info, input=None):
        ok = False
        try:
            CustomUser.objects.get(email=input.email)
            return CreateUser(stat=ok, message="Пользователь с таким email уже существует!", user=None)
        except CustomUser.DoesNotExist:
            ok = True
            user_instance = CustomUser(username=input.name, email=input.email)
            user_instance.save()
            return CreateUser(stat=ok, message="Новый пользователь создан", user=user_instance)


# Project creation mutation
class CreateProject(graphene.Mutation):
    class Arguments:
        input = ProjectInput(required=True)

    stat = graphene.Boolean()
    message = graphene.String()
    project = graphene.Field(ProjectType)

    @staticmethod
    def mutate(root, info, input=None):
        ok = True
        users = []
        for user_input in input.users:
            try:
                user = CustomUser.objects.get(pk=user_input.id)
                users.append(user)
            except CustomUser.DoesNotExist:
                return CreateProject(stat=False, message="Указанный пользователь не существует!", project=None)

        project_instance = Project(name=input.name)
        project_instance.save()
        project_instance.users.set(users)
        return CreateProject(stat=ok, message="Новый проект создан", project=project_instance)


class UserMutation(graphene.Mutation):
    class Arguments:
        first_name = graphene.String(required=True)
        id = graphene.ID()

    user = graphene.Field(CustomUserType)

    @classmethod
    def mutate(cls, root, info, first_name, id):
        user = CustomUser.objects.get(pk=id)
        user.first_name = first_name
        user.save()
        return UserMutation(user=user)


class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()
    update_user = UserMutation.Field()
    create_project = CreateProject.Field()


class Query(graphene.ObjectType):
    all_users = graphene.List(CustomUserType)
    all_projects = graphene.List(ProjectType)
    all_todos = graphene.List(ToDoType)
    user_by_id = graphene.Field(CustomUserType, id=graphene.Int(required=True))
    projects_by_users_name = graphene.List(ProjectType, username=graphene.String(required=False))

    def resolve_all_users(root, info):
        return CustomUser.objects.all()

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_all_todos(root, info):
        return ToDo.objects.all()

    def resolve_user_by_id(self, info, id):
        try:
            return CustomUser.objects.get(id=id)
        except CustomUser.DoesNotExist:
            return None

    def resolve_projects_by_users_name(self, info, username=None):
        projects = Project.objects.all()
        if username:
            projects = projects.filter(users__username=username)
        return projects


schema = graphene.Schema(query=Query, mutation=Mutation)
