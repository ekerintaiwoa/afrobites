from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100)
    
    class Meta:
        verbose_name_plural = "Categories"
    
    def __str__(self):
        return self.name

class MenuItem(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    image = models.ImageField(upload_to='menu/', blank=True, null=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='items')
    is_featured = models.BooleanField(default=False)
    is_available = models.BooleanField(default=True)

    def __str__(self):
        return self.name

class BlogPost(models.Model):
    title = models.CharField(max_length=200)
    tag = models.CharField(max_length=50) # e.g., Food Guide, Culture
    excerpt = models.TextField()
    content = models.TextField()
    image_emoji = models.CharField(max_length=10, default="🍚")
    image = models.ImageField(upload_to='blog/', blank=True, null=True)
    created_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.title

class Reservation(models.Model):
    SEATING_CHOICES = [
        ('Indoor', 'Indoor'),
        ('Window seat', 'Window seat'),
        ('Outdoor', 'Outdoor'),
        ('No preference', 'No preference'),
    ]
    OCCASION_CHOICES = [
        ('Casual dinner', 'Casual dinner'),
        ('Birthday', 'Birthday'),
        ('Date night', 'Date night'),
        ('Family dinner', 'Family dinner'),
        ('Business meal', 'Business meal'),
    ]
    
    full_name = models.CharField(max_length=200)
    phone = models.CharField(max_length=20)
    email = models.EmailField(blank=True, null=True)
    party_size = models.PositiveIntegerField()
    date = models.DateField()
    time = models.TimeField()
    seating_preference = models.CharField(max_length=50, choices=SEATING_CHOICES, default='No preference')
    occasion = models.CharField(max_length=50, choices=OCCASION_CHOICES, default='Casual dinner')
    preorder_dish = models.CharField(max_length=100, blank=True, null=True)
    allergies = models.CharField(max_length=255, blank=True, null=True)
    special_request = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Reservation for {self.full_name} on {self.date} at {self.time}"

class Review(models.Model):
    name = models.CharField(max_length=100)
    stars = models.PositiveIntegerField(default=5)
    text = models.TextField()
    location = models.CharField(max_length=100) # e.g. Altona, Hamburg
    avatar_letter = models.CharField(max_length=1)
    
    def __str__(self):
        return f"Review by {self.name}"
