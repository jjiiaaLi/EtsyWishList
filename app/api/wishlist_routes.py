from flask import Blueprint, jsonify
from app.models import Wish_List
import requests
import json


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

    
