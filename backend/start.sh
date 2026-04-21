#!/bin/bash
echo "Running migrations..."
python manage.py migrate --noinput

echo "Populating database..."
python populate.py

echo "Creating superuser..."
python manage.py shell -c "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.filter(username='admin').exists() or User.objects.create_superuser('admin', 'admin@example.com', 'admin123')"

echo "Creating OurStory data..."
python manage.py shell -c "from api.models import OurStory; OurStory.objects.get_or_create(tag='OUR STORY', title='Bringing Africa\'s Kitchen to Hamburg', subtitle='King\'s Afro Bites was born out of a simple mission: to bring the bold, soulful flavors of West Africa to Hamburg.', value1='Authentic Recipes', value2='Fresh Ingredients', value3='Fast Delivery', value4='Made with Love')"

echo "Starting server..."
gunicorn afrobites.wsgi --log-file -
