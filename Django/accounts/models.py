
from django.db import models
import datetime
import uuid
FACILITY_CHOICES = (
    ('mun', 'Municipality Office', '100000'),
    ('b1p', 'B1 Shampoo Producer', '500000'),
    ('b2p', 'B2 Shampoo Producer', '500000'),
    ('b3p', 'B3 Shampoo Producer', '500000'),
    ('b4p', 'B4 Shampoo Producer', '500000'),
    ('b5p', 'B5 Shampoo Producer', '500000'),
    ('sup', 'Supermarket Owner', '500000'),
    ('btl', 'Universal Bottle Manufacturing Plant owner', '200000'),
    ('rev', 'Bottle Reverse Vending Machine Owner', '100000'),
    ('rec', 'Plastic Recycling Plant Owner', '200000'),
    ('ref', 'Shampoo Refilling Station Owner', '200000'),
    ('ubc', 'Universal Bottle Cleaning Plant Owner', '200000'),
    ('rgp', 'Rag picker', '2000'),
    ('hs1', 'House1 Owner', ''),
    ('hs2', 'House2 Owner', ''),
    ('hs3', 'House3 Owner', ''),
    ('hs4', 'House4 Owner', ''),
    ('hs5', 'House5 Owner', ''),
    ('hs6', 'House6 Owner', ''),
    ('hs7', 'House7 Owner', ''),
    ('hs8', 'House8 Owner', ''),
    ('hs9', 'House9 Owner', ''),
    ('hs10', 'House10 Owner', '')
)

class Shampooprice(models.Model):
    class Meta:
        db_table = "Shampooprice"
    BottleContent = models.CharField(max_length=70)
    UnitPrice = models.FloatField(default=0.0)
    Discount = models.IntegerField(default=0)


class Bottleprice(models.Model):
    class Meta:
        db_table = "bottleprice"
    BottleType = models.CharField(max_length=70)
    OriginalPrice = models.FloatField(default=0.0)
    percentReturnGood = models.FloatField(default=0.0)
    percentReturnDamage = models.FloatField(default=0.0)
    percentPurchasediscount_refill = models.FloatField(default=0.0)
    percentEnvTax_newbottle = models.FloatField(default=0.0)
    percentEnvTax_refillbottle = models.FloatField(default=0.0)
    Fine_Discard = models.FloatField(default=0.0)


class Cashflow(models.Model):
    class Meta:
        db_table = "Cashflow"
    TransactionId = models.CharField(max_length=70, unique=True)
    Amount = models.CharField(max_length=70)
    DebitFacility = models.CharField(max_length=70)
    CreditFacility = models.CharField(max_length=70)
    Purpose = models.CharField(max_length=70)


class City(models.Model):
    class Meta:
        db_table = "city"
    CityId = models.AutoField(primary_key=True)
    CityName = models.CharField(max_length=70, unique=True)
    MayorId = models.IntegerField(null=True, unique=True)
    Clocktickrate = models.IntegerField(default=1)
    CurrentTime = models.IntegerField(default=0)
    CurrentDay = models.IntegerField(default=0)
    Citystartdate = models.DateField(default=datetime.date.today)
    CityCreateTime = models.TimeField(auto_now=True)
    Status = models.CharField(max_length=70, null=True)
    cityavatar = models.CharField(max_length=70, null=True)
   

class Facility(models.Model):
    class Meta:
        db_table = "facility"
    Facility_cityid = models.CharField(max_length=60)
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
    AssetId = models.CharField(max_length=1000, blank=True)
    Asset_CityId = models.ForeignKey("city", on_delete=models.CASCADE)
    CategoryCode = models.CharField(max_length=1000, blank=True)
    Bottle_Code = models.CharField(max_length=1000, blank=True)
    Content_Code = models.CharField(max_length=1000, blank=True)
    Current_Content_Code = models.CharField(max_length=1000, blank=True)
    Quantity = models.CharField(max_length=70, blank=True)
    remQuantity = models.CharField(max_length=70, blank=True)
    Units = models.CharField(max_length=70, blank=True)
    Bottle_loc = models.CharField(max_length=1000, blank=True)
    Bottle_Status = models.CharField(max_length=1000, blank=True)
    DOM = models.CharField(max_length=70, blank=True)
    Max_Refill_Count = models.IntegerField(default=5, blank=True)
    Current_PlantRefill_Count = models.IntegerField(default=0, blank=True)
    Current_SelfRefill_Count = models.IntegerField(default=0, blank=True)
    Latest_Refill_Date = models.CharField(max_length=70, blank=True)
    Retirement_Date = models.CharField(max_length=70, blank=True)
    Retire_Reason = models.CharField(max_length=70, blank=True)
    Content_Price = models.CharField(max_length=70, blank=True)
    Bottle_Price = models.CharField(max_length=70, blank=True)
    Redeem_Good = models.CharField(max_length=70, blank=True)
    Redeem_Damaged = models.CharField(max_length=70, blank=True)
    Discount_RefillB = models.CharField(max_length=70, blank=True)
    Env_Tax = models.CharField(max_length=70, blank=True)
    Discard_fine = models.CharField(max_length=70, blank=True)
    Transaction_Id = models.CharField(max_length=70, blank=True,default='')
    Transaction_Date = models.CharField(max_length=70, blank=True)
    Fromfacility = models.CharField(max_length=70, blank=True)
    Tofacility = models.CharField(max_length=70, blank=True)
    purchased = models.BooleanField(default=False)
    dragged = models.BooleanField(default=False)
    correlation_id = models.CharField(max_length=100, blank=True, null=True)
    def save(self, *args, **kwargs):
        if not self.correlation_id:
            self.correlation_id = str(uuid.uuid4())
        super(Asset, self).save(*args, **kwargs)
    def reset_attributes(self):
        """Reset the instance attributes to their current database state."""
        db_instance = type(self).objects.get(pk=self.pk)
        for field in self._meta.fields:
            setattr(self, field.name, getattr(db_instance, field.name))

