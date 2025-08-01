// Property types for Django backend integration

export type PropertyCategory = "real_estate" | "land";

export type RealEstateType =
  | "house"
  | "apartment"
  | "villa"
  | "condo"
  | "townhouse"
  | "loft"
  | "penthouse"
  | "commercial";

export type LandType =
  | "residential_land"
  | "commercial_land"
  | "agricultural_land"
  | "industrial_land"
  | "mixed_use_land"
  | "development_land";

export type ListingType = "sale" | "rent" | "lease" | "auction";

export type PropertyStatus =
  | "active"
  | "pending"
  | "sold"
  | "rented"
  | "off_market";

export interface PropertyCoordinates {
  lat: number;
  lng: number;
  address: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
}

export interface PropertyDimensions {
  total_area: number; // in square feet
  lot_size?: number; // for land properties
  building_area?: number; // for real estate
  frontage?: number; // for land
  depth?: number; // for land
  floors?: number; // for real estate
  ceiling_height?: number; // for real estate
}

export interface PropertyAmenities {
  // Real Estate Amenities
  bedrooms?: number;
  bathrooms?: number;
  parking_spaces?: number;
  garage?: boolean;
  pool?: boolean;
  garden?: boolean;
  balcony?: boolean;
  terrace?: boolean;
  fireplace?: boolean;
  air_conditioning?: boolean;
  heating?: boolean;
  security_system?: boolean;
  elevator?: boolean;
  gym?: boolean;

  // Land Amenities
  utilities_available?: string[]; // water, electricity, gas, sewer
  road_access?: boolean;
  topography?: "flat" | "sloped" | "hilly" | "mountainous";
  soil_type?: string;
  zoning?: string;
  development_rights?: boolean;
  mineral_rights?: boolean;
}

export interface PropertyMedia {
  images: string[];
  videos?: string[];
  virtual_tour_url?: string;
  floor_plans?: string[];
  site_plans?: string[]; // for land
  elevation_drawings?: string[]; // for development
  drone_footage?: string[];
}

export interface PropertyFinancials {
  price: number;
  currency: string;
  price_per_sqft?: number;
  price_per_acre?: number; // for land
  monthly_rent?: number; // for rentals
  hoa_fees?: number;
  property_taxes?: number;
  insurance_cost?: number;
  maintenance_cost?: number;
  roi_potential?: number; // for investments
}

export interface PropertyLegal {
  title_deed?: string;
  ownership_type: "freehold" | "leasehold" | "shared";
  encumbrances?: string[];
  easements?: string[];
  restrictions?: string[];
  permits_required?: string[];
  environmental_clearance?: boolean;
}

export interface PropertyAgent {
  id: number;
  name: string;
  email: string;
  phone: string;
  agency: string;
  license_number: string;
  profile_image?: string;
  specializations: PropertyCategory[];
}

// Main Property Interface for Django integration
export interface Property {
  // Basic Information
  id: number;
  title: string;
  description: string;
  category: PropertyCategory;
  real_estate_type?: RealEstateType;
  land_type?: LandType;
  listing_type: ListingType;
  status: PropertyStatus;

  // Location and Geography
  coordinates: PropertyCoordinates;
  dimensions: PropertyDimensions;

  // Features and Amenities
  amenities: PropertyAmenities;
  features: string[];

  // Media and Documentation
  media: PropertyMedia;

  // Financial Information
  financials: PropertyFinancials;

  // Legal Information
  legal: PropertyLegal;

  // Agent and Contact
  agent: PropertyAgent;

  // Metadata
  created_at: string;
  updated_at: string;
  views: number;
  favorites: number;
  inquiries: number;
  days_on_market: number;

  // SEO and Marketing
  seo_title?: string;
  seo_description?: string;
  keywords?: string[];
  featured: boolean;
  premium_listing: boolean;

  // Investment Data (for land and commercial)
  investment_potential?: {
    appreciation_rate?: number;
    rental_yield?: number;
    development_potential?: string;
    market_analysis?: string;
  };

  // Development Information (for land)
  development_info?: {
    buildable_area: number;
    max_floors: number;
    fsi_fsr: number; // Floor Space Index / Floor Space Ratio
    setback_requirements: {
      front: number;
      rear: number;
      side: number;
    };
    approved_plans?: string[];
  };
}

// Search and Filter Types
export interface PropertySearchFilters {
  category?: PropertyCategory;
  real_estate_type?: RealEstateType[];
  land_type?: LandType[];
  listing_type?: ListingType[];
  price_range?: {
    min: number;
    max: number;
  };
  area_range?: {
    min: number;
    max: number;
  };
  location?: {
    city?: string;
    state?: string;
    radius?: number; // in kilometers
    coordinates?: PropertyCoordinates;
  };
  bedrooms?: number[];
  bathrooms?: number[];
  amenities?: string[];
  features?: string[];
  sort_by?:
    | "price_asc"
    | "price_desc"
    | "date_asc"
    | "date_desc"
    | "area_asc"
    | "area_desc";
}

// API Response Types for Django integration
export interface PropertyListResponse {
  count: number;
  next?: string;
  previous?: string;
  results: Property[];
}

export interface PropertyDetailResponse extends Property {
  similar_properties: Property[];
  neighborhood_data?: {
    average_price: number;
    market_trends: string;
    amenities: string[];
    schools: string[];
    transport: string[];
  };
}

// Form Data Types
export interface PropertyFormData {
  // Step 1: Basic Information
  title: string;
  description: string;
  category: PropertyCategory;
  real_estate_type?: RealEstateType;
  land_type?: LandType;
  listing_type: ListingType;

  // Step 2: Location
  address: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  coordinates?: {
    lat: number;
    lng: number;
  };

  // Step 3: Details and Dimensions
  total_area: number;
  lot_size?: number;
  bedrooms?: number;
  bathrooms?: number;
  floors?: number;

  // Step 4: Amenities and Features
  amenities: Partial<PropertyAmenities>;
  features: string[];

  // Step 5: Media
  images: File[] | string[];
  videos?: File[] | string[];
  virtual_tour_url?: string;

  // Step 6: Pricing and Legal
  price: number;
  currency: string;
  ownership_type: "freehold" | "leasehold" | "shared";

  // Step 7: Agent Information
  agent_contact: {
    name: string;
    email: string;
    phone: string;
  };
}

// Utility functions for property types
export const PROPERTY_CATEGORIES: Record<PropertyCategory, string> = {
  real_estate: "Real Estate",
  land: "Land",
};

export const REAL_ESTATE_TYPES: Record<RealEstateType, string> = {
  house: "House",
  apartment: "Apartment",
  villa: "Villa",
  condo: "Condo",
  townhouse: "Townhouse",
  loft: "Loft",
  penthouse: "Penthouse",
  commercial: "Commercial",
};

export const LAND_TYPES: Record<LandType, string> = {
  residential_land: "Residential Land",
  commercial_land: "Commercial Land",
  agricultural_land: "Agricultural Land",
  industrial_land: "Industrial Land",
  mixed_use_land: "Mixed Use Land",
  development_land: "Development Land",
};

export const LISTING_TYPES: Record<ListingType, string> = {
  sale: "For Sale",
  rent: "For Rent",
  lease: "For Lease",
  auction: "Auction",
};
