from flask import Blueprint, jsonify, request
from app.models import Wish_List, db, Product, product
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
            name=form.data["name"]
            
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


@wishlist_routes.route('/getItems/<string:wishlistId>', methods=["GET"])
def populate_wishlist(wishlistId):
    
    items=Product.query.filter_by(wishlist_id=int(wishlistId)).all()
    
    return {"products":[product.to_dict() for product in items]}
    
@wishlist_routes.route('/<int:product_id>',methods=["DELETE"])
def delete_product(product_id):

    product=Product.query.filter_by(id=product_id).first()
    
    db.session.delete(product)
    db.session.commit()

    return '',200

@wishlist_routes.route('/deletewishlist/<int:id>', methods=["DELETE"])
def delete_wishlist(id):
    
    
    wishlist=Wish_List.query.filter_by(id=id).first()

    db.session.delete(wishlist)
    db.session.commit()

    return '',200

    