class Cityrule(models.Model):
    class Meta:
        db_table = "Cityrule"
    
    ruleId = models.AutoField(primary_key=True)
    cityId = models.CharField(max_length=70, blank=True)
    rule_number = models.CharField(max_length=70, blank=True)
    day_number = models.CharField(max_length=70, blank=True)
    time_in_hours = models.FloatField(null=True, blank=True)
    virgin_plastic_price = models.FloatField(null=True, blank=True)
    recycled_plastic_price = models.FloatField(null=True, blank=True)
    envtx_p_shampoo = models.FloatField(null=True, blank=True)
    envtx_p_bvb = models.FloatField(null=True, blank=True)
    envtx_p_brcb = models.FloatField(null=True, blank=True)
    envtx_p_brfb = models.FloatField(null=True, blank=True)
    envtx_ub_v_m = models.FloatField(null=True, blank=True)
    envtx_ub_rc_m = models.FloatField(null=True, blank=True)
    envtx_ub_xx_cl = models.FloatField(null=True, blank=True)
    envtx_r_bvb = models.FloatField(null=True, blank=True)
    envtx_r_brcb = models.FloatField(null=True, blank=True)
    envtx_r_brfb = models.FloatField(null=True, blank=True)
    envtx_r_uvb = models.FloatField(null=True, blank=True)
    envtx_r_urcb = models.FloatField(null=True, blank=True)
    envtx_r_urfB = models.FloatField(null=True, blank=True)
    envtx_c_bvb = models.FloatField(null=True, blank=True)
    envtx_c_brcb = models.FloatField(null=True, blank=True)
    envtx_c_brfb = models.FloatField(null=True, blank=True)
    envtx_c_uvb = models.FloatField(null=True, blank=True)
    envtx_c_urcb = models.FloatField(null=True, blank=True)
    envtx_c_urfB = models.FloatField(null=True, blank=True)
    fine_for_throwing_bottle = models.FloatField(null=True, blank=True)
    dustbinning_fine = models.FloatField(null=True, blank=True)
    display_at_dustbin = models.BooleanField(null=True, blank=True)
    garbage_truck_announcement = models.BooleanField(null=True, blank=True)

    def __str__(self):
        return f"City: {self.city_id}, Rule: {self.rule_number}"

class Auditlog(models.Model):
    class Meta:
        db_table = "audit_log"
    id = models.AutoField(primary_key=True)
    action = models.CharField(max_length=2000, blank=False)
    AssetId = models.CharField(max_length=100, blank=False)
    CityId= models.CharField(max_length=100, blank=True)
    Bottle_loc = models.CharField(max_length=100, blank=False,default="Supermarket shelf")
    TransactionId = models.CharField(max_length=100, blank=True)
    Bottle_Code = models.CharField(max_length=100, blank=True)
    TransactionDate= models.CharField(max_length=100, blank=True)
    FromFacility= models.CharField(max_length=100, blank=False,default="Supermarket shelf")
    ToFacility = models.CharField(max_length=100, blank=True)
    ContentCode = models.CharField(max_length=100, blank=True)
    Current_Content_Code = models.CharField(max_length=100, blank=True)
    assetStatus = models.CharField(max_length=100, blank=False,default="Full")
    remQuantity = models.CharField(max_length=100, blank=True)
    Unit = models.CharField(max_length=100, blank=True)
    ManufactureDate = models.CharField(max_length=100, blank=True)
    refillCount = models.CharField(max_length=100, blank=True)
    currentselfrefillCount = models.CharField(max_length=100, blank=True)
    currentplantrefillCount = models.CharField(max_length=100, blank=True)
    LatestFillDate = models.CharField(max_length=100, blank=True)
    bottleRetireDate = models.CharField(max_length=100, blank=True)
    RetireReason= models.CharField(max_length=100, blank=True)
    userName = models.CharField(max_length=100, blank=False,default="")


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
    gender = models.CharField(max_length=30, blank=True)
    login = models.CharField(max_length=30, blank=False, default=0)
    update_count = models.IntegerField(default=0)
