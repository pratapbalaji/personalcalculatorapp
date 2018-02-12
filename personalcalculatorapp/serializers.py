from django.contrib.auth.models import User, Group
from personalcalculatorapp.models import Calculation
from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'groups')


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name')

class CalculationSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    calculations = serializers.CharField()

    def create(self, validated_data):
        """
        Create and return a new `Calculation` instance, given the validated data.
        """
        return Calculation.objects.create(**validated_data)