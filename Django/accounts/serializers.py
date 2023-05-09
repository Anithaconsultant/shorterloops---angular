from rest_framework import serializers
from accounts.models import City,CustomUser,Facility,Cityrule



class userSerializer(serializers.ModelSerializer):
    class Meta:
        model= CustomUser
        fields = '__all__'

class citySerializer(serializers.ModelSerializer):
    class Meta:
        model= City
        fields = [ 'CityId','CityName', 'MayorId', 'Clocktickrate', 'Citystartdate',
                  'CityCreateTime', 'Status']

class facilitySerializer(serializers.ModelSerializer):
    class Meta:
        model= Facility
        fields = '__all__'

class cityRuleSerializer(serializers.ModelSerializer):
    class Meta:
        model= Cityrule
        fields = '__all__'
        
        