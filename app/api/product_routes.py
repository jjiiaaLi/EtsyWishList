from flask import Blueprint
from app.models import Product, product
import requests
from flask import request
import json
from random import randint

product_routes=Blueprint('products', __name__)


@product_routes.route('/', methods=["GET"])
def get_products():
    # categories=['stuffedanimals','cute', 'cats','shrek']
    # rand_num=randint(0,len(categories))
    # search_keyword=categories[rand_num]
    response = requests.get(f"https://openapi.etsy.com/v2/listings/active/?api_key=h6jf3au38z1loqmhogom8cet&limit=50&includes=MainImage&keywords=cute -mature")
    return response.json()


@product_routes.route('/<string:listingId>/', methods=["GET"])
def get_single_product(listingId):
    
    response = requests.get(
        f"https://openapi.etsy.com/v2/listings/{listingId}/?api_key=h6jf3au38z1loqmhogom8cet&includes=MainImage")
    
    return response.json()