from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets, status 
from rest_framework.response import Response

from book.models import Book
from book.serializers import BookSerializer

class BookViewSet(viewsets.GenericViewSet):
    serializer_class = BookSerializer
    queryset = Book.objects.all()

    def create(self, request, *args, **kwargs):
        title = request.data.get("title")
        price = request.data.get("price")
        author = request.data.get("author")

        if title is None or price is None or author is None:
            return Response("필수 키가 비어있습니다", status=status.HTTP_400_BAD_REQUEST)

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