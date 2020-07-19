# Django 튜토리얼 by 다빈 (https://github.com/davin111)


1. 프로젝트 생성 : `django-admin startproject mystore`

2. 서버 실행 : `python manage.py runserver` 

3. Book app 생성 :  `python manage.py startapp book `

4. RestFramework 설치 : `pip install djangorestframework`

5. setting.py 에 Book 설정 추가 : 
`INSTALLED_APPS […, ‘rest_framework’,‘book.apps.BookConfig]`

6. migration 확인하기 : `python manage.py showmigrations`

7. migration apply 하기 : `python manage.py migrate`

8. 모델 만들기 : in /Book/models.py
```python
from django.db import models

class Book(models.Model):
 	 title = models.CharField(max_length = 1000)
 	 price = models.PositiveIntegerField()
	 author = models.CharField(max_length = 100)
```

9. 만든 모델을 migrate하기 : `python manage.py makemigrations`

10. 뷰 만들기 : in Book/views.py
```python
from django.shortcuts import render
from rest_framework import viewsets

class BookViewSet(viewsets.GenericViewSet):
	  # create 메소드는 이 형식이 표준
    def create(self, request, *args, **kwargs):
	      title = request.data.get("title")
              price = request.data.get("price")
       	      author = request.data.get("author")

              book = Book.objects.create(title=title, 					
	      price=price, author=author)

              return Response(book, status=status.HTTP_201_CREATED)
```

11. urls.py 생성 : in book/urls.py
```python
from django.urls import include, path
from rest_framework.routers import SimpleRouter
from book.views import BookViewSet

app_name = 'book'

router = SimpleRouter()
router.register('', BookViewSet, basename='book')

urlpatterns = [
  path('', include((router.urls)))
]

```

12. router 추가하기 : in urls.py
```python
urlpatterns = [
    path(‘admin/‘, admin.site.urls),
    path(‘book/‘, include(‘book.urls’))
]
```

13. serializer 추가하기 :  데이터를 직렬화하기 위함
in book/serializers.py 
```python
from rest_framework import serializers
from book.models import Book

class BookSerializer(serializers.ModelSerializer):

    class Meta:
        model = Book
        fields = (
            ‘id’,
            ‘title’,
            ‘price’,
            ‘author’
        )
```
& in book/views.py
```python
from book.serializers import BookSerializer

class BookViewSet(viewsets.GenericViewSet):
    serializer_class = BookSerializer

    def create(self, request, *args, **kwargs):
        title = request.data.get("title")
        price = request.data.get("price")
        author = request.data.get("author")

        book = Book.objects.create(title=title, price=price, author=author)
        data = BookSerializer(book).data
        return Response(data, status=status.HTTP_201_CREATED)

```

16. Postman을 설치해 API를  호출해보자 :
<img width="1136" alt="Screen Shot 2020-05-16 at 4 04 22 PM" src="https://user-images.githubusercontent.com/54926767/82113812-c8055200-9793-11ea-8ad9-b1280ae1a533.png">


17. key request 오류를 처리하자 : in book/views.py

```python
class BookViewSet(viewsets.GenericViewSet):
    serializer_class = BookSerializer

    def create(self, request, *args, **kwargs):
        title = request.data.get(“title”)
        price = request.data.get(“price”)
        author = request.data.get(“author”)

        if title is None or price is None or author is None:
            return Response(“필수 키가 비어있습니다”, status=status.HTTP_400_BAD_REQUEST)

        book = Book.objects.create(title=title, price=price, author=author)
        data = BookSerializer(book).data
        return Response(data, status=status.HTTP_201_CREATED)
```
400 “필수 키가 비어있습니다”
<img width="1136" alt="Screen Shot 2020-05-16 at 4 15 18 PM" src="https://user-images.githubusercontent.com/54926767/82113845-f2570f80-9793-11ea-9e4b-2dbd5f50dd3f.png">
17. get ~/book/id or ~/book/ 호출로 책 목록을 가져오자 : in book/views.py
```python	
from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets, status 
from rest_framework.response import Response

from book.models import Book
from book.serializers import BookSerializer

class BookViewSet(viewsets.GenericViewSet):
    serializer_class = BookSerializer
    queryset = Book.objects.all()

    def create(self, request, *args, **kwargs):
        title = request.data.get(“title”)
        price = request.data.get(“price”)
        author = request.data.get(“author”)

        if title is None or price is None or author is None:
            return Response(“필수 키가 비어있습니다”, status=status.HTTP_400_BAD_REQUEST)

        book = Book.objects.create(title=title, price=price, author=author)
        data = self.get_serializer(book).data
        return Response(data, status=status.HTTP_201_CREATED)

    def retrieve(self, requset, pk=None):
        book = get_object_or_404(Book, pk=pk)
        return Response(self.get_serializer(book).data)

    def list(self, request):
        books = self.get_queryset()
        data = self.get_serializer(books, many=True).data
        return Response(data)
```

<img width="1147" alt="Screen Shot 2020-05-16 at 4 28 24 PM" src="https://user-images.githubusercontent.com/54926767/82113856-026eef00-9794-11ea-8d4c-c405f1c157f7.png">
<img width="1644" alt="Screen Shot 2020-05-16 at 4 27 05 PM" src="https://user-images.githubusercontent.com/54926767/82113860-0569df80-9794-11ea-8c43-7d0c130a298a.png">
