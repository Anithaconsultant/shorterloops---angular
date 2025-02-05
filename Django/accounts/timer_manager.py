from .cityTimer import CityTimer
import threading
timers = {}
lock = threading.Lock()

def start_timer_for_city(city):
    global timers
    with lock:
        if city.CityId not in timers:
            timer = CityTimer(city.CityId, city.Clocktickrate)
            timers[city.CityId] = timer
            timer.start()
            print(timers)
            print(f"Timer for city {city.CityId} started.")

def stop_timer_for_city(city_id):
    global timers
    with lock:
        if city_id in timers:
            timers[city_id].stop()
            del timers[city_id]
            print(f"Timer for city {city_id} stopped.")

def pause_timer_for_city(city_id):
    global timers
    with lock:
        print(timers)
        if city_id in timers:
            timers[city_id].pause()
            print(f"Timer for city {city_id} paused.")
        else:
            print(f"No timer found for city {city_id}")

def resume_timer_for_city(city_id):
    global timers
    with lock:
        if city_id in timers:
            timers[city_id].resume()
            print(f"Timer for city {city_id} resumed.")
        else:
            print(f"No timer found for city {city_id}")
