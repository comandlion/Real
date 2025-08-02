# Django Backend Integration Guide

This document outlines the integration between your React frontend and Django REST API backend for the Premium Realty platform.

## Overview

The frontend is now ready to work with a Django backend that supports:

- **Real Estate Properties** (houses, apartments, villas, etc.)
- **Land Properties** (residential, commercial, agricultural land)
- **Interactive Mapping** with coordinates
- **3D Visualization** data
- **Advanced Search and Filtering**

## Django Models Structure

### Core Property Model

```python
# models.py
from django.db import models
from django.contrib.auth.models import User

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
    agent = models.ForeignKey('Agent', on_delete=models.CASCADE)

    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    views = models.IntegerField(default=0)
    favorites = models.IntegerField(default=0)
    featured = models.BooleanField(default=False)
    premium_listing = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']

    def days_on_market(self):
        from django.utils import timezone
        return (timezone.now().date() - self.created_at.date()).days

class PropertyImage(models.Model):
    property = models.ForeignKey(Property, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='properties/')
    caption = models.CharField(max_length=200, blank=True)
    is_primary = models.BooleanField(default=False)
    order = models.IntegerField(default=0)

class PropertyAmenity(models.Model):
    property = models.ForeignKey(Property, related_name='amenities', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    icon = models.CharField(max_length=50)  # Icon name for frontend

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
```

## API Endpoints

### Property Endpoints

```python
# urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'properties', views.PropertyViewSet)
router.register(r'agents', views.AgentViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/properties/search/', views.PropertySearchView.as_view()),
    path('api/properties/map/', views.PropertyMapView.as_view()),
]
```

### ViewSet Implementation

```python
# views.py
from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Property, Agent
from .serializers import PropertySerializer, PropertyDetailSerializer, AgentSerializer

class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'real_estate_type', 'land_type', 'listing_type', 'city', 'state']
    search_fields = ['title', 'description', 'address', 'city']
    ordering_fields = ['price', 'created_at', 'total_area']

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return PropertyDetailSerializer
        return PropertySerializer

    @action(detail=True, methods=['post'])
    def increment_views(self, request, pk=None):
        property = self.get_object()
        property.views += 1
        property.save()
        return Response({'views': property.views})

    @action(detail=False)
    def featured(self, request):
        featured_properties = Property.objects.filter(featured=True)
        serializer = self.get_serializer(featured_properties, many=True)
        return Response(serializer.data)

    @action(detail=False)
    def map_data(self, request):
        properties = self.filter_queryset(self.get_queryset())
        map_data = []
        for prop in properties:
            map_data.append({
                'id': prop.id,
                'title': prop.title,
                'location': f"{prop.city}, {prop.state}",
                'price': str(prop.price),
                'lat': float(prop.latitude),
                'lng': float(prop.longitude),
                'type': prop.category,
                'propertyType': prop.real_estate_type or prop.land_type,
                'image': prop.images.filter(is_primary=True).first().image.url if prop.images.filter(is_primary=True).exists() else None
            })
        return Response(map_data)

class PropertySearchView(APIView):
    def post(self, request):
        # Advanced search with multiple filters
        filters = request.data
        queryset = Property.objects.all()

        if 'category' in filters:
            queryset = queryset.filter(category=filters['category'])

        if 'price_range' in filters:
            min_price = filters['price_range'].get('min', 0)
            max_price = filters['price_range'].get('max', 999999999)
            queryset = queryset.filter(price__gte=min_price, price__lte=max_price)

        if 'location' in filters:
            location = filters['location']
            if 'coordinates' in location and 'radius' in location:
                # Implement radius-based search using GeoDjango
                pass

        serializer = PropertySerializer(queryset, many=True)
        return Response(serializer.data)
```

### Serializers

```python
# serializers.py
from rest_framework import serializers
from .models import Property, PropertyImage, PropertyAmenity, Agent

class PropertyImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyImage
        fields = ['id', 'image', 'caption', 'is_primary', 'order']

class PropertyAmenitySerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyAmenity
        fields = ['name', 'icon']

class AgentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Agent
        fields = ['id', 'name', 'title', 'email', 'phone', 'profile_image', 'rating', 'total_sales']

class PropertySerializer(serializers.ModelSerializer):
    images = PropertyImageSerializer(many=True, read_only=True)
    amenities = PropertyAmenitySerializer(many=True, read_only=True)
    agent = AgentSerializer(read_only=True)
    days_on_market = serializers.ReadOnlyField()
    coordinates = serializers.SerializerMethodField()
    dimensions = serializers.SerializerMethodField()

    class Meta:
        model = Property
        fields = '__all__'

    def get_coordinates(self, obj):
        return {
            'lat': float(obj.latitude),
            'lng': float(obj.longitude)
        }

    def get_dimensions(self, obj):
        return obj.dimensions_3d or {}

class PropertyDetailSerializer(PropertySerializer):
    similar_properties = serializers.SerializerMethodField()

    def get_similar_properties(self, obj):
        similar = Property.objects.filter(
            category=obj.category,
            city=obj.city
        ).exclude(id=obj.id)[:3]
        return PropertySerializer(similar, many=True, context=self.context).data
```

