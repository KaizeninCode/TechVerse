from flask import Flask, request , jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, create_refresh_token, jwt_required, get_jwt_identity
from models.dbconfig import db
from models.category import Category
from models.comment import Comment
from models.content import Content
from models.subscription import Subscription
from models.user import User

from datetime import datetime

app = Flask(__name__)

api = Api(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.config['JWT_SECRET_KEY'] = "e27c00e982d1d07709adb9eb"

app.secret_key = "hgfedcba"

migrate = Migrate(app, db)

bcrypt = Bcrypt(app)

jwt = JWTManager(app)

db.init_app(app)

#CRUD FOR USER
class UserResource(Resource):
    @jwt_required()
    def get(self):
        current_user_role = get_jwt_identity()["role"]

        if current_user_role != "admin":
            return jsonify({"error": "Unauthorized access"})

        users = User.query.all()
        return jsonify([{'id': user.id, 'username': user.username,'email': user.email, 'role': user.role, 'active_status': user.active_status, 'created_at': user.created_at, 'updated_at': user.updated_at} for user in users])

    @jwt_required()
    def post(self):
        
        data = request.get_json()
        username=data.get('username')
        email=data.get('email')
        password_hash=data.get('password_hash')
        role=data.get('role')
        active_status=data.get('active_status')
        created_at=datetime.strptime(data.get('created_at'), '%d/%m/%Y')
        updated_at=datetime.strptime(data.get('updated_at'), '%d/%m/%Y')
        
        current_user_role = get_jwt_identity()["role"]

        if current_user_role not in ["admin", "staff","student"]:
            return jsonify({"error": "Unauthorized access"}), 403

        user_exists = User.query.filter_by(email = email).first()
        if user_exists:
            return jsonify({'error': 'User already exists'})

        hashed_password = bcrypt.generate_password_hash(password_hash)
    
        new_user = User(
            username=username,
            email=email, 
            password_hash=hashed_password,
            role=role,
            active_status=active_status,
            created_at=created_at,
            updated_at=updated_at
        )

        db.session.add(new_user)
        db.session.commit()

        return jsonify({'message': 'User created successfully'})

    @jwt_required()
    def put(self, id):
        current_user_role = get_jwt_identity()["role"]

        if current_user_role != "admin":
            return jsonify({"error": "Unauthorized access"})

        user = User.query.get(id)
        if user:
            data = request.json
            user.username = data.get('username', user.username)
            user.email = data.get('email', user.email)
            user.role = data.get('role', user.role)
            user.active_status = data.get('active_status' == True, user.active_status)
            user.created_at = datetime.strptime(data.get('created_at'), '%d/%m/%Y')
            user.updated_at = datetime.strptime(data.get('updated_at', user.updated_at), '%d/%m/%Y')
            db.session.commit()

            return jsonify({'message': 'User updated successfully'})
        else:
            return jsonify({'message': 'User not found'}), 404

    @jwt_required()
    def delete(self, id):
        current_user_role = get_jwt_identity()["role"]

        if current_user_role != "admin":
            return jsonify({"error": "Unauthorized access"})
        
        user = User.query.get(id)
        if user:
            db.session.delete(user)
            db.session.commit()
            return jsonify({'message': 'User deleted successfully'})
        else:
            return jsonify({'message': 'User not found'}), 404
        
# login user
class UserLoginResource(Resource):
    def post(self):
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        user = User.query.filter_by(email = email).first()

        if user and (bcrypt.check_password_hash(user.password_hash, password)):
            access_token = create_access_token(identity={"email": user.email, "role": user.role})
            refresh_token = create_refresh_token(identity={"email": user.email, "role": user.role})

            return jsonify(
                {
                    "message": "Logged In",
                    "tokens": {
                        "access" : access_token,
                        "refresh": refresh_token
                    }
                }
            )

        return make_response(jsonify({"error": "Invalid username or password"}), 400)
    
api.add_resource(UserLoginResource, '/login')

        
#CRUD FOR COMMENTS
class CommentResource(Resource):
    def get(self):
        comments = Comment.query.all()
        return jsonify([{'id': comment.id, 'content_id': comment.content_id, 'text': comment.text, 'parent_comment_id': comment.parent_comment_id, 'created_at': comment.created_at} for comment in comments])

    @jwt_required()
    def post(self):
        current_user_role = get_jwt_identity()["role"]
        
        if current_user_role != "student":
            return jsonify({"error": "Unauthorized access"})
        
        data = request.json
        new_comment = Comment(
            content_id=data['content_id'],
            user_id=data['user_id'],
            text=data['text'],
            parent_comment_id=data['parent_comment_id'],
            created_at=datetime.strptime(data['created_at'], '%d/%m/%Y')
        )
        db.session.add(new_comment)
        db.session.commit()
        return jsonify({'message': 'Comment created successfully'})

    def put(self, id):
        comment = Comment.query.get(id)
        if comment:
            data = request.json
            comment.content_id = data.get('content_id', comment.content_id)
            comment.user_id = data.get('user_id', comment.user_id)
            comment.text = data.get('text', comment.text)
            comment.parent_comment_id = data.get('parent_comment_id', comment.parent_comment_id)
            comment.created_at = datetime.strptime(data.get('created_at'), '%d/%m/%Y')

            db.session.commit()
            return jsonify({'message': 'Comment updated successfully'})
        else:
            return jsonify({'message': 'Comment not found'}), 404

    def delete(self, id):
        comment = Comment.query.get(id)
        if comment:      
            db.session.delete(comment)
            db.session.commit()
            return jsonify({'message': 'Comment deleted successfully'})
        else:
            return jsonify({'message': 'Comment not found'}), 404

# Add resources to routes
api.add_resource(UserResource, '/users', '/users/<int:id>')
api.add_resource(CommentResource, '/comments', '/comments/<int:id>')

@app.route('/')
def index():
    return f"<h1>TechVerse API</h1>"

class ContentResource(Resource):
    def get(self):
        contents = Content.query.all()
        return jsonify([{'id': content.id, 'title': content.title, 'description': content.description, 'type': content.type, 'category_id': content.category_id,'published_status': content.published_status,'user_id': content.user_id,'created_at': content.created_at,'updated_at': content.updated_at,} for content in contents])

    
    # @jwt_required()
    def post(self):
        # current_user = get_jwt_identity()
        # if current_user["role"] not in ["staff", "student"]:
        #     return jsonify({"error": "Only staff and students allowed to post"}), 403

        data = request.get_json()
        title = data.get('title')
        description = data.get('description')
        content_type = data.get('type')
        category_id = data.get('category_id')
        published_status = data.get("published_status") 
        user_id = data.get('user_ id')


        if not all([title, description, content_type, category_id]):
            return jsonify({"error": "Title, description, type, and category_id are required fields"}), 400

        # Get the user_id from the current_user
        # user_id = current_user.get('id')
        # user_id = data.get('id')

        # Create new content
        new_content = Content(
            title=title,
            user_id=user_id,
            description=description,
            type=content_type,
            category_id=category_id,
            # user_id=user_id,
            published_status=published_status,
            created_at=datetime.strptime(data.get('updated_at'), '%d/%m/%Y'),
            updated_at=datetime.strptime(data.get('updated_at'), '%d/%m/%Y')
        )
        db.session.add(new_content)
        db.session.commit()

        return jsonify({"message": "Content created successfully", "content_id": new_content.id})
    
    @jwt_required()
    def post_approve(self, id):
        current_user_role = get_jwt_identity().role

        if current_user_role not in ["admin", "staff"]:
            return jsonify({"error": "Unauthorized access"})

    # @jwt_required() 
    def delete(self, id):
        # current_user = get_jwt_identity()
        # if current_user["role"] not in ["staff", "student"]:
        #     return jsonify({"error": "Only staff and students can delete content"}), 403

        content = Content.query.get(id)
        if not content:
            return jsonify({"error": "Content not found"}), 404
        
        # Delete associated comments first
        for comment in content.comments:
            db.session.delete(comment)

        # Change the published_status to True
        content.published_status = True
        db.session.commit()

        return jsonify({"message": "Content approved successfully", "content_id": content.id})
    
    @jwt_required() 
    def delete(self, id):
        current_user_role = get_jwt_identity()["role"]
        if current_user_role != "admin":
            return jsonify({"error": "Unauthorized access"})

        content = Content.query.get(id)
        if not content:
            return jsonify({"error": "Content not found"}), 404
        
        # Delete associated comments first
        for comment in content.comments:
            db.session.delete(comment)

        db.session.delete(content)
        db.session.commit()

        return jsonify({"message": "Content deleted successfully"})  
        
    
api.add_resource(ContentResource, "/contents", "/contents/<int:id>","/contents/approve/<int:id>")

class ContentById(Resource):
    def get(self, id):
        content = Content.query.get(id)
        if content:
            return jsonify(content.to_dict())
        else:
            return jsonify({"message": "Content not found"}), 404
        
api.add_resource(ContentById, "/contents/<int:id>")

class ContentByTitle(Resource):
    def get(self):
        title = request.args.get('title')
        content = Content.query.filter(Content.title.ilike(f'%{title}')).all()
        if content:
            return jsonify([c.to_dict() for c in content])
        else:
            return jsonify({"message": "Content not found"}), 404
        
api.add_resource(ContentByTitle, "/contents/search")

class CategoryResource(Resource):
    def get(self):
        categories = Category.query.all()
        return jsonify([{'id': category.id, 'name': category.name} for category in categories])
    
    @jwt_required()
    def post(self):
        current_user_role = get_jwt_identity()["role"]
        
        if current_user_role not in ["admin", "staff"]:
            return jsonify({"error": "Unauthorized access"})
        
        data = request.get_json()
        name = data.get('name')
        if not name:
            return jsonify({"error": "Name is required."}), 400
        
        new_category = Category(name=name)
        db.session.add(new_category)
        db.session.commit()
        
        return jsonify({"message": "Category created successfully", "category_id": new_category.id})
    
    # @jwt_required()
    def put(self, id):
        # current_user = get_jwt_identity()
        # if current_user["role"] not in ["admin", "staff"]:
        #     return jsonify({"error": "Only admin and staff can update categories"}), 403
        
        category = Category.query.get(id)
        if not category:
            return jsonify({"error": "Category not found"}), 404
        
        data = request.get_json()
        name = data.get("name")
        if not name:
            return jsonify({"error": "Name is required to update category."}), 400
        
        category.name = name
        db.session.commit()
        
        return jsonify({"message": "Category updated successfully"})
    
    # @jwt_required()
    def delete(self, id):
        # current_user = get_jwt_identity()
        # if current_user["role"] not in ["admin", "staff"]:
        #     return jsonify({"error": "Only admin and staff can delete categories"}), 403
        
        category = Category.query.get(id)
        if not category:
            return jsonify({"error": "Category not found"}), 404
        
        db.session.delete(category)
        db.session.commit()
        
        return jsonify({"message": "Category deleted successfully"})
    
api.add_resource(CategoryResource, "/categories", "/categories/<int:id>")
        

#CRUD FOR SUBSCRIPTION
class SubscriptionResource(Resource):
    def get(self):
        subscriptions = Subscription.query.all()
        return jsonify([{'id': sub.id, 'user_id': sub.user_id, 'category_id': sub.category_id} for sub in subscriptions])

    @jwt_required()
    def post(self):
        current_user_role = get_jwt_identity()["role"]
        
        if current_user_role != "student":
            return jsonify({"error": "Unauthorized access"})

        data = request.get_json()
        user_id=data.get('user_id')
        category_id=data.get('category_id')
    
        new_subscription = Subscription(
            user_id=user_id,
            category_id=category_id, 
        )

        db.session.add(new_subscription)
        db.session.commit()
        return jsonify({'message': 'Subscription created successfully'})

    def put(self, id):
        subscription = Subscription.query.get(id)
        if subscription:
            data = request.json
            subscription.user_id = data.get('user_id', subscription.user_id)
            subscription.category_id = data.get('category_id', subscription.category_id)

            db.session.commit()
            return jsonify({'message': 'Subscription updated successfully'})
        else:
            return jsonify({'message': 'Subscrption not found'}), 404

    def delete(self, id):
        subscription = Subscription.query.get(id)
        if subscription:
            db.session.delete(subscription)
            db.session.commit()
            return jsonify({'message': 'Subscription deleted successfully'})
        else:
            return make_response(jsonify({'message': 'Subscription not found'}), 404)
            # return jsonify({'message': 'Subscription not found'}), 404
        
# Add resources to routes
api.add_resource(SubscriptionResource, '/subscriptions', '/subscriptions/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)