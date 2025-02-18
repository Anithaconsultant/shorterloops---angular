import threading
import time
from django.db import transaction
from .models import City, CustomUser
from django.db.models import F 

class CityTimer(threading.Thread):
    def __init__(self, city_id, clocktickrate):
        super().__init__()
        self.city_id = city_id
        self.clocktickrate = clocktickrate
        self.intervalcalculation = 86400 / (self.clocktickrate * 60)
        self.running = True
        self.paused = False  # Track pause status
        self.pause_event = threading.Event()
        self.pause_event.set()  # Start unpaused
        self.last_update_day = None
        self.lock = threading.Lock()  # For synchronizing access to shared resources

    # def run(self):
    #     print(f"Starting timer for city {self.city_id}")

    #     while self.running:
    #         with self.lock:  # Ensure that shared resources are accessed safely
    #             # Ensure execution pauses when paused
    #             self.pause_event.wait()  

    #             time.sleep(1)
    #             with transaction.atomic():
    #                 city = City.objects.select_for_update().get(pk=self.city_id)
    #                 city.CurrentTime += self.intervalcalculation
    #                 if city.CurrentTime >= 86400:  # 24 hours passed
    #                     city.CurrentTime = 0
    #                     city.CurrentDay += 1

    #                 if city.CurrentDay != 0 and city.CurrentDay % 30 == 0 and city.CurrentDay != self.last_update_day:
    #                     self.update_wallets(city.CityId)
    #                     self.last_update_day = city.CurrentDay

    #                 city.save()
    def run(self):
        print(f"Starting timer for city {self.city_id}")

        while self.running:
            with self.lock:  # Ensure that shared resources are accessed safely
                city = City.objects.get(pk=self.city_id)

                # Check if the timer should be paused based on DB value
                if city.timer_paused:
                    self.pause()
                else:
                    self.resume()

                # Ensure execution pauses when paused
                self.pause_event.wait()

                time.sleep(1)
                with transaction.atomic():
                    city = City.objects.select_for_update().get(pk=self.city_id)
                    city.CurrentTime += self.intervalcalculation
                    if city.CurrentTime >= 86400:  # 24 hours passed
                        city.CurrentTime = 0
                        city.CurrentDay += 1

                    if city.CurrentDay != 0 and city.CurrentDay % 30 == 0 and city.CurrentDay != self.last_update_day:
                        self.update_wallets(city.CityId)
                        self.last_update_day = city.CurrentDay

                    city.save()

    def update_wallets(self, city_id):
        CustomUser.objects.filter(User_cityid=city_id).update(wallet=F("wallet") + 2000)
        CustomUser.objects.filter(User_cityid=city_id).update(update_count=F("update_count") + 1)
        print(f"Successfully updated wallets for users in city ID: {city_id}")

    def pause(self):
        """Pause the timer"""
        print("am i working")
        with self.lock:
            if not self.paused:
                self.paused = True
                self.pause_event.clear()  # This will cause `pause_event.wait()` to block
                print(f"Timer for city {self.city_id} paused.")

    def resume(self):
        """Resume the timer"""
        with self.lock:
            if self.paused:
                self.paused = False
                self.pause_event.set()  # Unblocks `pause_event.wait()`
                print(f"Timer for city {self.city_id} resumed.")

    def stop(self):
        """Stop the timer completely"""
        with self.lock:
            self.running = False
            self.pause_event.set()  # Ensure it exits even if paused
            print(f"Timer for city {self.city_id} stopped.")



