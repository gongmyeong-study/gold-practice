from django.db import models

class Book(models.Model):
   title = models.CharField(max_length = 1000)
   price = models.PositiveIntegerField()
   author = models.CharField(max_length = 100)


