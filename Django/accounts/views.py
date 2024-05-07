from .userData import UserData
from .models import City, CustomUser, Facility, FACILITY_CHOICES, Cityrule, Asset, Cashflow,audit_log
from .serializers import userSerializer, citySerializer, facilitySerializer, cityRuleSerializer, AssetSerializer, cashflowSerializer,AuditSerializer
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework import status
from django.http import JsonResponse
from django.db import transaction
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
import json
from django.core.exceptions import ObjectDoesNotExist
from .signals import user_data_received
from django.db.models.signals import post_save
data1 = list()
currentuser = ''
cartcount = 100


@transaction.atomic
def confirm_payment(request, seat_number):
    seat = get_object_or_404(Seat, seat_number=seat_number, is_reserved=True)
    # Perform payment processing here...
    seat.is_booked = True
    seat.is_reserved = False
    seat.save()

    return JsonResponse({'message': 'Payment confirmed. Seat booked successfully'})


def reserve_seat(request, seat_number):
    seat = get_object_or_404(Seat, seat_number=seat_number, is_booked=False)
    seat.is_reserved = True
    seat.save()
    return JsonResponse({'message': 'Seat reserved successfully'})


@transaction.atomic
@csrf_exempt
def lockasset(request, itemid):
    try:
        asset = get_object_or_404(Asset, AssetId=itemid, purchased=False)
        if asset.dragged == False:
            asset.dragged = True
            post_save.disconnect(user_data_received, sender=Asset)
            asset.save()

            return JsonResponse({'success': True, 'message': 'item reserved successfully'})
        else:
            return JsonResponse({'success': False, 'message': 'Seat is not available for blocking.'})
    except ObjectDoesNotExist:
        return JsonResponse({'success': False, 'message': 'Seat does not exist.'})


@api_view(['POST'])
@csrf_exempt
def unlockasset(request, itemid):
    if request.method == 'POST':
        asset = Asset.objects.filter(AssetId=itemid).first()
        serializer = AssetSerializer(asset, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
        else:
            print("invalid data")
        return JsonResponse('message', 'updated successfully')


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
        serializer = userSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({'message': 'Success'})
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


@api_view(['GET', 'POST', 'PUT'])
def updatecurrent(request, cityid):
    if request.method == 'PUT':
        data = JSONParser().parse(request)
        getcity = City.objects.filter(pk=cityid).first()
        serializer = citySerializer(getcity, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
        else:
            print("invalid data")
        return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
    if request.method == 'GET':
        getcity = City.objects.filter(pk=cityid).first()
        serializer = citySerializer(getcity, many=True)
        return JsonResponse(serializer.data, safe=False)


@api_view(['GET', 'POST'])
def createasset(request, cityid):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        # print(data)
        serializer = AssetSerializer(data=data)
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
def createtransaction(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = cashflowSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
        else:
            print("invalid data")
        return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
    if request.method == 'GET':
        data = Cashflow.objects.all()
        serializer = cashflowSerializer(data, many=True)
        return JsonResponse(serializer.data, safe=False)


@api_view(['GET', 'POST'])
def getfacility(request, cityid):
    if request.method == 'GET':
        data = Facility.objects.filter(Facility_cityid=cityid)
        serializer = facilitySerializer(data, many=True)
        return JsonResponse(serializer.data, safe=False)


@api_view(['GET', 'PUT'])
def returnasset(request, itemid):
    if request.method == 'GET':
        data = Asset.objects.filter(AssetId=itemid)
        serializer = AssetSerializer(data, many=True)
        # logs = LogEntry.objects.filter(object_id=itemid)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        getasset = Asset.objects.filter(AssetId=itemid).first()
        serializer = AssetSerializer(getasset, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
        else:
            print("invalid data")
        return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'POST'])
def facility(request, mayorid):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        for value in range(len(FACILITY_CHOICES)):
            global cartcount
            faciname = FACILITY_CHOICES[value][1]
            if (faciname == 'Municipality Office' or faciname == 'Clock Tower' or faciname == 'Public Dustbin' or faciname == 'Municipality Landfill' or faciname == 'Garbage Truck'):
                if (faciname == 'Municipality Office'):
                    cartIds = str(data['Facility_cityid']
                                  )+'_'+str(cartcount)
                    serval = {'Facilityname': faciname, 'Facility_cityid': data['Facility_cityid'],
                              'Owner_status': 'Active', 'Owner_id': mayorid, 'Cashbox': '', 'LedgerId': '0', 'cartId': cartIds}
                else:
                    serval = {'Facilityname': faciname, 'Facility_cityid': data['Facility_cityid'],
                              'Owner_status': 'Active', 'Owner_id': mayorid, 'Cashbox': '', 'LedgerId': '0', 'cartId': '0'}
            else:
                cartcount = cartcount+1
                cartIds = str(data['Facility_cityid'])+'_'+str(cartcount)
                serval = {'Facilityname': faciname, 'Facility_cityid': data['Facility_cityid'],
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
            Facilityname=data['Facilityname'], Facility_cityid=data['Facility_cityid']).first()
        serializer = facilitySerializer(getfacility, data=serval, partial=True)
        if serializer.is_valid():
            serializer.save()
        else:
            print("invalid data")
        return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'POST', 'PUT'])
