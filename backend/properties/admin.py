from django.contrib import admin
from .models import Property, PropertyImage, PropertyAmenity, Agent

class PropertyImageInline(admin.TabularInline):
    model = PropertyImage
    extra = 1

class PropertyAmenityInline(admin.TabularInline):
    model = PropertyAmenity
    extra = 1

@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'listing_type', 'price', 'city', 'status', 'featured', 'created_at']
    list_filter = ['category', 'listing_type', 'status', 'featured', 'premium_listing', 'city', 'state']
    search_fields = ['title', 'description', 'address', 'city']
    inlines = [PropertyImageInline, PropertyAmenityInline]
    readonly_fields = ['views', 'days_on_market', 'created_at', 'updated_at']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'description', 'category', 'real_estate_type', 'land_type', 'listing_type', 'status')
        }),
        ('Location', {
            'fields': ('address', 'city', 'state', 'country', 'postal_code', 'latitude', 'longitude')
        }),
        ('Details', {
            'fields': ('total_area', 'lot_size', 'bedrooms', 'bathrooms', 'floors', 'year_built')
        }),
        ('Financial', {
            'fields': ('price', 'currency', 'price_per_sqft')
        }),
        ('Land Specific', {
            'fields': ('zoning', 'soil_type', 'topography', 'utilities_available', 'buildable'),
            'classes': ('collapse',)
        }),
        ('3D & Visualization', {
            'fields': ('dimensions_3d',),
            'classes': ('collapse',)
        }),
        ('Agent & Marketing', {
            'fields': ('agent', 'featured', 'premium_listing')
        }),
        ('Metadata', {
            'fields': ('views', 'favorites', 'days_on_market', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        })
    )

@admin.register(Agent)
class AgentAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'phone', 'agency', 'rating', 'total_sales']
    list_filter = ['agency', 'specializations']
    search_fields = ['name', 'email', 'agency', 'license_number']
    readonly_fields = ['created_at']

@admin.register(PropertyImage)
class PropertyImageAdmin(admin.ModelAdmin):
    list_display = ['property', 'caption', 'is_primary', 'order']
    list_filter = ['is_primary']

@admin.register(PropertyAmenity)
class PropertyAmenityAdmin(admin.ModelAdmin):
    list_display = ['property', 'name', 'icon']
    list_filter = ['name']
