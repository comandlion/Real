#!/usr/bin/env python3
"""
Django Backend Setup Script for Premium Realty

This script sets up the Django backend with sample data.
Run this after installing the requirements.
"""

import os
import sys
import subprocess
import django
from pathlib import Path

def run_command(command, description):
    """Run a command and print the description"""
    print(f"\n🔄 {description}...")
    try:
        result = subprocess.run(command, shell=True, check=True, capture_output=True, text=True)
        print(f"✅ {description} completed successfully")
        if result.stdout:
            print(result.stdout)
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ {description} failed")
        if e.stderr:
            print(f"Error: {e.stderr}")
        return False

def main():
    print("🚀 Setting up Premium Realty Django Backend")
    print("=" * 50)
    
    # Check if we're in the right directory
    if not Path('manage.py').exists():
        print("❌ Error: manage.py not found. Please run this script from the Django backend directory.")
        sys.exit(1)
    
    # Install requirements
    if not run_command("pip install -r requirements.txt", "Installing Python dependencies"):
        print("⚠️  Please install requirements manually: pip install -r requirements.txt")
    
    # Django setup
    commands = [
        ("python manage.py makemigrations", "Creating migrations"),
        ("python manage.py migrate", "Running migrations"),
        ("python manage.py collectstatic --noinput", "Collecting static files"),
    ]
    
    for command, description in commands:
        if not run_command(command, description):
            print(f"⚠️  Please run manually: {command}")
    
    # Create superuser
    print(f"\n🔄 Creating superuser...")
    print("Please enter superuser details:")
    try:
        subprocess.run("python manage.py createsuperuser", shell=True, check=True)
        print("✅ Superuser created successfully")
    except subprocess.CalledProcessError:
        print("⚠️  Superuser creation skipped or failed")
    
    # Create sample data
    if run_command("python manage.py create_sample_data", "Creating sample data"):
        print("✅ Sample data created successfully")
    
    print("\n" + "=" * 50)
    print("🎉 Django Backend Setup Complete!")
    print("\nNext steps:")
    print("1. Start the development server: python manage.py runserver")
    print("2. Visit the admin panel: http://localhost:8000/admin")
    print("3. Check the API: http://localhost:8000/api/properties/")
    print("4. Your React frontend should now connect successfully!")
    print("\n📊 Sample Data Created:")
    print("- Properties: Real estate and land listings")
    print("- Agents: Sample real estate agents")
    print("- Users: Agent user accounts")
    print("\n🔗 API Endpoints:")
    print("- Properties: /api/properties/")
    print("- Agents: /api/agents/")
    print("- Authentication: /api/login/, /api/register/")

if __name__ == "__main__":
    main()
