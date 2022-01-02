from rest_framework import serializers
from .models import *
from django.contrib.auth import authenticate

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'profile_pic')

class RegisterSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['email'], validated_data['first_name'], validated_data['last_name'],
        validated_data['password'])

        return user

class LoginSerializer(serializers.Serializer):
    
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")

class MessageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Message
        fields = '__all__'

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['user'] = UserSerializer(instance.user).data
        return response

class ConvoSerializer(serializers.ModelSerializer):
    messages = serializers.SerializerMethodField()
    members = serializers.SerializerMethodField()

    class Meta:
        model = Convo
        fields = '__all__'

    def get_messages(self, instance):
        messages = instance.messages.all().order_by('sentAt')
        return MessageSerializer(messages, many=True, read_only=True).data
    
    def get_members(self, instance):
        members = instance.members.all().order_by('id')
        return UserSerializer(members, many=True, read_only=True).data

class UserSerializerConvos(serializers.ModelSerializer):
    convos = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'profile_pic', 'convos')

    def get_convos(self, instance):
        convos = instance.convos.all().order_by('-timeOfLastMsg')
        return ConvoSerializer(convos, many=True, read_only=True).data