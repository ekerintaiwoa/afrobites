import os
import django
from urllib.request import urlopen
from django.core.files.base import ContentFile

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'afrobites.settings')
django.setup()

from api.models import BlogPost, Review

blog_posts = [
    { 'tag': 'Food Guide', 'title': 'Where to Get the Best Ghana Jollof in Hamburg', 'date': '2026-03-28', 'excerpt': 'Hamburg has a growing West African food scene — but if you want authentic, smoky Jollof that rivals anything in Accra, there\'s really only one place you need to know about.', 'image': 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=800' },
    { 'tag': 'Culture', 'title': 'The History of Waakye: Ghana\'s Most Beloved Street Food', 'date': '2026-03-14', 'excerpt': 'From the streets of Nima to the kitchens of diaspora communities worldwide, Waakye has a rich cultural history that goes far deeper than rice and beans.', 'image': 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=800' },
    { 'tag': 'Recipe', 'title': 'How to Make the Perfect Banku at Home', 'date': '2026-02-22', 'excerpt': 'Banku is one of Ghana\'s most iconic dishes — but getting it right takes patience, technique, and the right fermentation ratio. Here\'s our step-by-step guide.', 'image': 'https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?auto=format&fit=crop&q=80&w=800' },
    { 'tag': 'Community', 'title': 'The Rise of African Food in Germany\'s Biggest Cities', 'date': '2026-02-05', 'excerpt': 'African cuisine is having a moment in Germany. From Berlin to Hamburg, more Germans are discovering the depth and richness of West African cooking — and they love it.', 'image': 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800' }
]

reviews = [
    { 'author': 'Kwame Mensah', 'rating': 5, 'text': "The Jollof tastes exactly like home. Easily the best I've had in Germany!" },
    { 'author': 'Sarah Müller', 'rating': 5, 'text': "Incredible food and such a warm atmosphere. The Kelewele is a must-try." },
    { 'author': 'David O.', 'rating': 4, 'text': "Great portions and authentic flavors. Will definitely be coming back." },
]

print("Populating DB with Blog Posts and Reviews...")

if BlogPost.objects.count() == 0:
    for post in blog_posts:
        image_content = urlopen(post['image']).read()
        bp = BlogPost(
            title=post['title'],
            tag=post['tag'],
            excerpt=post['excerpt'],
            content=post['excerpt'], # Use excerpt as content placeholder
        )
        bp.image.save(f"{post['title'][:10]}.jpg", ContentFile(image_content), save=False)
        bp.save()
        print(f"Created {bp.title}")

if Review.objects.count() == 0:
    for review in reviews:
        rv = Review.objects.create(author=review['author'], rating=review['rating'], text=review['text'])
        print(f"Created {rv.author} review")

print("Done.")
