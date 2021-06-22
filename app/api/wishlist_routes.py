from flask import Blueprint, jsonify, request
from app.models import Wish_List, db
import requests
import json
from app.forms.new_wishlist_form import Wishlist


wishlist_routes = Blueprint('wishlists', __name__)

@wishlist_routes.route('/<int:userId>', methods=["GET"])
def get_wishlists(userId):
    
    wishlists=Wish_List.query.filter_by(user_id=userId).all()
    
    returnlist=[]
    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "name": self.name,
            "bought": self.bought
        }
    for x in wishlists:
        returnlist.append(to_dict(x))

    
    return jsonify(returnlist)

    

@wishlist_routes.route('/',methods=["POST"])
def post_wishlist():
    form=Wishlist()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        wishlist=Wish_List(
            user_id=form.data.user_id,
            name=form.data.name
        )
        db.session.add(wishlist)
        # print('before commit')
        db.session.commit()
        # print('after commit')