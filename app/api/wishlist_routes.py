from flask import Blueprint, jsonify, request
from app.models import Wish_List, db, Product
import requests
import json
from app.forms import Wishlist



wishlist_routes = Blueprint('wishlists', __name__)

@wishlist_routes.route('/<int:userId>', methods=["GET"])
def get_wishlists(userId):
    
    wishlists=Wish_List.query.filter_by(user_id=userId).all()
    
    
    return {"wishlists":[wishlist.to_dict() for wishlist in wishlists]}

    

@wishlist_routes.route('/createNew',methods=["POST"])
def post_wishlist():
    
    form=Wishlist()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        wishlist=Wish_List(
            user_id=form.data["user_id"],
            name=form.data["name"],
            bought=form.data["bought"]
        )
        db.session.add(wishlist)
        db.session.commit()
        

@wishlist_routes.route('/addItem',methods=["POST"])
def add_to_wishlist():
    
    data=json.loads(request.data.decode('utf-8'))
    listing_id=data["listing_id"]
    wishlist_id=data["wishlist_id"]
    name=data["title"]
    image_url=data['image_url']
    price=data["price"]
    print(data)
    newProduct=Product(
        product_id=listing_id,
        wishlist_id=wishlist_id,
        name=name,
        image_url=image_url,
        price=price
    )
    
    db.session.add(newProduct)
    db.session.commit()
    
    return '',200
