from rest_framework import serializers
from accounts.models import City, CustomUser, Facility, Cityrule, Asset, Shampooprice, Bottleprice, Cashflow,audit_log


class userSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'


class shampooSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shampooprice
        fields = '__all__'


class BottleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bottleprice
        fields = '__all__'


class citySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = '__all__'


class facilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Facility
        fields = '__all__'


class cashflowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cashflow
        fields = '__all__'


class cityRuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cityrule
        fields = '__all__'


class AssetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asset
        fields = '__all__'
        
class AuditSerializer(serializers.ModelSerializer):
    class Meta:
        model = audit_log
        fields = '__all__'
