from django.contrib import admin
from .models import Category, MenuItem, BlogPost, Order, OrderItem, Reservation

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    pass

@admin.register(MenuItem)
class MenuItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'is_active')
    list_filter = ('category', 'is_active')

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'tag', 'date')

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'email', 'total', 'created_at')
    inlines = [OrderItemInline]

@admin.register(Reservation)
class ReservationAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'date', 'time', 'party_size', 'occasion', 'created_at')
    list_filter = ('date', 'occasion', 'seating_preference')
    search_fields = ('full_name', 'phone', 'email')
