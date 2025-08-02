from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q
from .models import Property, Agent
from .serializers import (
    PropertySerializer, 
    PropertyDetailSerializer, 
    AgentSerializer,
    PropertyMapSerializer
)

class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.filter(status='active')
    serializer_class = PropertySerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'real_estate_type', 'land_type', 'listing_type', 'city', 'state', 'featured']
    search_fields = ['title', 'description', 'address', 'city']
    ordering_fields = ['price', 'created_at', 'total_area', 'views']
    ordering = ['-created_at']

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return PropertyDetailSerializer
        return PropertySerializer

    def get_queryset(self):
        queryset = Property.objects.filter(status='active')
        
        # Filter by price range
        price_min = self.request.query_params.get('price__gte')
        price_max = self.request.query_params.get('price__lte')
        
        if price_min:
            queryset = queryset.filter(price__gte=price_min)
        if price_max:
            queryset = queryset.filter(price__lte=price_max)
            
        return queryset

    @action(detail=True, methods=['post'])
    def increment_views(self, request, pk=None):
        property = self.get_object()
        property.views += 1
        property.save()
        return Response({'views': property.views})

    @action(detail=False)
    def featured(self, request):
        featured_properties = self.get_queryset().filter(featured=True)
        serializer = self.get_serializer(featured_properties, many=True)
        return Response(serializer.data)

    @action(detail=False)
    def map_data(self, request):
        properties = self.filter_queryset(self.get_queryset())
        serializer = PropertyMapSerializer(properties, many=True)
        return Response(serializer.data)

class AgentViewSet(viewsets.ModelViewSet):
    queryset = Agent.objects.all()
    serializer_class = AgentSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'agency', 'specializations']
    ordering_fields = ['rating', 'total_sales', 'name']
    ordering = ['-rating']

class PropertySearchView(APIView):
    def post(self, request):
        filters = request.data
        queryset = Property.objects.filter(status='active')

        # Category filter
        if 'category' in filters:
            queryset = queryset.filter(category=filters['category'])

        # Price range filter
        if 'price_range' in filters:
            price_range = filters['price_range']
            if 'min' in price_range:
                queryset = queryset.filter(price__gte=price_range['min'])
            if 'max' in price_range:
                queryset = queryset.filter(price__lte=price_range['max'])

        # Area range filter
        if 'area_range' in filters:
            area_range = filters['area_range']
            if 'min' in area_range:
                queryset = queryset.filter(total_area__gte=area_range['min'])
            if 'max' in area_range:
                queryset = queryset.filter(total_area__lte=area_range['max'])

        # Location filter
        if 'location' in filters:
            location = filters['location']
            if 'city' in location:
                queryset = queryset.filter(city__icontains=location['city'])
            if 'state' in location:
                queryset = queryset.filter(state__icontains=location['state'])

        # Bedrooms filter
        if 'bedrooms' in filters:
            bedrooms = filters['bedrooms']
            if isinstance(bedrooms, list):
                queryset = queryset.filter(bedrooms__in=bedrooms)
            else:
                queryset = queryset.filter(bedrooms=bedrooms)

        # Bathrooms filter
        if 'bathrooms' in filters:
            bathrooms = filters['bathrooms']
            if isinstance(bathrooms, list):
                queryset = queryset.filter(bathrooms__in=bathrooms)
            else:
                queryset = queryset.filter(bathrooms=bathrooms)

        # Property types
        if 'real_estate_type' in filters:
            queryset = queryset.filter(real_estate_type__in=filters['real_estate_type'])
        
        if 'land_type' in filters:
            queryset = queryset.filter(land_type__in=filters['land_type'])

        # Listing types
        if 'listing_type' in filters:
            queryset = queryset.filter(listing_type__in=filters['listing_type'])

        # Sort
        sort_by = filters.get('sort_by', '-created_at')
        if sort_by == 'price_asc':
            queryset = queryset.order_by('price')
        elif sort_by == 'price_desc':
            queryset = queryset.order_by('-price')
        elif sort_by == 'area_asc':
            queryset = queryset.order_by('total_area')
        elif sort_by == 'area_desc':
            queryset = queryset.order_by('-total_area')
        elif sort_by == 'date_asc':
            queryset = queryset.order_by('created_at')
        else:  # date_desc
            queryset = queryset.order_by('-created_at')

        serializer = PropertySerializer(queryset, many=True)
        return Response(serializer.data)
