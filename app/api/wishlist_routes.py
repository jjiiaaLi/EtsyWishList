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
            bought=form.data["bought"]
        )
        db.session.add(wishlist)
        print('before commit')
        db.session.commit()
        print('after commit')

