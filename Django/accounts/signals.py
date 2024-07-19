
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import Asset, audit_log
from django.dispatch import Signal
from .userData import UserData
import threading
import time
from django.db import transaction
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import City


user_data_received = Signal()


@receiver(post_save, sender=Asset)
def record_audit_trail_on_save(sender, instance, created,  **kwargs):
    # user_data = UserData.get_instance()

    if created:
        audit_log.objects.create(
            action='INSERT',
            AssetId=instance.AssetId,
            CityId=instance.Asset_CityId_id,
            Bottle_loc=instance.Bottle_loc,
            TransactionId='',
            TransactionDate='',
            FromFacility='Supermarket shelf',
            ToFacility='',
            userName='Mayor',
            ContentCode=instance.Content_Code,
            assetStatus=instance.Bottle_Status,
            Quantity=instance.Quantity,
            remQuantity=0,
            Unit=instance.Units,
            ManufactureDate=instance.DOM,
            refillCount=instance.Max_Refill_Count,
            currentrefillCount=instance.Current_Refill_Count,
            LatestFillDate=instance.Latest_Refill_Date,
            bottleRetireDate=instance.Retirement_Date,
            RetireReason=instance.Retire_Reason,
        )
    else:
        audit_log.objects.create(
            action='Update',
            AssetId=instance.AssetId,
            CityId=instance.Asset_CityId,
            Bottle_loc=instance.Bottle_loc,
            TransactionId=instance.Transaction_Id,
            TransactionDate=instance.Transaction_Date,
            FromFacility=instance.Fromfacility,
            ToFacility=instance.Tofacility,
            ContentCode=instance.Content_Code,
            assetStatus=instance.Bottle_Status,
            Quantity=instance.Quantity,
            remQuantity=instance.remQuantity,
            Unit=instance.Units,
            ManufactureDate=instance.DOM,
            refillCount=instance.Max_Refill_Count,
            currentrefillCount=instance.Current_Refill_Count,
            LatestFillDate=instance.Latest_Refill_Date,
            bottleRetireDate=instance.Retirement_Date,
            RetireReason=instance.Retire_Reason,
            userName=instance.Tofacility
        )


user_data_received.connect(record_audit_trail_on_save,
                           sender=None, weak=True, dispatch_uid=None)


timers = {}


class CityTimer(threading.Thread):
    def __init__(self, city_id, clocktickrate):
        super().__init__()
        self.city_id = city_id
        self.clocktickrate = clocktickrate
        self.intervalcalculation= 86400/(self.clocktickrate*60)
        self.running = True

    def run(self):
        print(f'Starting timer for city {self.city_id}')
        
        while self.running:

            time.sleep(1)
            with transaction.atomic():
                city = City.objects.select_for_update().get(pk=self.city_id)
                city.CurrentTime += self.intervalcalculation
                if({self.city_id}==6):
                    print('printing city 6 time ',(city.CurrentTime))
                if city.CurrentTime >= 86400:  # 24 hours
                    city.CurrentTime = 0
                    city.CurrentDay += 1

                if city.CurrentDay >= 365:  # 365 days
                    city.CurrentDay = 0

                city.save()

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
