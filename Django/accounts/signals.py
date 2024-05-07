
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import Asset, audit_log
from django.dispatch import Signal
from .userData import UserData



user_data_received = Signal()
print(user_data_received)


@receiver(post_save, sender=Asset)
def record_audit_trail_on_save(sender, instance, created,  **kwargs):
    #user_data = UserData.get_instance()

    if created:
        audit_log.objects.create(
            userName=instance.get_data('Tofacility'),
            model_name=Asset,
            action='INSERT',
            AssetId=instance.AssetId,
        )
    else:
        audit_log.objects.create(
            userName=instance.Tofacility,
            model_name=Asset,
            action='Update',
            AssetId=instance.AssetId,
            currentPlace=instance.Bottle_loc,
            currentDay=instance.Transaction_Date,
            assetStatus=instance.Bottle_Status)

user_data_received.connect(record_audit_trail_on_save,
                           sender=None, weak=True, dispatch_uid=None)
