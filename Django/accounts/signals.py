
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import Asset, audit_log
from django.dispatch import Signal

user_data_received = Signal('user_data')
print(user_data_received)


@receiver(post_save, sender=Asset)
def record_audit_trail_on_save(sender,instance, created,user_data,  **kwargs):
        print("hello")

        if created:
            username = user_data.get('currentuser')
            CityId = user_data.get('CityId')
            print(username, CityId)

            audit_log.objects.create(
                userName=username,
                model_name=Asset,
                action='INSERT',
                AssetId=instance.AssetId,
            )
        else:
            if (instance.purchased):
                audit_log.objects.create(
                    userName=current_user,
                    model_name=Asset,
                    action='Updated/Purchased',
                    AssetId=instance.AssetId,
                    currentPlace=current_user.cartId,
                    assetStatus='Full')
user_data_received.connect(record_audit_trail_on_save, sender=None, weak=True, dispatch_uid=None)