from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self): return self.name

class MenuItem(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    image = models.ImageField(upload_to='menu_images/', blank=True, null=True, help_text="Recommended size: 800x600 pixels")
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='items')
    is_active = models.BooleanField(default=True)
    def __str__(self): return self.name

class BlogPost(models.Model):
    title = models.CharField(max_length=200)
    tag = models.CharField(max_length=50)
    excerpt = models.TextField()
    content = models.TextField()
    date = models.DateField(auto_now_add=True)
    image = models.ImageField(upload_to='blog_images/', blank=True, null=True, help_text="Recommended size: 1200x630 pixels")
    def __str__(self): return self.title

class Comment(models.Model):
    post = models.ForeignKey(BlogPost, on_delete=models.CASCADE, related_name='comments')
    author = models.CharField(max_length=100)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self): return f"Comment by {self.author} on {self.post.title}"

class Review(models.Model):
    author = models.CharField(max_length=100)
    rating = models.PositiveIntegerField(default=5)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self): return f"Review by {self.author}"

class Order(models.Model):
    full_name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    address = models.TextField()
    note = models.TextField(blank=True, null=True)
    payment_method = models.CharField(max_length=50)
    total = models.DecimalField(max_digits=8, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self): return f"Order {self.id} by {self.full_name}"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    menu_item_name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    quantity = models.PositiveIntegerField(default=1)

class Reservation(models.Model):
    full_name = models.CharField(max_length=200)
    phone = models.CharField(max_length=20)
    email = models.EmailField(blank=True, null=True)
    party_size = models.PositiveIntegerField()
    date = models.DateField()
    time = models.TimeField()
    seating_preference = models.CharField(max_length=50, default='No preference')
    occasion = models.CharField(max_length=50, default='Casual dinner')
    preorder_dish = models.CharField(max_length=100, default='No pre-order')
    allergies = models.TextField(blank=True, null=True)
    special_request = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self): return f"Reservation for {self.full_name} on {self.date}"

class AvailableSlot(models.Model):
    date = models.DateField()
    time = models.TimeField()
    is_booked = models.BooleanField(default=False)
    
    def __str__(self): return f"{self.date} at {self.time} (Booked: {self.is_booked})"

class OurStory(models.Model):
    tag = models.CharField(max_length=50, default="OUR STORY")
    title = models.CharField(max_length=200, default="Bringing Africa's Kitchen to Hamburg")
    subtitle = models.TextField(default="King's Afro Bites was born out of a simple mission: to bring the bold, soulful flavors of West Africa to Hamburg.")
    value1 = models.CharField(max_length=50, default="Authentic Recipes")
    value2 = models.CharField(max_length=50, default="Fresh Ingredients")
    value3 = models.CharField(max_length=50, default="Fast Delivery")
    value4 = models.CharField(max_length=50, default="Made with Love")
    image = models.ImageField(upload_to='story_images/', blank=True, null=True, help_text="Recommended size: 1200x800 pixels")

    def __str__(self):
        return "Our Story Content"
    
    class Meta:
        verbose_name_plural = "Our Story"


class HeroSection(models.Model):
    tag = models.CharField(max_length=100, default="NOW SERVING HAMBURG", help_text="Small tag text above the title")
    title = models.CharField(max_length=300, default="Reserve a table for bold African flavours.", help_text="Main hero heading")
    subtitle = models.TextField(
        default="King's Afro Bites brings a warm, modern dining experience built around Ghanaian and West African classics. Discover signature dishes, pre-order favourites, and book your table in seconds.",
        help_text="Paragraph below the title"
    )
    cta_primary_text = models.CharField(max_length=50, default="Book a Table", help_text="Primary button label")
    cta_secondary_text = models.CharField(max_length=50, default="Explore Menu", help_text="Secondary button label")
    image = models.ImageField(upload_to='hero_images/', blank=True, null=True, help_text="Optional hero background image (recommended 1920x1080)")

    def __str__(self):
        return "Hero Section Content"

    class Meta:
        verbose_name_plural = "Hero Section"


class HomePageSection(models.Model):
    LAYOUT_CHOICES = [
        ('text_only', 'Text Only'),
        ('image_left', 'Image on Left'),
        ('image_right', 'Image on Right'),
    ]

    tag = models.CharField(max_length=100, blank=True, help_text="Small tag above the title (optional)")
    title = models.CharField(max_length=300, help_text="Section heading")
    subtitle = models.TextField(blank=True, help_text="Description text (optional)")
    content = models.TextField(blank=True, help_text="Additional HTML/text content (optional)")
    image = models.ImageField(upload_to='section_images/', blank=True, null=True, help_text="Section image (recommended 1200x800)")
    background_color = models.CharField(max_length=20, default="#000000", help_text="CSS background color, e.g. #f9f9f9")
    text_color = models.CharField(max_length=20, default="#ffffff", help_text="CSS text color, e.g. #ffffff")
    order = models.PositiveIntegerField(default=0, help_text="Display order (lower = higher on page)")
    is_active = models.BooleanField(default=True, help_text="Uncheck to hide this section")
    layout = models.CharField(max_length=20, choices=LAYOUT_CHOICES, default='text_only', help_text="Choose the section layout")

    def __str__(self):
        return f"Section: {self.title}"

    class Meta:
        verbose_name_plural = "Homepage Sections"
        ordering = ['order']
