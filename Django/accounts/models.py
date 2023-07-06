
from django.db import models
import datetime


FACILITY_CHOICES = (('mun', 'Municipality Office'),
                    ('sup', 'Supermarket Owner'),
                    ('clk', 'Clock Tower'),
                    ('btl', 'Universal bottle Plant Owner'),
                    ('rev', 'Reverse Vending Machine Owner'),
                    ('rec', 'Plastic Recycling plant Owner'),
                    ('ref', 'Refilling Van Owner'),
                    ('dus', 'Public Dustbin'),
                    ('lnd', 'Municipality Landfill'),
                    ('grt', 'Garbage Truck'),
                    ('bct', 'Bottle Collection Truck'),
                    ('ret', 'Recycling Truck Owner'),
                    ('hs1', 'House1 Owner'),
                    ('hs2', 'House2 Owner'),
                    ('hs3', 'House3 Owner'),
                    ('hs4', 'House4 Owner'),
                    ('hs5', 'House5 Owner'),
                    ('hs6', 'House6 Owner'),
                    ('hs7', 'House7 Owner'),
                    ('hs8', 'House8 Owner'),
                    ('hs9', 'House9 Owner'),
                    ('hs10', 'House10 Owner'))


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
    Facility_cityid =models.CharField(max_length=60)
    FacilityId = models.AutoField(primary_key=True)
    Facilityname = models.CharField(max_length=60)
    Owner_status = models.CharField(max_length=70, blank=True, default='')
    Owner_id = models.CharField(max_length=70, blank=True, default='')
    Cashbox = models.CharField(max_length=70, blank=True, default='')
    LedgerId = models.CharField(default='', blank=True, max_length=70, )
    cartId = models.CharField(blank=True, max_length=70, default='')


class Asset(models.Model):
    class Meta:
        db_table = "Asset"
    AssetDbId = models.AutoField(primary_key=True)
    AssetId =models.CharField(max_length=1000, blank=True)
    Asset_CityId = models.ForeignKey("city", on_delete=models.CASCADE)
    CategoryCode= models.CharField(max_length=1000, blank=True)
    Bottle_Code= models.CharField(max_length=1000, blank=True)
    Content_Code= models.CharField(max_length=1000, blank=True)
    Quantity = models.CharField(max_length=70, blank=True)
    Units = models.CharField(max_length=70, blank=True)
    Bottle_loc= models.CharField(max_length=1000, blank=True)
    Bottle_Status= models.CharField(max_length=1000, blank=True)
    DOM=models.CharField(max_length=70, blank=True)
    Max_Refill_Count=models.IntegerField(default=5, blank=True)
    Current_Refill_Count=models.IntegerField(default=5, blank=True)
    Latest_Refill_Date=models.CharField(max_length=70, blank=True)
    Retirement_Date=models.CharField(max_length=70, blank=True)
    Retire_Reason=models.CharField(max_length=70, blank=True)
    Content_Price = models.CharField(max_length=70, blank=True)
    Bottle_Price=models.CharField(max_length=70, blank=True)
    Redeem_Good=models.CharField(max_length=70, blank=True)
    Redeem_Damaged=models.CharField(max_length=70, blank=True)
    Discount_RefillB=models.CharField(max_length=70, blank=True)
    Env_Tax=models.CharField(max_length=70, blank=True)
    Discard_fine=models.CharField(max_length=70, blank=True)
    Transaction_Id = models.CharField(max_length=70, blank=True)
    Transaction_Date= models.CharField(max_length=70, blank=True)
    Fromfacility = models.CharField(max_length=70, blank=True)
    Tofacility = models.CharField(max_length=70, blank=True)
    
    
   


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
    cartId = models.CharField(max_length=30, blank=True, default=0)
    avatar = models.CharField(max_length=30, blank=True)
    gender=models.CharField(max_length=30, blank=True)
    login=models.CharField(max_length=30, blank=False,default=0)
