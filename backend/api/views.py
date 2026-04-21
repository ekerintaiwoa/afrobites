from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Category, MenuItem, BlogPost, Order, Reservation, Comment, Review, AvailableSlot, OurStory
from .serializers import CategorySerializer, MenuItemSerializer, BlogPostSerializer, OrderSerializer, ReservationSerializer, CommentSerializer, ReviewSerializer, OurStorySerializer

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class MenuItemViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = MenuItem.objects.filter(is_active=True).order_by('category')
    serializer_class = MenuItemSerializer

class BlogPostViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = BlogPost.objects.all().order_by('-date')
    serializer_class = BlogPostSerializer

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

class ReservationViewSet(viewsets.ModelViewSet):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all().order_by('-created_at')
    serializer_class = CommentSerializer

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all().order_by('-created_at')
    serializer_class = ReviewSerializer

class OurStoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = OurStory.objects.all()
    serializer_class = OurStorySerializer

@api_view(['POST'])
def check_availability(request):
    date = request.data.get('date')
    time_str = request.data.get('time')
    guests = request.data.get('guests')
    name = request.data.get('name')
    phone = request.data.get('phone')

    # Basic validation
    if not all([date, time_str, guests, name, phone]):
        return Response({'success': False, 'message': 'Missing required fields for reservation'}, status=400)

    try:
        # Check if slot exists and is available
        # we check time startswith to handle backend storing seconds (e.g., 18:30:00 vs 18:30)
        slot = AvailableSlot.objects.filter(date=date, time__startswith=time_str.split(':')[0] + ':' + time_str.split(':')[1], is_booked=False).first()
        
        if slot:
            # Slot is available! Book it.
            slot.is_booked = True
            slot.save()
            
            # Create a full Reservation record
            qs_guests = ''.join([c for c in str(guests) if c.isdigit()])
            party_size = int(qs_guests) if qs_guests else 2

            Reservation.objects.create(
                full_name=name,
                phone=phone,
                party_size=party_size,
                date=slot.date,
                time=slot.time,
                seating_preference='Quick Reservation',
                occasion='Casual Dinner',
                preorder_dish='No pre-order'
            )
            return Response({'success': True, 'message': 'Table reserved successfully!'})
        else:
            # Slot not available, find alternative slots
            alternatives = AvailableSlot.objects.filter(date__gte=date, is_booked=False).order_by('date', 'time')[:5]
            alt_data = [{'date': s.date, 'time': s.time.strftime('%H:%M')} for s in alternatives]
            return Response({'success': False, 'message': 'Date and time not available', 'alternatives': alt_data})
            
    except Exception as e:
        import traceback
        traceback.print_exc()
        return Response({'success': False, 'message': 'Internal Server Error'}, status=500)
