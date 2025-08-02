from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from properties.models import Property, Agent, PropertyImage, PropertyAmenity
from decimal import Decimal

class Command(BaseCommand):
    help = 'Create sample data for the Premium Realty platform'

    def handle(self, *args, **options):
        self.stdout.write('Creating sample data...')

        # Create sample users and agents
        agents_data = [
            {
                'username': 'john_agent',
                'email': 'john@premiumrealty.com',
                'name': 'John Smith',
                'title': 'Senior Real Estate Agent',
                'phone': '(555) 123-4567',
                'agency': 'Premium Realty',
                'license_number': 'CA12345678',
                'rating': Decimal('4.9'),
                'total_sales': 156,
            },
            {
                'username': 'sarah_agent',
                'email': 'sarah@premiumrealty.com', 
                'name': 'Sarah Johnson',
                'title': 'Land Specialist',
                'phone': '(555) 987-6543',
                'agency': 'Premium Realty',
                'license_number': 'CA87654321',
                'rating': Decimal('4.7'),
                'total_sales': 89,
            }
        ]

        agents = []
        for agent_data in agents_data:
            user, created = User.objects.get_or_create(
                username=agent_data['username'],
                defaults={
                    'email': agent_data['email'],
                    'first_name': agent_data['name'].split()[0],
                    'last_name': agent_data['name'].split()[1],
                }
            )
            
            agent, created = Agent.objects.get_or_create(
                user=user,
                defaults={
                    'name': agent_data['name'],
                    'title': agent_data['title'],
                    'email': agent_data['email'],
                    'phone': agent_data['phone'],
                    'agency': agent_data['agency'],
                    'license_number': agent_data['license_number'],
                    'rating': agent_data['rating'],
                    'total_sales': agent_data['total_sales'],
                    'specializations': ['residential', 'luxury'],
                }
            )
            agents.append(agent)
            if created:
                self.stdout.write(f'Created agent: {agent.name}')

        # Sample properties data
        properties_data = [
            {
                'title': 'Modern Luxury Villa',
                'description': 'Stunning modern villa with panoramic city views. Features include gourmet kitchen, infinity pool, and smart home technology.',
                'category': 'real_estate',
                'real_estate_type': 'villa',
                'listing_type': 'sale',
                'address': '123 Beverly Hills Drive',
                'city': 'Beverly Hills',
                'state': 'California',
                'country': 'USA',
                'postal_code': '90210',
                'latitude': Decimal('34.090100'),
                'longitude': Decimal('-118.406500'),
                'total_area': 3200,
                'bedrooms': 4,
                'bathrooms': Decimal('3.5'),
                'floors': 2,
                'year_built': 2020,
                'price': Decimal('2850000'),
                'featured': True,
                'agent': agents[0],
            },
            {
                'title': 'Prime Development Land',
                'description': 'Exceptional 1-acre development opportunity in prestigious Malibu. Perfect for luxury residential development with ocean views.',
                'category': 'land',
                'land_type': 'residential_land',
                'listing_type': 'sale',
                'address': '456 Malibu Canyon Road',
                'city': 'Malibu',
                'state': 'California',
                'country': 'USA',
                'postal_code': '90265',
                'latitude': Decimal('34.025900'),
                'longitude': Decimal('-118.779800'),
                'total_area': 43560,
                'lot_size': Decimal('1.0'),
                'price': Decimal('1500000'),
                'zoning': 'Residential R1',
                'buildable': True,
                'utilities_available': ['water', 'electricity', 'gas'],
                'featured': True,
                'agent': agents[1],
            },
            {
                'title': 'Contemporary Downtown Loft',
                'description': 'Sophisticated loft in the heart of Manhattan. Exposed brick, floor-to-ceiling windows, and modern finishes.',
                'category': 'real_estate',
                'real_estate_type': 'loft',
                'listing_type': 'sale',
                'address': '789 Broadway',
                'city': 'New York',
                'state': 'New York',
                'country': 'USA',
                'postal_code': '10003',
                'latitude': Decimal('40.758900'),
                'longitude': Decimal('-73.985100'),
                'total_area': 1800,
                'bedrooms': 2,
                'bathrooms': Decimal('2.0'),
                'floors': 1,
                'year_built': 2023,
                'price': Decimal('1200000'),
                'agent': agents[0],
            },
            {
                'title': 'Commercial Land Plot',
                'description': 'Strategic commercial land in thriving Austin business district. Zoned for mixed-use development.',
                'category': 'land',
                'land_type': 'commercial_land',
                'listing_type': 'sale',
                'address': '321 Tech Boulevard',
                'city': 'Austin',
                'state': 'Texas',
                'country': 'USA',
                'postal_code': '78701',
                'latitude': Decimal('30.267200'),
                'longitude': Decimal('-97.743100'),
                'total_area': 21780,
                'lot_size': Decimal('0.5'),
                'price': Decimal('850000'),
                'zoning': 'Commercial C2',
                'buildable': True,
                'utilities_available': ['water', 'electricity', 'gas', 'fiber'],
                'agent': agents[1],
            },
            {
                'title': 'Luxury Penthouse',
                'description': 'Exquisite penthouse with private terrace and stunning ocean views. Premium finishes throughout.',
                'category': 'real_estate',
                'real_estate_type': 'penthouse',
                'listing_type': 'sale',
                'address': '987 Ocean Drive',
                'city': 'Miami Beach',
                'state': 'Florida',
                'country': 'USA',
                'postal_code': '33139',
                'latitude': Decimal('25.761700'),
                'longitude': Decimal('-80.191800'),
                'total_area': 2800,
                'bedrooms': 3,
                'bathrooms': Decimal('3.0'),
                'floors': 1,
                'year_built': 2021,
                'price': Decimal('3900000'),
                'premium_listing': True,
                'agent': agents[0],
            },
        ]

        for prop_data in properties_data:
            property_obj, created = Property.objects.get_or_create(
                title=prop_data['title'],
                defaults=prop_data
            )
            if created:
                self.stdout.write(f'Created property: {property_obj.title}')
                
                # Add some sample amenities
                if property_obj.category == 'real_estate':
                    amenities = [
                        {'name': 'Swimming Pool', 'icon': 'waves'},
                        {'name': 'Parking', 'icon': 'car'},
                        {'name': 'WiFi', 'icon': 'wifi'},
                        {'name': 'Security', 'icon': 'shield'},
                    ]
                else:
                    amenities = [
                        {'name': 'Utilities Available', 'icon': 'zap'},
                        {'name': 'Road Access', 'icon': 'navigation'},
                        {'name': 'Development Rights', 'icon': 'building'},
                    ]
                
                for amenity_data in amenities:
                    PropertyAmenity.objects.create(
                        property=property_obj,
                        name=amenity_data['name'],
                        icon=amenity_data['icon']
                    )

        self.stdout.write(
            self.style.SUCCESS(
                f'Successfully created sample data!\n'
                f'Agents: {Agent.objects.count()}\n'
                f'Properties: {Property.objects.count()}\n'
                f'Amenities: {PropertyAmenity.objects.count()}'
            )
        )
