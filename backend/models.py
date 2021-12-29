from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class MyAccountManager(BaseUserManager):

    def create_user(self, email, first_name, last_name, password=None):
        if not email:
            raise ValueError("Users must have an email")
        
        if not first_name:
            raise ValueError("Users must have a first name")
            
        if not last_name:
            raise ValueError("Users must have a last name")

        user = self.model(
            email = self.normalize_email(email),
            first_name = first_name,
            last_name = last_name,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user
        
    def create_superuser(self, email, first_name, last_name, password):
        user = self.create_user (
            email = self.normalize_email(email),
            first_name = first_name,
            last_name = last_name,
            password = password,
        )

        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True

        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    email = models.EmailField(max_length=64, unique=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(auto_now=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)

    profile_pic = models.ImageField(null=True, blank=True, upload_to="../frontend/static/images/")
    upload = models.ImageField(upload_to ='uploads/')

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    objects = MyAccountManager()

    def __str__(self):
        return f"{self.email}"
    
    def has_perm(self, perm, obj=None):
        return self.is_admin
    
    def has_module_perms(self, app_label):
        return True

class Message(models.Model):
    user = models.ForeignKey("User", on_delete=models.CASCADE)
    message = models.CharField(max_length=1000)
    sentAt = models.DateTimeField(auto_now_add=True)
    convo = models.ForeignKey("Convo", related_name="messages", blank=True, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.message}"

class Convo(models.Model):
    name = models.CharField(max_length=150, blank=True, null=True)

    def __str__(self):
        return f"{self.id}"