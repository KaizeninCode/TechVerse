from app import app, db
from models.category import Category
from models.comment import Comment
from models.content import Content
from models.subscription import Subscription
from models.user import User
from datetime import datetime
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()

def delete_all(db):
    meta = db.metadata
    for table in reversed(meta.sorted_tables):
        print(f"Clearing table {table}")
        db.session.execute(table.delete())
    db.session.commit()

def seed():
    with app.app_context():
        delete_all(db)
        db.create_all()

        # Seed categories
        categories = [
            Category(name="Technology"),
            Category(name="Business"),
            Category(name="Sports"),
            Category(name="Science"),
            Category(name="Entertainment"),
        ]
        db.session.add_all(categories)
        db.session.commit()

        # Seed users
        users = [
            User(username="admin", email="admin@example.com", password_hash=bcrypt.generate_password_hash("password").decode("utf-8"), role="admin", active_status=True, created_at=datetime.now(), updated_at=datetime.now()),
            User(username="staff", email="staff@example.com", password_hash=bcrypt.generate_password_hash("password").decode("utf-8"), role="staff", active_status=True, created_at=datetime.now(), updated_at=datetime.now()),
            User(username="student1", email="student1@example.com", password_hash=bcrypt.generate_password_hash("password").decode("utf-8"), role="student", active_status=True, created_at=datetime.now(), updated_at=datetime.now()),
            User(username="student2", email="student2@example.com", password_hash=bcrypt.generate_password_hash("password").decode("utf-8"), role="student", active_status=True, created_at=datetime.now(), updated_at=datetime.now()),
        ]
        db.session.add_all(users)
        db.session.commit()

        # Seed contents
        contents = [
            Content(title="New Tech Gadget", description="An article about the latest tech gadget", type="article", category_id=1, published_status=True, user_id=2, created_at=datetime.now(), updated_at=datetime.now()),
            Content(title="Business Strategies", description="Tips for improving your business", type="article", category_id=2, published_status=True, user_id=2, created_at=datetime.now(), updated_at=datetime.now()),
            Content(title="The Revolution of AI", description="How AI is taking over the world today", type="video", category_id=3, published_status=True, user_id=2, created_at=datetime.now(), updated_at=datetime.now()),
            Content(title="Deep Dive into Cybersecurity", description="Going throught the latest cybersecurity developments", type="article", category_id=4, published_status=False, user_id=3, created_at=datetime.now(), updated_at=datetime.now()),
            Content(title="Software Engineering Today", description="The evolution of Software Engineering", type="article", category_id=5, published_status=True, user_id=4, created_at=datetime.now(), updated_at=datetime.now()),
        ]
        db.session.add_all(contents)
        db.session.commit()

        # Seed comments
        comments = [
            Comment(content_id=1, user_id=3, text="Great article!", parent_comment_id=None, created_at=datetime.now()),
            Comment(content_id=1, user_id=4, text="I disagree, the gadget has some flaws", parent_comment_id=None, created_at=datetime.now()),
            Comment(content_id=2, user_id=3, text="Helpful tips!", parent_comment_id=None, created_at=datetime.now()),
            Comment(content_id=3, user_id=4, text="Nice article", parent_comment_id=None, created_at=datetime.now()),
            Comment(content_id=5, user_id=3, text="I loved the article", parent_comment_id=None, created_at=datetime.now()),
        ]
        db.session.add_all(comments)
        db.session.commit()

        # Seed subscriptions
        subscriptions = [
            Subscription(user_id=3, category_id=1),
            Subscription(user_id=3, category_id=2),
            Subscription(user_id=4, category_id=3),
            Subscription(user_id=4, category_id=5),
        ]
        db.session.add_all(subscriptions)
        db.session.commit()

        print("Seeding completed successfully.")

if __name__ == '__main__':
    seed()