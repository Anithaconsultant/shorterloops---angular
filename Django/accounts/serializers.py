from rest_framework import serializers
from accounts.models import City,CustomUser,Facility



class userSerializer(serializers.ModelSerializer):
    class Meta:
        model= CustomUser
        fields = [ 'UserId','Username', 'email', 'Password', 'mobile',
                  'wallet', 'status', 'User_cityid', 'Role']

class citySerializer(serializers.ModelSerializer):
    class Meta:
        model= City
        fields = [ 'CityId','CityName', 'MayorId', 'Clocktickrate', 'Citystartdate',
                  'CityCreateTime', 'Status']

class facilitySerializer(serializers.ModelSerializer):
    class Meta:
        model= Facility
        fields = [ 'Facility_cityid','Facilityname', 'Owner_status', 'Owner_id', 'Cashbox',
                  'LedgerId', 'cartId']
