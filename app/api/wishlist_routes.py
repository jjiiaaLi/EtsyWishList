from flask import Blueprint, jsonify, request
from app.models import Wish_List, db
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
            items=form.data["items"],
            bought=form.data["bought"]
        )
        db.session.add(wishlist)
        db.session.commit()
        

@wishlist_routes.route('/addItem',methods=["PUT"])
def add_to_wishlist():
    
    data=json.loads(request.data.decode('utf-8'))
    listingId=data["listingId"]
    wishlist_id=data["wishlist_id"]
    
    targetWishlist=Wish_List.query.filter_by(id=wishlist_id).first()
    currentItems=targetWishlist.items
    if len(currentItems) == 0:
        targetWishlist.items=listingId
    else:
        targetWishlist.items=currentItems+','+listingId
    db.session.commit()
    return '',200
