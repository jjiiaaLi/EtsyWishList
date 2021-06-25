from .db import db

class Wish_List(db.Model):
    __tablename__ = 'wishlists'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    name=db.Column(db.String, nullable=False)
    

    products=db.relationship("Product", back_populates="wishlist")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "name": self.name
            
        }
