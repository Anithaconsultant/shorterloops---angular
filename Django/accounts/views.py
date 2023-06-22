from .models import City, CustomUser, Facility, FACILITY_CHOICES, Cityrule,Asset
from .serializers import userSerializer, citySerializer, facilitySerializer, cityRuleSerializer,AssetSerializer
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework import status
from django.http import JsonResponse

data1 = list()
currentuser = ''
cartcount = 100


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
        else:
            return JsonResponse({'message': 'Username or Email Id is already present!'})
        return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
    if request.method == 'GET':
        data = CustomUser.objects.all()
        serializer = userSerializer(data, many=True)
        return JsonResponse(serializer.data, safe=False)


@api_view(['GET', 'POST'])
def getcityname(request, cityid):
    if request.method == 'GET':
        data = City.objects.filter(pk=cityid)
        serializer = citySerializer(data, many=True)
        return JsonResponse(serializer.data, safe=False)


@api_view(['GET', 'POST'])
def addcity(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
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
def createasset(request,cityid):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = AssetSerializer(data=data)
        print(data)
        if serializer.is_valid():
            serializer.save()
        else:
            print("invalid data")
        return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
    if request.method == 'GET':
        data = Asset.objects.filter(Asset_CityId=cityid)
        serializer = AssetSerializer(data, many=True)
        return JsonResponse(serializer.data, safe=False)

@api_view(['GET', 'POST'])
def getfacility(request, cityid):
    if request.method == 'GET':
        data = Facility.objects.filter(Facility_cityid_id=cityid)
        serializer = facilitySerializer(data, many=True)
        return JsonResponse(serializer.data, safe=False)
    
@api_view(['GET', 'POST'])
def returnasset(request, itemid):
    if request.method == 'GET':
        data = Asset.objects.filter(AssetId=itemid)
        serializer = AssetSerializer(data, many=True)
        return JsonResponse(serializer.data, safe=False)


@api_view(['GET', 'POST'])
def facility(request, mayorid):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        for value in range(len(FACILITY_CHOICES)):
            global cartcount
            faciname = FACILITY_CHOICES[value][1]
            if (faciname == 'Municipality Office' or faciname == 'Clock Tower' or faciname == 'Public Dustbin' or faciname == 'Municipality Landfill' or faciname == 'Garbage Truck'):
                if (faciname == 'Municipality Office'):
                    cartIds = str(data['Facility_cityid_id']
                                  )+'_'+str(cartcount)
                    serval = {'Facilityname': faciname, 'Facility_cityid': data['Facility_cityid_id'],
                              'Owner_status': 'Active', 'Owner_id': mayorid, 'Cashbox': '', 'LedgerId': '0', 'cartId': cartIds}
                else:
                    serval = {'Facilityname': faciname, 'Facility_cityid': data['Facility_cityid_id'],
                              'Owner_status': 'Active', 'Owner_id': mayorid, 'Cashbox': '', 'LedgerId': '0', 'cartId': '0'}
            else:
                cartcount = cartcount+1
                cartIds = str(data['Facility_cityid_id'])+'_'+str(cartcount)
                serval = {'Facilityname': faciname, 'Facility_cityid': data['Facility_cityid_id'],
                          'Owner_status': '', 'Owner_id': '', 'Cashbox': '', 'LedgerId': '0', 'cartId': cartIds}
            serializer = facilitySerializer(data=serval)
            if serializer.is_valid():
                serializer.save()
            else:
                print("invalid data")
        return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
    if request.method == 'GET':
        data = Facility.objects.all()
        serializer = facilitySerializer(data, many=True)
        return JsonResponse(serializer.data, safe=False)


@api_view(['GET', 'POST', 'PUT'])
def updatefacility(request):
    if request.method == 'PUT':
        data = JSONParser().parse(request)
        serval = {'Owner_id': data['Owner_id'], 'Owner_status': 'Active'}
        getfacility = Facility.objects.filter(
            Facilityname=data['Facilityname'], Facility_cityid=data['Facility_cityid_id']).first()
        serializer = facilitySerializer(getfacility, data=serval, partial=True)
        if serializer.is_valid():
            serializer.save()
        else:
            print("invalid data")
        return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'POST'])
def cityrule(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = cityRuleSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
        else:
            print("invalid data")
        return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
    if request.method == 'GET':
        data = Cityrule.objects.all()
        serializer = cityRuleSerializer(data, many=True)
        return JsonResponse(serializer.data, safe=False)


@api_view(['GET', 'POST'])
def editcity(request, cityid):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        getcity = City.objects.filter(pk=cityid)
        serializer = citySerializer(getcity, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
        else:
            print("invalid data")
        return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'POST', 'PUT'])
def updateusercity(request, userid):
    if request.method == 'PUT':
        data = JSONParser().parse(request)
        getuser = CustomUser.objects.filter(pk=userid).first()
        serializer = userSerializer(getuser, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
        else:
            print("invalid data")
        return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
    if request.method == 'GET':
        data = CustomUser.objects.all()
        serializer = userSerializer(data, many=True)
        return JsonResponse(serializer.data, safe=False)
