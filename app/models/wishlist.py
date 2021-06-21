from .db import db

class Wish_List(db.Model):
    __tablename__ = 'wishlists'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    name=db.Column(db.String, nullable=False)
    bought=db.Column(db.Boolean)

    products=db.relationship("Product", back_populates="wishlist")