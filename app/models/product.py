from .db import db

class Product(db.Model):
    __tablename__='products'

    id=db.Column(db.Integer, primary_key=True)
    product_id=db.Column(db.Integer, nullable=False)
    wishlist_id=db.Column(db.Integer, db.ForeignKey('wishlists.id'))
    name=db.Column(db.String(2000), nullable=False)
    image_url=db.Column(db.String, nullable=False)
    price=db.Column(db.String, nullable=False)

    wishlist=db.relationship("Wish_List", back_populates="products" )






