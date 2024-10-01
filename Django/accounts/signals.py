
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import Asset, audit_log, CustomUser
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
        print('update_wallet', city_id)
        users = CustomUser.objects.filter(User_cityid=city_id)
        for user in users:
            
            # Assuming wallet is stored as a string, adjust if necessary
            print(user.wallet)
            user.wallet = str(float(user.wallet) + 2000)
            print(user.wallet)
            user.save()

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
