from django.contrib import admin
from .models import Category, MenuItem, BlogPost, Order, OrderItem, Reservation, Comment, Review, AvailableSlot, OurStory, HeroSection, HomePageSection

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

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('author', 'post', 'created_at')

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('author', 'rating', 'created_at')

@admin.register(AvailableSlot)
class AvailableSlotAdmin(admin.ModelAdmin):
    list_display = ('date', 'time', 'is_booked')
    list_filter = ('date', 'is_booked')

@admin.register(OurStory)
class OurStoryAdmin(admin.ModelAdmin):
    list_display = ('title', 'tag')

@admin.register(HeroSection)
class HeroSectionAdmin(admin.ModelAdmin):
    list_display = ('tag', 'title')
    fieldsets = (
        ('Content', {
            'fields': ('tag', 'title', 'subtitle')
        }),
        ('Buttons', {
            'fields': ('cta_primary_text', 'cta_secondary_text')
        }),
        ('Appearance', {
            'fields': ('image',),
            'classes': ('collapse',)
        }),
    )

    def has_add_permission(self, request):
        # Only allow one HeroSection instance
        if self.model.objects.exists():
            return False
        return super().has_add_permission(request)

@admin.register(HomePageSection)
class HomePageSectionAdmin(admin.ModelAdmin):
    list_display = ('title', 'tag', 'layout', 'order', 'is_active')
    list_filter = ('is_active', 'layout')
    list_editable = ('order', 'is_active')
    ordering = ('order',)
    fieldsets = (
        ('Content', {
            'fields': ('tag', 'title', 'subtitle', 'content')
        }),
        ('Appearance', {
            'fields': ('image', 'layout', 'background_color', 'text_color')
        }),
        ('Display', {
            'fields': ('order', 'is_active')
        }),
    )

