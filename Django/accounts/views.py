
from django.template import loader
from django.shortcuts import render, redirect
from .models import City, CustomUser, Facility, FACILITY_CHOICES, Cityrule
from .serializers import userSerializer,citySerializer
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework import status
from rest_framework.response import Response
from django.http import HttpResponse, JsonResponse
data1 = list()
currentuser = ''


@api_view(['GET', 'POST'])
def login(request):
    if request.method == 'GET':
        data = CustomUser.objects.all()
        serializer = userSerializer(data, many=True)
        return JsonResponse(serializer.data, safe=False)

@api_view(['GET', 'POST'])
def signup(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        print(data)
        serializer = userSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
        return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
    if request.method == 'GET':
        data = CustomUser.objects.all()
        serializer = userSerializer(data, many=True)
        return JsonResponse(serializer.data, safe=False)

@api_view(['GET', 'POST'])
def addcity(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        print(data)
        serializer = citySerializer(data=data)
        if serializer.is_valid():
            serializer.save()
        else:
            print("invalid data")
        return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
    if request.method == 'GET':
        data = City.objects.all()
        serializer = citySerializer(data, many=True)
        return JsonResponse(serializer.data, safe=False)


@api_view(['GET', 'POST'])
def editcity(request,cityid):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        print(data)
        getcity=City.objects.filter(pk=cityid)
        serializer = citySerializer(getcity,data=data,partial=True)
        if serializer.is_valid():
            serializer.save()
        else:
            print("invalid data")
        return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
    if request.method == 'GET':
        data = City.objects.all()
        serializer = citySerializer(data, many=True)
        return JsonResponse(serializer.data, safe=False)