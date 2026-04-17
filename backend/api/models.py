from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self): return self.name

class MenuItem(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    image = models.ImageField(upload_to='menu_images/', blank=True, null=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='items')
    is_active = models.BooleanField(default=True)
    def __str__(self): return self.name

class BlogPost(models.Model):
    title = models.CharField(max_length=200)
    tag = models.CharField(max_length=50)
    excerpt = models.TextField()
    content = models.TextField()
    date = models.DateField(auto_now_add=True)
    image_emoji = models.CharField(max_length=10, blank=True, null=True)
    def __str__(self): return self.title

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
