# export FLASK_APP=app.py
# flask db init
# flask db revision --autogenerate -m 'Create tables' 
# flask db upgrade 

from flask import Flask, request, make_response, jsonify, session
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_cors import CORS
from models import User
from services import api, app, db, secret_key, bcrypt
import json
from datetime import datetime


# Routes
@app.route('/')
def home():
    pass

@app.route('/login', methods=['POST'])
def login():
    if request.method == "POST":
        data = request.get_json()
        # print(data)
        gotten_user = User.query.filter(User.username == data['username']).first()
        if gotten_user:
            if gotten_user.authenticate(data['password']):
                session["user"] = gotten_user.id
                return gotten_user.to_dict(),200
            else:
                return {"Error": "Not valid password"}, 400
        else:
            return {"Error": "Not valid username"}, 400
