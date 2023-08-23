from django.db.models.signals import post_save
from django.dispatch import receiver
from background_task import background

from .models import Counter

@receiver(post_save, sender=Counter)
def increment_counter(sender, instance, **kwargs):
    instance.value += 1
    instance.save()

@background(schedule=10)  # Schedule the task to run every 10 seconds
def auto_increment_counter():
    counter = Counter.objects.first()
    if counter:
        counter.save()  # This triggers the signal and increments the counter
