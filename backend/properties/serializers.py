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
        fields = ['id', 'name', 'title', 'email', 'phone', 'agency', 'profile_image', 'rating', 'total_sales']

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

class PropertyMapSerializer(serializers.ModelSerializer):
    coordinates = serializers.SerializerMethodField()
    property_type = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()

    class Meta:
        model = Property
        fields = ['id', 'title', 'price', 'coordinates', 'category', 'property_type', 'image', 'city', 'state']

    def get_coordinates(self, obj):
        return {
            'lat': float(obj.latitude),
            'lng': float(obj.longitude)
        }

    def get_property_type(self, obj):
        return obj.real_estate_type or obj.land_type

    def get_image(self, obj):
        primary_image = obj.images.filter(is_primary=True).first()
        if primary_image:
            return primary_image.image.url
        elif obj.images.exists():
            return obj.images.first().image.url
        return None
