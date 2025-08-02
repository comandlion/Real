from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Agent(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    agency = models.CharField(max_length=100)
    license_number = models.CharField(max_length=50)
    profile_image = models.ImageField(upload_to='agents/', null=True, blank=True)
    specializations = models.JSONField(default=list)
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.0)
    total_sales = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Property(models.Model):
    CATEGORY_CHOICES = [
        ('real_estate', 'Real Estate'),
        ('land', 'Land'),
    ]

    REAL_ESTATE_TYPES = [
        ('house', 'House'),
        ('apartment', 'Apartment'),
        ('villa', 'Villa'),
        ('condo', 'Condo'),
        ('townhouse', 'Townhouse'),
        ('loft', 'Loft'),
        ('penthouse', 'Penthouse'),
        ('commercial', 'Commercial'),
    ]

    LAND_TYPES = [
        ('residential_land', 'Residential Land'),
        ('commercial_land', 'Commercial Land'),
        ('agricultural_land', 'Agricultural Land'),
        ('industrial_land', 'Industrial Land'),
        ('mixed_use_land', 'Mixed Use Land'),
        ('development_land', 'Development Land'),
    ]

    LISTING_TYPES = [
        ('sale', 'For Sale'),
        ('rent', 'For Rent'),
        ('lease', 'For Lease'),
        ('auction', 'Auction'),
    ]

    STATUS_CHOICES = [
        ('active', 'Active'),
        ('pending', 'Pending'),
        ('sold', 'Sold'),
        ('rented', 'Rented'),
        ('off_market', 'Off Market'),
    ]

    # Basic Information
    title = models.CharField(max_length=200)
    description = models.TextField()
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    real_estate_type = models.CharField(max_length=20, choices=REAL_ESTATE_TYPES, null=True, blank=True)
    land_type = models.CharField(max_length=20, choices=LAND_TYPES, null=True, blank=True)
    listing_type = models.CharField(max_length=10, choices=LISTING_TYPES)
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default='active')

    # Location and Geography
    address = models.CharField(max_length=300)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20)
    latitude = models.DecimalField(max_digits=10, decimal_places=8)
    longitude = models.DecimalField(max_digits=11, decimal_places=8)

    # Dimensions and Details
    total_area = models.IntegerField()  # in square feet
    lot_size = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)  # in acres
    bedrooms = models.IntegerField(null=True, blank=True)
    bathrooms = models.DecimalField(max_digits=3, decimal_places=1, null=True, blank=True)
    floors = models.IntegerField(null=True, blank=True)
    year_built = models.IntegerField(null=True, blank=True)

    # Financial Information
    price = models.DecimalField(max_digits=12, decimal_places=2)
    currency = models.CharField(max_length=3, default='USD')
    price_per_sqft = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)

    # Land-specific fields
    zoning = models.CharField(max_length=100, null=True, blank=True)
    soil_type = models.CharField(max_length=100, null=True, blank=True)
    topography = models.CharField(max_length=50, null=True, blank=True)
    utilities_available = models.JSONField(default=list)
    buildable = models.BooleanField(default=True)

    # 3D Visualization Data
    dimensions_3d = models.JSONField(default=dict)  # {"width": 60, "length": 80, "height": 25}

    # Agent and Contact
    agent = models.ForeignKey(Agent, on_delete=models.CASCADE, related_name='properties')

    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    views = models.IntegerField(default=0)
    favorites = models.IntegerField(default=0)
    featured = models.BooleanField(default=False)
    premium_listing = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = "Properties"

    def __str__(self):
        return self.title

    def days_on_market(self):
        return (timezone.now().date() - self.created_at.date()).days

class PropertyImage(models.Model):
    property = models.ForeignKey(Property, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='properties/')
    caption = models.CharField(max_length=200, blank=True)
    is_primary = models.BooleanField(default=False)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.property.title} - Image {self.order}"

class PropertyAmenity(models.Model):
    property = models.ForeignKey(Property, related_name='amenities', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    icon = models.CharField(max_length=50)  # Icon name for frontend

    def __str__(self):
        return f"{self.property.title} - {self.name}"
