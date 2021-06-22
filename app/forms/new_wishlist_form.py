from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField, SubmitField
from wtforms.validators import DataRequired
from app.models import Wish_List


class Wishlist(FlaskForm):
    user_id=IntegerField('userId', [DataRequired()])
    name=StringField('Wish List Name', [DataRequired()])
    bought=StringField('Bought Items')