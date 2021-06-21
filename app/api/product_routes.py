from flask import Blueprint
from app.models import Product, product
import requests
import json

product_routes=Blueprint('products', __name__)


@product_routes.route('/', methods=["GET"])
def get_products():
    
    response = requests.get("https://openapi.etsy.com/v2/listings/active/?api_key=h6jf3au38z1loqmhogom8cet&limit=50&includes=MainImage&keywords=stuffedanimals")
    return response.json()


