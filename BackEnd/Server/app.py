# export FLASK_APP=app.py
# flask db init
# flask db revision --autogenerate -m 'Create tables' 
# flask db upgrade 

from flask import Flask, request, make_response, jsonify, session
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_cors import CORS
from models import User, SubscriptionSet, Subscription
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

@app.route('/create_user', methods=["POST"])
def add_user():
    if request.method == "POST":
        try:
            json_dict = request.get_json()
            print(json_dict)
            new_user = User(
                username = json_dict.get("username"),
                password = json_dict.get("password")
            )
            
            db.session.add(new_user)
            db.session.commit()
            session["user"] = new_user.id 
            # After the user is created and submitted to the data base we have the set the session to that new users id
            # so that when they create there account it wont automaticly log them out
            # this adds it to our table
            return new_user.to_dict(),201
        except Exception as e:
            print(e)
            return make_response({"errors": ["validation errors"]}, 404)

@app.route('/subscriptions/<int:user_id>', methods=['GET'])
def get_user_subscriptions(user_id):
    if request.method == 'GET':

        subscriptions = Subscription.query\
            .join(SubscriptionSet, SubscriptionSet.subscription_id == Subscription.id)\
            .filter(SubscriptionSet.user_id == user_id)\
            .all()

        if not subscriptions:
            return jsonify({'message': 'No subscriptions found for the user.'}), 404

        serialized_subscriptions = [subscription.to_dict() for subscription in subscriptions]

        return jsonify(serialized_subscriptions), 200
    

@app.route('/save_subscription', methods=["POST"])
def subscription_save():
    if request.method == "POST":
        subscription_data = request.json
        
        
        user_id = subscription_data.get('user_id')

        new_subscription = Subscription(
            service_name=subscription_data.get("service_name"),
            website_link=subscription_data.get("website_link"),
            cost=float(subscription_data.get("cost")),  # Convert cost to float
            due_date=subscription_data.get("due_date"),
            frequency=subscription_data.get('frequency')
        )
       
        db.session.add(new_subscription)
        db.session.commit()
        
        new_subscription_set = SubscriptionSet(
            user_id=user_id,  
            subscription_id=new_subscription.id
        )
        
        db.session.add(new_subscription_set)
        db.session.commit()
        
        return jsonify({"message": "Subscription created successfully"}), 201
    else:
        return jsonify({"error": "Method not allowed"}), 405
    
@app.route('/handle_subscription/<int:id>', methods=["DELETE", "GET"])
def handle_subscription(id):
    if request.method == "DELETE":
        subscription = Subscription.query.get(id)
        if subscription is None:
            return jsonify({"error": "Subscription not found"}), 404
        
       
        db.session.delete(subscription)
        db.session.commit()
        
        return '', 204
    elif request.method == "GET":
        subscription = Subscription.query.get(id)
        if subscription is None:
            return jsonify({"error": "Subscription not found"}), 404
        else:
            subscription_data = {
                "id": subscription.id,
                "service_name": subscription.service_name,
                "website_link": subscription.website_link,
                "cost": subscription.cost,
                "due_date": subscription.due_date,
                "frequency": subscription.frequency
                # Add more fields as needed
            }
            return jsonify(subscription_data), 200
    
@app.route('/user/<int:user_id>', methods=["GET"])
def get_userinfo(user_id):
    if request.method == 'GET':
        user = User.query.get(user_id)
        if user:
            
            serialized_user = user.to_dict()
            return jsonify(serialized_user), 200
        else:
            return jsonify({'message': 'User not found'}), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5555, debug=True)
    # Using 0.0.0.0 allows us to run it locally and access from other devices, such as testing for mobile!