import random
from app import app, db
from models import User, SubscriptionSet, Subscription
from datetime import datetime

# Create an application context
with app.app_context():
    # Delete existing data
    db.session.query(User).delete()
    db.session.query(SubscriptionSet).delete()
    db.session.query(Subscription).delete()
    db.session.commit()

    # Create sample users
    users = [
        User(username='user{}@example.com'.format(i), password='password{}'.format(i)) for i in range(1, 11)
    ]

    # Add users to session
    db.session.add_all(users)
    db.session.commit()

    # Create sample subscriptions
    subscriptions = [
        Subscription(
            service_name='Service {}'.format(i),
            website_link='https://www.example{}.com'.format(i),
            cost=10.99 + (i * 0.5),
            due_date=datetime.now().strftime('%Y-%m-%d')
        ) for i in range(1, 21)
    ]

    # Add subscriptions to session
    db.session.add_all(subscriptions)
    db.session.commit()

    # Create sample subscription sets linking users with subscriptions
    subscription_sets = []

    for user in users:
        # Randomly select 2 to 4 subscriptions for each user
        num_subscriptions = random.randint(2, 4)
        user_subscriptions = random.sample(subscriptions, num_subscriptions)

        # Create subscription sets for the selected subscriptions
        for subscription in user_subscriptions:
            subscription_set = SubscriptionSet(user_id=user.id, subscription_id=subscription.id)
            subscription_sets.append(subscription_set)

    # Add subscription sets to session
    db.session.add_all(subscription_sets)
    db.session.commit()

    print("Sample data has been successfully seeded.")
