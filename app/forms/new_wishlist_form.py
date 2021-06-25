from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField, SubmitField
from wtforms.validators import DataRequired



class Wishlist(FlaskForm):
    user_id=IntegerField('user_id', [DataRequired()])
    name=StringField('Name', [DataRequired()])
    items=StringField('Items')
   