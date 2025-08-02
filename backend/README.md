# Premium Realty Django Backend

A complete Django REST API backend for the Premium Realty real estate platform.

## Features

- 🏠 **Property Management**: Real estate and land listings
- 👤 **Agent Profiles**: Real estate agent management
- 🔐 **Authentication**: JWT-based user authentication
- 📱 **REST API**: Complete API for frontend integration
- 🗺️ **Map Integration**: Coordinate-based property mapping
- 🔍 **Advanced Search**: Property filtering and search
- 📊 **Admin Panel**: Django admin for data management

## Quick Start

### 1. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Set up Environment

```bash
cp .env.example .env
# Edit .env with your configuration
```

### 3. Run Setup Script

```bash
python setup.py
```

This will:
- Create database migrations
- Set up the database
- Create a superuser account
- Generate sample data

### 4. Start Development Server

```bash
python manage.py runserver
```

The API will be available at `http://localhost:8000/api/`

## API Endpoints

### Properties
- `GET /api/properties/` - List all properties
- `GET /api/properties/{id}/` - Property details
- `POST /api/properties/{id}/increment_views/` - Track property views
- `GET /api/properties/featured/` - Featured properties
- `GET /api/properties/map_data/` - Map coordinates
- `POST /api/properties/search/` - Advanced search

### Agents
- `GET /api/agents/` - List all agents
- `GET /api/agents/{id}/` - Agent details

### Authentication
- `POST /api/login/` - User login
- `POST /api/register/` - User registration
- `GET /api/user/` - User profile
- `POST /api/token/refresh/` - Refresh JWT token

## Models

### Property
Complete property model supporting:
- **Categories**: Real estate and land
- **Types**: Houses, apartments, villas, commercial, residential land, etc.
- **Location**: Full address with coordinates
- **Details**: Bedrooms, bathrooms, area, price
- **Media**: Images and virtual tours
- **Features**: Amenities and property features

### Agent
Real estate agent profiles with:
- Contact information
- Agency details
- License information
- Ratings and sales history
- Specializations

## Sample Data

The setup script creates sample data including:
- 5 properties (mix of real estate and land)
- 2 agents with different specializations
- Property images and amenities
- Realistic property details and coordinates

## Admin Panel

Access the Django admin at `http://localhost:8000/admin/`

Default superuser credentials (created during setup):
- Username: admin
- Password: (set during setup)

## Integration with React Frontend

The backend is designed to work seamlessly with the React frontend:

1. **CORS Configured**: Allows requests from React dev server
2. **JWT Authentication**: Token-based auth for secure API access
3. **Paginated Responses**: Efficient data loading
4. **Search & Filtering**: Advanced property search capabilities
5. **Map Data**: Coordinates for interactive maps

## Development

### Adding New Properties

```python
# Via Django shell
python manage.py shell

from properties.models import Property, Agent
agent = Agent.objects.first()

property = Property.objects.create(
    title="New Property",
    description="Property description",
    category="real_estate",
    real_estate_type="house",
    listing_type="sale",
    price=500000,
    # ... other fields
    agent=agent
)
```

### API Testing

Test the API endpoints:

```bash
# Get all properties
curl http://localhost:8000/api/properties/

# Get property details
curl http://localhost:8000/api/properties/1/

# Search properties
curl -X POST http://localhost:8000/api/properties/search/ \
  -H "Content-Type: application/json" \
  -d '{"category": "real_estate", "price_range": {"min": 100000, "max": 1000000}}'
```

## Production Deployment

For production deployment:

1. Set `DEBUG=False` in settings
2. Configure PostgreSQL database
3. Set up AWS S3 for media files
4. Configure email settings
5. Use proper secret key
6. Set up SSL/HTTPS

## Troubleshooting

### Common Issues

1. **Migration errors**: Delete db.sqlite3 and run migrations again
2. **CORS errors**: Check CORS_ALLOWED_ORIGINS in settings
3. **Media files not loading**: Check MEDIA_URL and MEDIA_ROOT settings
4. **Authentication failures**: Verify JWT settings

### Logs

Check Django logs for debugging:
```bash
python manage.py runserver --verbosity=2
```

## Support

The backend is fully compatible with the React frontend and provides all necessary endpoints for the Premium Realty platform.
