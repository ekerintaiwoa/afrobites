from django.contrib import admin
from .models import Category, MenuItem, BlogPost, Reservation, Review

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)

@admin.register(MenuItem)
class MenuItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'is_featured', 'is_available')
    list_filter = ('category', 'is_featured', 'is_available')
    search_fields = ('name', 'description')

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'tag', 'created_at')
    list_filter = ('tag',)
    search_fields = ('title', 'content')

@admin.register(Reservation)
class ReservationAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'date', 'time', 'party_size', 'occasion', 'created_at')
    list_filter = ('date', 'occasion', 'seating_preference')
    search_fields = ('full_name', 'phone', 'email')
    readonly_fields = ('created_at',)

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('name', 'stars', 'location')
    list_filter = ('stars',)
