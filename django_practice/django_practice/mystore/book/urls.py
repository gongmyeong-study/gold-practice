from django.urls import include, path
from rest_framework.routers import SimpleRouter
from book.views import BookViewSet

app_name = 'book'

router = SimpleRouter()
router.register('', BookViewSet, basename='book')

urlpatterns = [
  path('', include((router.urls))),
]
