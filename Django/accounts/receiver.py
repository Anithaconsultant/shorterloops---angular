# receivers.py
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import Asset, audit_log
from .userData import UserData
@receiver([post_save, post_delete], sender=Asset)
def update_audit_log(sender, instance, created, **kwargs):
    action = "created" if created else "updated" if kwargs.get('update_fields') else "deleted"

    # Create or update entry in the audit log
    audit_log.objects.create(
        action=action,
        asset_id=instance.AssetId,
        # Set other fields as needed
    )
