from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import Asset, Auditlog, CustomUser
from django.dispatch import Signal
from .userData import UserData
import threading
import time
from django.db import transaction
from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from .models import City
from django.db.models import F


user_data_received = Signal()


@receiver(pre_save, sender=Asset)
def track_changes(sender, instance, **kwargs):
    """Store the original instance values before saving."""
    if instance.pk:
        instance._original = sender.objects.get(pk=instance.pk)


@receiver(post_save, sender=Asset)
def record_audit_trail_on_save(sender, instance, created,  **kwargs):
    # user_data = UserData.get_instance()

    if created:
        Auditlog.objects.create(
            action='INSERT',
            AssetId=instance.AssetId,
            CityId=instance.Asset_CityId_id,
            ContentCode=instance.Content_Code,
            Bottle_Code=instance.Bottle_Code,
            Bottle_loc=instance.Bottle_loc,
            TransactionId='',
            TransactionDate='',
            FromFacility='Supermarket shelf',
            ToFacility='',
            userName='Mayor',
            assetStatus=instance.Bottle_Status,
            remQuantity=0,
            Unit=instance.Units,
            ManufactureDate=instance.DOM,
            refillCount=instance.Max_Refill_Count,
            currentselfrefillCount=instance.Current_SelfRefill_Count,
            currentplantrefillCount=instance.Current_PlantRefill_Count,
            Current_Content_Code=instance.Content_Code,
            LatestFillDate=instance.Latest_Refill_Date,
            bottleRetireDate=instance.Retirement_Date,
            RetireReason=instance.Retire_Reason,
        )
    else:
        # Check for updated fields
        changed_fields = []
        if hasattr(instance, '_original'):
            for field in instance._meta.fields:
                field_name = field.name
                original_value = getattr(instance._original, field_name, None)
                new_value = getattr(instance, field_name, None)
                if original_value != new_value:
                    changed_fields.append(field_name)

        DEFAULT_FIELDS = {
        "Transaction_Id": "",
        "Fromfacility": "",
        "Tofacility": "",
        "Transaction_Date": "",
        "Latest_Refill_Date": "",
        "Current_Content_Code": "",
        }

        for field, default_value in DEFAULT_FIELDS.items():
            if field not in changed_fields:
                setattr(instance, field, default_value)
      
        if changed_fields:
            # Create a detailed log
            Auditlog.objects.create(
                action=f"UPDATE: {', '.join(changed_fields)}" if changed_fields else "UPDATE: No changes detected",
                AssetId=instance.AssetId,
                CityId=instance.Asset_CityId_id,
                ContentCode=instance.Content_Code,
                Bottle_Code=instance.Bottle_Code,
                Bottle_loc=instance.Bottle_loc,
                assetStatus=instance.Bottle_Status,
                TransactionId=instance.Transaction_Id,  # Only set if TransactionId exists
                TransactionDate=instance.Transaction_Date,
                FromFacility=instance.Fromfacility,
                ToFacility=instance.Tofacility,
                refillCount=instance.Max_Refill_Count,
                currentselfrefillCount=instance.Current_SelfRefill_Count,
                currentplantrefillCount=instance.Current_PlantRefill_Count,
                Current_Content_Code=instance.Current_Content_Code,
                remQuantity=instance.remQuantity,
                Unit=instance.Units,
                ManufactureDate=instance.DOM,
                LatestFillDate=instance.Latest_Refill_Date,
                bottleRetireDate=instance.Retirement_Date,
                RetireReason=instance.Retire_Reason,
                userName=instance.Tofacility
            )
        transaction.on_commit(lambda: instance.reset_attributes())


user_data_received.connect(record_audit_trail_on_save,
                           sender=None, weak=True, dispatch_uid=None)


timers = {}


class CityTimer(threading.Thread):
    def __init__(self, city_id, clocktickrate):
        super().__init__()
        self.city_id = city_id
        self.clocktickrate = clocktickrate
        self.intervalcalculation = 86400 / (self.clocktickrate * 60)
        self.running = True
        self.last_update_day = None

    def run(self):
        print(f'Starting timer for city {self.city_id}')

        while self.running:
            time.sleep(1)
            with transaction.atomic():
                city = City.objects.select_for_update().get(pk=self.city_id)
                city.CurrentTime += self.intervalcalculation

                if city.CurrentTime >= 86400:  # 24 hours
                    city.CurrentTime = 0
                    city.CurrentDay += 1

                if city.CurrentDay >= 365:  # 365 days
                    city.CurrentDay = 0

                # Check if 30 days have passed and update wallets if needed
                if city.CurrentDay % 30 == 0 and city.CurrentDay != self.last_update_day:
                    self.update_wallets(city.CityId)
                    self.last_update_day = city.CurrentDay

                city.save()

    def update_wallets(self, city_id):
        CustomUser.objects.filter(User_cityid=city_id).update(
            wallet=F('wallet') + 2000)
        print(f'Successfully updated wallets for users in city ID: {city_id}')

    def stop(self):
        self.running = False


def start_timer_for_city(city):
    timer = CityTimer(city.CityId, city.Clocktickrate)
    timers[city.CityId] = timer
    timer.start()


def stop_timer_for_city(city_id):
    if city_id in timers:
        timers[city_id].stop()
        del timers[city_id]


@receiver(post_save, sender=City)
def start_timer_on_create(sender, instance, created, **kwargs):
    if created:
        start_timer_for_city(instance)