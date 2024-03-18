from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from sqlalchemy import MetaData, event
from sqlalchemy_serializer import SerializerMixin
import datetime

from sqlalchemy.ext.hybrid import hybrid_property
from services import db, bcrypt


class User(db.Model, SerializerMixin):
    __tablename__ = "Users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    _password_hash = db.Column(db.String, nullable=False)

    subscriptionSet  = db.relationship('SubscriptionSet', back_populates='user')

    serialize_rules = ('-subscriptionSet',)

    @hybrid_property
    def password(self):
        return self._password_hash
    
        # Now we create a setter function!
    @password.setter
    def password(self, password):
        #NOTE WE NEED THE ENCODE AND DECODE IN PYTHON 3 DUE TO SPECIAL CHARACTERS ∫
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    # Now lets create an authentification route using
    # bcrypt.check_password_hash(_password_hash, password.encode('utf-8'))
    def authenticate(self,password):
        return bcrypt.check_password_hash(self._password_hash,password.encode('utf-8'))
    
class SubscriptionSet(db.Model, SerializerMixin):
    __tablename__ = 'SubscriptionSets'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('Users.id'))
    subscription_id = db.Column(db.Integer, db.ForeignKey('Subscriptions.id'))

    user = db.relationship('User', back_populates='subscriptionSet')
    subscription = db.relationship('Subscription', back_populates='subscriptionSet')

class Subscription(db.Model, SerializerMixin):
    __tablename__ = 'Subscriptions'
    id = db.Column(db.Integer, primary_key=True)
    service_name = db.Column(db.String)
    website_link = db.Column(db.String)
    cost = db.Column(db.Float)
    due_date = db.Column(db.String)

    subscriptionSet = db.relationship('SubscriptionSet', back_populates='subscription')

    serialize_rules = ('-subscriptionSet',)
