from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, MenuItemViewSet, BlogPostViewSet, OrderViewSet, ReservationViewSet, CommentViewSet, ReviewViewSet

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'menu-items', MenuItemViewSet)
router.register(r'blog-posts', BlogPostViewSet)
router.register(r'orders', OrderViewSet)
router.register(r'reservations', ReservationViewSet)
router.register(r'comments', CommentViewSet)
router.register(r'reviews', ReviewViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
