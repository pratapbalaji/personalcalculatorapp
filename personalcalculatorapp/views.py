from django.http import HttpResponse
from django.contrib.auth.models import User, Group
from personalcalculatorapp.models import Calculation
from rest_framework import viewsets
from personalcalculatorapp.serializers import UserSerializer, GroupSerializer, CalculationSerializer

def index(request):
    return HttpResponse("Hello, you're in personal calculator app")

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

class CalculationViewSet(viewsets.ModelViewSet):
    queryset = Calculation.objects.all()
    serializer_class = CalculationSerializer

  