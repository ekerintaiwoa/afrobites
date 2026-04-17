import os
import django
import datetime

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from api.models import Category, MenuItem, BlogPost, Review

def seed():
    # Categories
    classics, _ = Category.objects.get_or_create(name="Ghanaian Classics")
    burgers, _ = Category.objects.get_or_create(name="Afro Burgers")
    sides, _ = Category.objects.get_or_create(name="Sides & Snacks")
    drinks, _ = Category.objects.get_or_create(name="Soda & Natural Juices")

    # Menu Items
    MenuItem.objects.get_or_create(
        name="Ghana Jollof",
        description="Smoky, perfectly spiced tomato rice with grilled chicken — the crown jewel of Ghanaian cuisine.",
        price=12.90,
        category=classics,
        is_featured=True
    )
    MenuItem.objects.get_or_create(
        name="Waakye",
        description="Ghana's legendary rice & beans dish served with fried fish, spaghetti, egg, and rich stew.",
        price=11.90,
        category=classics,
        is_featured=True
    )
    MenuItem.objects.get_or_create(
        name="Fufu & Light Soup",
        description="Silky pounded cassava & plantain with aromatic chicken light soup — a Ghanaian soul food classic.",
        price=13.90,
        category=classics,
        is_featured=True
    )
    MenuItem.objects.get_or_create(
        name="Afro Beef Burger",
        description="Juicy beef patty seasoned with West African spices, crispy lettuce, tomato, and our signature Afro sauce on a brioche bun.",
        price=10.90,
        category=burgers,
        is_featured=True
    )

    # Blog Posts
    BlogPost.objects.get_or_create(
        title="Where to Get the Best Ghana Jollof in Hamburg",
        tag="Food Guide",
        excerpt="Hamburg has a growing West African food scene — but if you want authentic, smoky Jollof that rivals anything in Accra, there's really only one place you need to know about.",
        content="Full content here...",
        image_emoji="🍚"
    )
    BlogPost.objects.get_or_create(
        title="The History of Waakye: Ghana's Most Beloved Street Food",
        tag="Culture",
        excerpt="From the streets of Nima to the kitchens of diaspora communities worldwide, Waakye has a rich cultural history that goes far deeper than rice and beans.",
        content="Full content here...",
        image_emoji="🫕"
    )

    # Reviews
    Review.objects.get_or_create(
        name="Kofi Mensah",
        stars=5,
        text="Best jollof rice I've ever had outside of Ghana. The smoky flavor is unreal — tastes exactly like home! 🔥",
        location="Altona, Hamburg 🇬🇭",
        avatar_letter="K"
    )
    Review.objects.get_or_create(
        name="Anna Schmidt",
        stars=5,
        text="Die Lieferung war super schnell und die Verpackung hält alles schön warm. Das Waakye mit gebratenem Fisch ist absolut der Hammer!",
        location="Eimsbüttel, Hamburg 🇩🇪",
        avatar_letter="A"
    )

    print("Seeding complete!")

if __name__ == "__main__":
    seed()
