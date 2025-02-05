from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver, Signal
from django.core.exceptions import ObjectDoesNotExist
from django.db import transaction
import threading
from .models import Asset, Auditlog, City
from .cityTimer import CityTimer
from .timer_manager import start_timer_for_city, pause_timer_for_city, resume_timer_for_city  # Import here
user_data_received = Signal()


@receiver(pre_save, sender=Asset)
def track_changes(sender, instance, **kwargs):
    """Store the original instance values before saving."""
    if instance.pk:
        try:
            instance._original = sender.objects.get(pk=instance.pk)
        except ObjectDoesNotExist:
            instance._original = None  # Handle gracefully if the instance doesn't exist

@receiver(post_save, sender=Asset)
def record_audit_trail_on_save(sender, instance, created, **kwargs):
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
            if hasattr(instance, field) and field not in changed_fields:
                setattr(instance, field, default_value)

        if changed_fields:
            Auditlog.objects.create(
                action=f"UPDATE: {', '.join(changed_fields)}",
                AssetId=instance.AssetId,
                CityId=instance.Asset_CityId_id,
                Current_Content_Code=instance.Current_Content_Code,
                userName=instance.Tofacility
            )
        transaction.on_commit(lambda: instance.reset_attributes())

user_data_received.connect(record_audit_trail_on_save, sender=Asset, weak=False)