## Frontend API Integration

### API Service

```typescript
// client/services/api.ts
import {
  Property,
  PropertySearchFilters,
  PropertyListResponse,
} from "@/types/property";

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:8000/api";

class PropertyAPI {
  private async request<T>(
    endpoint: string,
    options?: RequestInit,
  ): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  }

  async getProperties(
    filters?: PropertySearchFilters,
  ): Promise<PropertyListResponse> {
    const queryParams = new URLSearchParams();

    if (filters) {
      if (filters.category) queryParams.append("category", filters.category);
      if (filters.listing_type)
        queryParams.append("listing_type", filters.listing_type.join(","));
      if (filters.price_range) {
        queryParams.append("price__gte", filters.price_range.min.toString());
        queryParams.append("price__lte", filters.price_range.max.toString());
      }
    }

    return this.request<PropertyListResponse>(
      `/properties/?${queryParams.toString()}`,
    );
  }

  async getProperty(id: number): Promise<Property> {
    return this.request<Property>(`/properties/${id}/`);
  }

  async getMapData(): Promise<any[]> {
    return this.request<any[]>("/properties/map_data/");
  }

  async incrementViews(id: number): Promise<void> {
    await this.request(`/properties/${id}/increment_views/`, {
      method: "POST",
    });
  }

  async searchProperties(filters: PropertySearchFilters): Promise<Property[]> {
    return this.request<Property[]>("/properties/search/", {
      method: "POST",
      body: JSON.stringify(filters),
    });
  }
}

export const propertyAPI = new PropertyAPI();
```

### React Query Integration

```typescript
// client/hooks/useProperties.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { propertyAPI } from "@/services/api";
import { PropertySearchFilters } from "@/types/property";

export function useProperties(filters?: PropertySearchFilters) {
  return useQuery({
    queryKey: ["properties", filters],
    queryFn: () => propertyAPI.getProperties(filters),
  });
}

export function useProperty(id: number) {
  return useQuery({
    queryKey: ["property", id],
    queryFn: () => propertyAPI.getProperty(id),
  });
}

export function usePropertyMapData() {
  return useQuery({
    queryKey: ["properties", "map"],
    queryFn: () => propertyAPI.getMapData(),
  });
}

export function useIncrementViews() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => propertyAPI.incrementViews(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["property", id] });
    },
  });
}
```

## Environment Variables

```bash
# .env
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_key
REACT_APP_MAPBOX_TOKEN=your_mapbox_token
```

## Django Settings

```python
# settings.py
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.gis',  # For geographic queries
    'rest_framework',
    'django_filters',
    'corsheaders',
    'properties',  # Your properties app
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    # ... other middleware
]

# CORS settings for development
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # React dev server
    "http://127.0.0.1:3000",
]

REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 20,
    'DEFAULT_FILTER_BACKENDS': [
        'django_filters.rest_framework.DjangoFilterBackend',
        'rest_framework.filters.SearchFilter',
        'rest_framework.filters.OrderingFilter',
    ],
}

# Database with PostGIS for geographic features
DATABASES = {
    'default': {
        'ENGINE': 'django.contrib.gis.db.backends.postgis',
        'NAME': 'premium_realty',
        'USER': 'postgres',
        'PASSWORD': 'password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}

# Media files for property images
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
```

## Key Integration Points

1. **Property Categories**: The frontend now supports both `real_estate` and `land` categories
2. **Interactive Maps**: Coordinates are stored and served for map visualization
3. **3D Visualization**: Dimensions are stored in JSON format for 3D rendering
4. **Advanced Search**: Multiple filter combinations supported
5. **Image Management**: Multiple images per property with primary image designation
6. **Agent Integration**: Full agent profiles with contact information

## Next Steps

1. Set up Django backend with the provided models
2. Implement the API endpoints using Django REST Framework
3. Configure PostgreSQL with PostGIS for geographic queries
4. Set up media handling for property images
5. Update the React frontend API calls to use your Django endpoints
6. Implement authentication and user management
7. Add property management dashboard for agents

This integration provides a robust foundation for your real estate platform with support for both traditional real estate and land sales, interactive mapping, and 3D visualization capabilities.
