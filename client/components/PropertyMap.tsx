import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation, Maximize2, Home, TreePine } from 'lucide-react';
import { motion } from 'framer-motion';

// Fix for default markers in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Property {
  id: number;
  title: string;
  location: string;
  price: string;
  lat: number;
  lng: number;
  type: 'real_estate' | 'land';
  propertyType?: string;
  image?: string;
}

interface PropertyMapProps {
  properties?: Property[];
  center?: [number, number];
  zoom?: number;
  height?: string;
  showControls?: boolean;
  onPropertySelect?: (property: Property) => void;
  className?: string;
}

const defaultProperties: Property[] = [
  {
    id: 1,
    title: "Modern Luxury Villa",
    location: "Beverly Hills, CA",
    price: "$2,850,000",
    lat: 34.0901,
    lng: -118.4065,
    type: 'real_estate',
    propertyType: 'Villa',
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 2,
    title: "Prime Development Land",
    location: "Malibu, CA", 
    price: "$1,500,000",
    lat: 34.0259,
    lng: -118.7798,
    type: 'land',
    propertyType: 'Residential Land'
  },
  {
    id: 3,
    title: "Downtown Penthouse",
    location: "Manhattan, NY",
    price: "$3,200,000",
    lat: 40.7589,
    lng: -73.9851,
    type: 'real_estate',
    propertyType: 'Penthouse'
  },
  {
    id: 4,
    title: "Commercial Land Plot",
    location: "Austin, TX",
    price: "$850,000",
    lat: 30.2672,
    lng: -97.7431,
    type: 'land',
    propertyType: 'Commercial Land'
  }
];

export function PropertyMap({ 
  properties = defaultProperties, 
  center = [34.0522, -118.2437], // Los Angeles default
  zoom = 10,
  height = "400px",
  showControls = true,
  onPropertySelect,
  className = ""
}: PropertyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map
    mapInstanceRef.current = L.map(mapRef.current).setView(center, zoom);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(mapInstanceRef.current);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [center, zoom]);

  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => {
      mapInstanceRef.current?.removeLayer(marker);
    });
    markersRef.current = [];

    // Add property markers
    properties.forEach(property => {
      // Create custom icon based on property type
      const iconHtml = property.type === 'land' 
        ? `<div class="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
             <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
               <path d="M10 2L3 7v11h4v-6h6v6h4V7l-7-5z"/>
             </svg>
           </div>`
        : `<div class="w-8 h-8 bg-luxury-blue rounded-full flex items-center justify-center shadow-lg border-2 border-white">
             <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
               <path d="M10 2L3 7v11h4v-6h6v6h4V7l-7-5z"/>
             </svg>
           </div>`;

      const customIcon = L.divIcon({
        html: iconHtml,
        className: 'custom-marker',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
      });

      const marker = L.marker([property.lat, property.lng], { icon: customIcon })
        .addTo(mapInstanceRef.current!);

      // Create popup content
      const popupContent = `
        <div class="p-3 min-w-[250px]">
          <div class="flex items-center gap-2 mb-2">
            <span class="px-2 py-1 rounded text-xs font-medium ${
              property.type === 'land' 
                ? 'bg-emerald-100 text-emerald-700' 
                : 'bg-blue-100 text-blue-700'
            }">
              ${property.type === 'land' ? 'Land' : 'Real Estate'}
            </span>
          </div>
          ${property.image ? `<img src="${property.image}" alt="${property.title}" class="w-full h-24 object-cover rounded mb-2">` : ''}
          <h4 class="font-semibold text-gray-900 mb-1">${property.title}</h4>
          <p class="text-sm text-gray-600 mb-2 flex items-center">
            <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"/>
            </svg>
            ${property.location}
          </p>
          <div class="flex justify-between items-center">
            <span class="font-bold text-luxury-blue">${property.price}</span>
            <button class="px-3 py-1 bg-luxury-blue text-white rounded text-sm hover:bg-blue-600 transition-colors" 
                    onclick="window.dispatchEvent(new CustomEvent('propertySelect', { detail: ${property.id} }))">
              View Details
            </button>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent);
      markersRef.current.push(marker);

      // Handle property selection
      if (onPropertySelect) {
        marker.on('click', () => {
          onPropertySelect(property);
        });
      }
    });

    // Fit map to show all markers if we have properties
    if (properties.length > 0) {
      const group = new L.FeatureGroup(markersRef.current);
      mapInstanceRef.current.fitBounds(group.getBounds().pad(0.1));
    }
  }, [properties, onPropertySelect]);

  const centerMap = () => {
    if (mapInstanceRef.current && properties.length > 0) {
      const group = new L.FeatureGroup(markersRef.current);
      mapInstanceRef.current.fitBounds(group.getBounds().pad(0.1));
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation && mapInstanceRef.current) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        mapInstanceRef.current!.setView([latitude, longitude], 15);
        
        // Add user location marker
        L.marker([latitude, longitude])
          .addTo(mapInstanceRef.current!)
          .bindPopup("Your Location")
          .openPopup();
      });
    }
  };

  return (
    <Card className={`border-0 shadow-lg overflow-hidden ${className}`}>
      <CardContent className="p-0 relative">
        <div 
          ref={mapRef} 
          style={{ height }} 
          className="w-full relative z-0"
        />
        
        {showControls && (
          <motion.div 
            className="absolute top-4 right-4 flex flex-col space-y-2 z-10"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="sm"
                onClick={centerMap}
                className="bg-white/90 backdrop-blur-sm border-gray-200 hover:bg-white shadow-lg"
              >
                <Maximize2 className="h-4 w-4" />
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="sm"
                onClick={getCurrentLocation}
                className="bg-white/90 backdrop-blur-sm border-gray-200 hover:bg-white shadow-lg"
              >
                <Navigation className="h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>
        )}

        {/* Legend */}
        <motion.div 
          className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="text-xs font-medium text-gray-700 mb-2">Property Types</div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-4 h-4 bg-luxury-blue rounded-full"></div>
              <span className="text-xs text-gray-600">Real Estate</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-4 h-4 bg-emerald-500 rounded-full"></div>
              <span className="text-xs text-gray-600">Land</span>
            </div>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
}

// Hook for property selection events
export function usePropertyMapEvents(onPropertySelect: (propertyId: number) => void) {
  useEffect(() => {
    const handlePropertySelect = (event: CustomEvent) => {
      onPropertySelect(event.detail);
    };

    window.addEventListener('propertySelect', handlePropertySelect as EventListener);
    
    return () => {
      window.removeEventListener('propertySelect', handlePropertySelect as EventListener);
    };
  }, [onPropertySelect]);
}