def updatetransactionfacility(request, cityid):
    if request.method == 'PUT':
        data = JSONParser().parse(request)
        serval = {'Owner_id': data['Owner_id'], 'Owner_status': 'Active'}
        getfacility = Facility.objects.filter(
            Facilityname=data['Facilityname'], Facility_cityid=data['Facility_cityid']).first()
        serializer = facilitySerializer(getfacility, data=serval, partial=True)
        if serializer.is_valid():
            serializer.save()
        else:
            print("invalid data")
        return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'PUT'])
def getsupermarketcash(request, cityid):
    if request.method == 'GET':
        data = Facility.objects.filter(
            Facilityname='Supermarket Owner', Facility_cityid=cityid)
        serializer = facilitySerializer(data, many=True)
        return JsonResponse(serializer.data, safe=False)
    if request.method == 'PUT':
        data = JSONParser().parse(request)
        serval = {'Cashbox': data['Cashbox']}
        getfacility = Facility.objects.filter(
            Facilityname='Supermarket Owner', Facility_cityid=cityid).first()
        serializer = facilitySerializer(getfacility, data=serval, partial=True)
        if serializer.is_valid():
            serializer.save()
        else:
            print("invalid data")
        return JsonResponse(serializer.data, safe=False)


@api_view(['GET', 'PUT'])
def getmunicipalitycash(request, cityid):
    if request.method == 'GET':
        data = Facility.objects.filter(
            Facilityname='Municipality Office', Facility_cityid=cityid)
        serializer = facilitySerializer(data, many=True)
        return JsonResponse(serializer.data, safe=False)
    if request.method == 'PUT':
        data = JSONParser().parse(request)
        serval = {'Cashbox': data['Cashbox']}
        getfacility = Facility.objects.filter(
            Facilityname='Municipality Office', Facility_cityid=cityid).first()
        serializer = facilitySerializer(getfacility, data=serval, partial=True)
        if serializer.is_valid():
            serializer.save()
        else:
            print("invalid data")
        return JsonResponse(serializer.data, safe=False)


@api_view(['GET', 'POST', 'PUT'])
def leavefacility(request, userid):
    if request.method == 'PUT':
        data = JSONParser().parse(request)
        getfacility = Facility.objects.filter(Owner_id=userid)
        for record in getfacility:
            serializer = facilitySerializer(record, data=data, partial=True)
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


# @csrf_exempt  # Only if you're accepting POST requests without CSRF token
# def receive_user_data(request):
#     if request.method == 'POST':
#         try:
#             user_data = json.loads(request.headers.get('User-Data', '{}'))
#             userdata = UserData.get_instance()
#             userdata.set_data('username', user_data.get('currentuser'))
#             userdata.set_data('CityId', user_data.get('CityId'))
#             userdata.set_data('currentCartId', user_data.get('currentCartId'))
#             userdata.set_data('CurrentDay', user_data.get('CurrentDay'))
#             return JsonResponse({'message': 'User details received successfully'})
#         except json.JSONDecodeError:
#             return JsonResponse({'error': 'Invalid JSON data'}, status=400)
#     else:
#         return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)


@api_view(['GET'])
def get_audit_logs(request, asset_id):
    data = audit_log.objects.filter(AssetId=asset_id)
    serializer = AuditSerializer(data, many=True)
    return JsonResponse(serializer.data, safe=False)

@api_view(['GET'])
def get_audit_logsuser(request, user):
    print(user)
    data = audit_log.objects.filter(userName=user)
    print(data)
    serializer = AuditSerializer(data, many=True)
    return JsonResponse(serializer.data, safe=False)