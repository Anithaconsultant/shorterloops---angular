
from django.db import models
import datetime


FACILITY_CHOICES = (('mun', 'Municipality Office'),
                    ('sup', 'Supermarket'),
                    ('gro', 'Grocery shop'),
                    ('clk', 'Clock Tower'),
                    ('btl', 'Ubottle'),
                    ('plt', 'Making plant'),
                    ('rev', 'Reverse Vending Machine'),
                    ('rec', 'Plastic Recycling plant'),
                    ('ref', 'Refilling Van'),
                    ('dus', 'Public Dustbin'),
                    ('lnd', 'Municipality landfill'),
                    ('grt', 'Garbage truck'),
                    ('bct', 'Bottle collection truck'),
                    ('ret', 'Recycling truck'),
                    ('hs1', 'House1'),
                    ('hs2', 'House2'),
                    ('hs3', 'House3'),
                    ('hs4', 'House4'),
                    ('hs5', 'House5'),
                    ('hs6', 'House6'),
                    ('hs7', 'House7'),
                    ('hs8', 'House8'),
                    ('hs9', 'House9'),
                    ('hs10', 'House10'))


class City(models.Model):
    class Meta:
        db_table = "city"

    CityId = models.AutoField(primary_key=True)
    CityName = models.CharField(max_length=70, unique=True)
    MayorId = models.IntegerField(null=True, unique=True)
    Clocktickrate = models.IntegerField(default=100)
    Citystartdate = models.DateField(default=datetime.date.today)
    CityCreateTime = models.TimeField(auto_now=True)
    Status = models.CharField(max_length=70, null=True)


class Facility(models.Model):
    class Meta:
        db_table = "facility"
    Facility_cityid = models.ForeignKey("city", on_delete=models.CASCADE)
    FacilityId = models.AutoField(primary_key=True)
    Facilityname = models.CharField(max_length=60)
    Owner_status = models.CharField(max_length=70, blank=True, default='')
    Owner_id = models.CharField(max_length=70, blank=True, default='')
    Cashbox = models.CharField(max_length=70, blank=True, default='')
    LedgerId = models.CharField(default='',blank=True,max_length=70, )
    cartId = models.CharField(blank=True, max_length=70, default='')


class Asset(models.Model):
    class Meta:
        db_table = "Assets"
    Asset_cityid = models.ForeignKey("city", on_delete=models.CASCADE)
    BatchId = models.IntegerField(default=1, blank=True)
    BatchSize = models.IntegerField(default=1, blank=True)
    AssetId = models.AutoField(primary_key=True)
    Description = models.CharField(max_length=1000, blank=True)
    TransactionID = models.CharField(max_length=70, blank=True, unique=True)
    Branding = models.CharField(max_length=70, blank=True)
    sellingPrice = models.IntegerField(default=0, blank=True)
    costPrice = models.IntegerField(default=0, blank=True)
    Bottle_Status = models.CharField(max_length=70, blank=True)
    Bottle_content = models.CharField(max_length=70, blank=True)
    Date_manufactured = models.DateField(
        default=datetime.date.today, blank=True)
    First_refill = models.DateField(default=datetime.date.today, blank=True)
    Second_refill = models.DateField(default=datetime.date.today, blank=True)
    Third_refill = models.DateField(default=datetime.date.today, blank=True)
    Fourth_refill = models.DateField(default=datetime.date.today, blank=True)
    Fifth_refill = models.DateField(default=datetime.date.today, blank=True)
    expire_date = models.DateField(default=datetime.date.today, blank=True)
    asset_tran_date = models.DateField(default=datetime.date.today, blank=True)
    Fromfacility = models.CharField(max_length=70, blank=True)
    Tofacility = models.CharField(max_length=70, blank=True)
    Moneyfrom = models.CharField(max_length=70, blank=True)
    MoneyTo = models.CharField(max_length=70, blank=True)
    Quantity = models.CharField(max_length=70, blank=True)
    Units = models.CharField(max_length=70, blank=True)


class Cityrule(models.Model):
    class Meta:
        db_table = "Cityrule"
    rule_city = models.IntegerField(blank=True)
    ruleId = models.AutoField(primary_key=True)
    Date_create = models.DateField(default=datetime.date.today, blank=True)
    Time = models.TimeField()
    virginplastic_cost = models.IntegerField(blank=True)
    recycledplastic_cost = models.IntegerField(blank=True)
    EnvTx_P_shampoo = models.IntegerField(blank=True)
    EnvTx_P_beverage = models.IntegerField(blank=True)
    EnvTx_P_cleaner = models.IntegerField(blank=True)
    EnvTx_P_pickle = models.IntegerField(blank=True)
    EnvTx_P_Bvb = models.IntegerField(blank=True)
    EnvTx_P_Brcb = models.IntegerField(blank=True)
    EnvTx_P_Brfb = models.IntegerField(blank=True)
    EnvTx_P_Uvb = models.IntegerField(blank=True)
    EnvTx_P_Urcb = models.IntegerField(blank=True)
    EnvTx_P_Urfb = models.IntegerField(blank=True)
    EnvTx_UB_v_m = models.IntegerField(blank=True)
    EnvTx_UB_rc_m = models.IntegerField(blank=True)
    EnvTx_UB_xx_c = models.IntegerField(blank=True)
    EnvTx_R_Bvb = models.IntegerField(blank=True)
    EnvTx_R_Brcb = models.IntegerField(blank=True)
    EnvTx_R_Brfb = models.IntegerField(blank=True)
    EnvTx_R_Uvb = models.IntegerField(blank=True)
    EnvTx_R_Urcb = models.IntegerField(blank=True)
    EnvTx_R_Urfb = models.IntegerField(blank=True)
    EnvTx_C_Bvb = models.IntegerField(blank=True)
    EnvTx_C_Brcb = models.IntegerField(blank=True)
    EnvTx_C_Brfb = models.IntegerField(blank=True)
    EnvTx_C_Uvb = models.IntegerField(blank=True)
    EnvTx_C_Urcb = models.IntegerField(blank=True)
    EnvTx_C_Urfb = models.IntegerField(blank=True)
    Return_B_G = models.IntegerField(blank=True)
    Return_U_G = models.IntegerField(blank=True)
    Return_U_B = models.IntegerField(blank=True)
    Return_B_B = models.IntegerField(blank=True)
    Dustbin_penalty = models.IntegerField(blank=True)
    Dustbin_display = models.BooleanField(default=0, blank=True)
    Carbage_display = models.BooleanField(default=0, blank=True)


class CustomUser(models.Model):
    class Meta:
        db_table = 'usertable'
    UserId = models.AutoField(primary_key=True)
    Username = models.CharField(max_length=70, blank=False, unique=True)
    email = models.CharField(max_length=50, blank=False, unique=True)
    Password = models.CharField(max_length=70, blank=False)
    mobile = models.CharField(blank=False, max_length=20)
    wallet = models.CharField(max_length=70, default=2000, blank=False)
    status = models.CharField(max_length=70, blank=False)
    User_cityid = models.CharField(max_length=11, blank=True, default=0)
    Role = models.CharField(max_length=30, blank=True)
