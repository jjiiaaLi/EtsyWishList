from flask import Blueprint
from app.models import Product, product
import requests
from flask import request
import json
from random import randint

search_routes=Blueprint('search', __name__)

@search_routes.route('/<string:tags>/', methods=["GET"])
def search_etsy(tags):
    
    res = requests.get(
        f"https://openapi.etsy.com/v2/listings/active?api_key=h6jf3au38z1loqmhogom8cet&tags={tags}&limit=50&includes=MainImage")
    data = res.json()
    return data