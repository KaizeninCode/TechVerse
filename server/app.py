from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from werkzeug.datastructures import FileStorage
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, create_refresh_token, jwt_required, get_jwt_identity
from models.dbconfig import db
from models.category import Category
from models.comment import Comment
from models.content import Content
from models.subscription import Subscription
from models.user import User
import cloudinary
from cloudinary import uploader
import logging
import os
import cloudinary.api
from datetime import datetime
from dotenv import load_dotenv
load_dotenv()


app = Flask(__name__)
CORS(app,supports_credentials=True)
api = Api(app)




app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.config['JWT_SECRET_KEY'] = "e27c00e982d1d07709adb9eb"

# app.secret_key = "hgfedcba"
app.secret_key = "hgfedcba"

migrate = Migrate(app, db)

bcrypt = Bcrypt(app)

jwt = JWTManager(app)

db.init_app(app)

# Configure Cloudinary
cloudinary.config(
    cloud_name=os.getenv('CLOUD_NAME'),
    api_key=os.getenv('API_KEY'),
    api_secret=os.getenv('API_SECRET')
)

if not all([cloudinary.config().cloud_name, cloudinary.config().api_key, cloudinary.config().api_secret]):
    raise ValueError("No Cloudinary configuration found. Ensure CLOUD_NAME, API_KEY, and API_SECRET are set.")

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
    def get_user_contents(user_id):
        current_user = get_jwt_identity()
        if current_user["role"] != "admin" and current_user["id"] != user_id:
            return jsonify({"error": "Unauthorized access"}), 403

        contents = Content.query.filter_by(user_id=user_id).all()
        if not contents:
            return jsonify({"message": "No contents found for this user"}), 404

        return jsonify([{
            'id': content.id,
            'title': content.title,
            'description': content.description,
            'type': content.type,
            'category_id': content.category_id,
            'user_id': content.user_id,
            'published_status': content.published_status,
            'created_at': content.created_at,
            'updated_at': content.updated_at
        } for content in contents])

    def post(self):
        data = request.get_json()
        username = data.get('username')
        email = data.get('email')
        password_hash = data.get('password')  # Change variable name to 'password'
        role = data.get('role')

        if not all([username, email, password_hash, role]):  # Ensure all required fields are provided
            return jsonify({"error": "Username, email, password, and role are required fields"}), 400

        user_exists = User.query.filter_by(email=email).first()
        if user_exists:
            return jsonify({'error': 'User already exists'})

        hashed_password = bcrypt.generate_password_hash(password_hash)  # Generate password hash

        new_user = User(
            username=username,
            email=email,
            password_hash=hashed_password,
            role=role
        )

        db.session.add(new_user)
        db.session.commit()

        return jsonify({'message': 'User created successfully'})

    # @jwt_required()
    def put(self, id):
        # current_user = get_jwt_identity()
        
        # if not current_user:
        #     return jsonify({"error": "Unauthorized access"}), 401

        # current_user_role = current_user.get("role")
        
        # if current_user_role != "admin":
        #     return jsonify({"error": "Unauthorized access"}), 403

        user = User.query.get(id)
        if not user:
            return jsonify({'message': 'User not found'}), 404

        data = request.get_json()
        
        user.username = data.get('username', user.username)
        user.email = data.get('email', user.email)
        user.role = data.get('role', user.role)
        user.active_status = data.get('active_status', user.active_status)

        db.session.commit()

       

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
        
api.add_resource(UserResource, '/users', '/users/<int:id>')
        
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
            
            response = make_response(jsonify({
            'access_token': access_token,
            'id': user.id,
            'content': user.to_dict(),
            'username': user.username,
            'role': user.role,
            'refresh_token':refresh_token
            # Include user data in the response
        }), 200)
        
       
        if response:
         print(access_token)
         return response
        return jsonify({"message": "Invalid username or password"}), 401
    
api.add_resource(UserLoginResource, '/login')

        
#CRUD FOR COMMENTS
class CommentResource(Resource):
    def get(self, id=None):
        if id:
            comments = Comment.query.filter_by(user_id=id).all()
        else:
            comments = Comment.query.all()

        result = []
        for comment in comments:
            user = User.query.filter_by(id=comment.user_id).first()

            result.append({
                'id': comment.id,
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                } if user else None,
                'content_id': comment.content_id,
                'text': comment.text,
                'parent_comment_id': comment.parent_comment_id,
                'created_at': comment.created_at
            })

        return jsonify(result)

    # @jwt_required()
    def post(self):
        # current_user_role = get_jwt_identity()["role"]
        
        # if current_user_role != "student":
        #     return jsonify({"error": "Unauthorized access"})
        
        data = request.json
        print("Received data:", data)  # Debugging statement
        if 'user_id' not in data:
            return jsonify({"error": "user_id is missing"}), 400
        new_comment = Comment(
            content_id=data['content_id'],
            user_id=data['user_id'],
            text=data['text'],
            parent_comment_id='parent_comment_id',
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
            comment.created_at = datetime.strptime(data['created_at'], '%a, %d %b %Y %H:%M:%S GMT')

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

# api.add_resource(UserResource, '/users', methods=['GET'])
api.add_resource(CommentResource, '/comments', '/comments/<int:id>')

@app.route('/')
def index():
    return f"<h1>TechVerse API</h1>"

class ContentResource(Resource):
    def get(self):
        contents = Content.query.all()
        result = []
        for content in contents:
            user = User.query.filter_by(id=content.user_id).first()
            result.append({
                'id': content.id,
                'title': content.title,
                'description': content.description,
                'type': content.type,
                'category_id': content.category_id,
                'published_status': content.published_status,
                'user_id': user.username if user else None,
                'created_at': content.created_at,
                'updated_at': content.updated_at,
            })
        return jsonify(result)

    jwt_required()

    def post(self):
        app.logger.info(f"Form data: {request.form}")
        app.logger.info(f"Files: {request.files}")

        file_to_upload = request.files.get('file')
        title = request.form.get('title')
        description = request.form.get('description')
        content_type = request.form.get('type')  # Correctly retrieve type
        content_type = request.form.get('type')  # Correctly retrieve type
        category_id = request.form.get('category_id')
        user_id = request.form.get('user_id')
        published_status = request.form.get(
            'published_status', 'false').lower() in ['true', '1']
        category = Category.query.filter(category_id == Category.name).first()
<<<<<<< HEAD

=======
>>>>>>> 4e58475 ({Feat}: "Implemented the comment section a user ")
        app.logger.info(
            f"Received data: title={title}, description={description}, type={content_type}, category_id={category.id}, user_id={user_id}")

        # Check for missing fields and log them
        missing_fields = []
        if not title:
            missing_fields.append("title")
        if not description:
            missing_fields.append("description")
        if not content_type:
            missing_fields.append("type")
        if not category_id:
            missing_fields.append("category_id")
        if not file_to_upload:
            missing_fields.append("file")

        if missing_fields:
            app.logger.error(f"Missing fields: {missing_fields}")
            return {"error": f"Missing fields: {', '.join(missing_fields)}"}, 400
        # Check for missing fields and log them
        missing_fields = []
        if not title:
            missing_fields.append("title")
        if not description:
            missing_fields.append("description")
        if not content_type:
            missing_fields.append("type")
        if not category_id:
            missing_fields.append("category_id")
        if not file_to_upload:
            missing_fields.append("file")

        if missing_fields:
            app.logger.error(f"Missing fields: {missing_fields}")
            return {"error": f"Missing fields: {', '.join(missing_fields)}"}, 400

        try:
            if content_type == 'video':
                upload_result = uploader.upload(
                    file_to_upload, resource_type='video')
            else:
                upload_result = uploader.upload(file_to_upload)
        except Exception as e:
            app.logger.error(f"Error uploading file to Cloudinary: {e}")
            return {"error": "File upload failed"}, 500

        app.logger.info(upload_result)
        file_url = upload_result['url']

        file_url = upload_result.get('url')

        try:
            new_content = Content(
                title=title,
                description=description,
<<<<<<< HEAD
                type=file_url,
=======
                type=file_url,  # Save the file URL instead of the file object
>>>>>>> 4e58475 ({Feat}: "Implemented the comment section a user ")
                category_id=category.id,
                user_id=user_id,
                published_status=published_status,
                created_at=datetime.utcnow(),
                updated_at=datetime.utcnow()
            )
            db.session.add(new_content)
            db.session.commit()
        except Exception as e:
            app.logger.error(f"Error saving content to database: {e}")
            return {"error": "Content creation failed"}, 500

        return {
            "message": "Content uploaded and created successfully",
            "content_id": new_content.id,
            "upload_result": upload_result
        }, 201

<<<<<<< HEAD
=======
        

    
>>>>>>> 4e58475 ({Feat}: "Implemented the comment section a user ")
    @jwt_required()
    def post_approve(self, id):
        current_user_role = get_jwt_identity()["role"]

        if current_user_role not in ["admin", "staff"]:
            return jsonify({"error": "Unauthorized access"})
        
        content = Content.query.get(id)

    @jwt_required() 
    def delete(self, id):
        current_user = get_jwt_identity()["role"]
        if current_user["role"] not in ["admin", "staff"]:
            return jsonify({"error": "Only staff and students can delete content"}), 403

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
        
    
api.add_resource(ContentResource, "/contents", "/contents/<int:id>")

class ContentById(Resource):
    def get(self, id):
        content = Content.query.get(id)
        if content:
            return jsonify(content.to_dict())
        else:
            return jsonify({"message": "Content not found"}), 404
        
api.add_resource(ContentById, "/contents/<int:id>")

class ContentByTitle(Resource):
    @jwt_required()
    def get(self):
        title = request.args.get('title')
        if not title:
            return jsonify({"error": "Title parameter is required"}), 400

        content = Content.query.filter_by(title=={title}).all()
        if content:
            content_list = []
            for c in content:
                content_list.append({
                    "id": c.id,
                    "title": c.title,
                    "description": c.description,
                    "type": c.type,
                    "category_id": c.category_id,
                    "user_id": c.user_id,
                    "published_status": c.published_status,
                    "created_at": c.created_at.strftime('%d/%m/%Y'),
                    "updated_at": c.updated_at.strftime('%d/%m/%Y')
                })
            return jsonify(content_list), 200
        else:
            return jsonify({"message": "Content not found"}), 404

api.add_resource(ContentByTitle, "/contents/search")

#Content approval
class ContentApprovalResource(Resource):
    @jwt_required()
    def put(self, id):
        current_user_role = get_jwt_identity()["role"]

        if current_user_role not in ["admin", "staff"]:
            return jsonify({"error": "Unauthorized access"}), 403

        content = Content.query.get(id)

        if not content:
            return jsonify({"error": "Content not found"}), 404

        content.published_status = True
        db.session.commit()

        return jsonify({"message": "Content approved successfully"}), 200
    
api.add_resource(ContentApprovalResource, "/contents/approve/<int:id>")

class CategoryResource(Resource):
    def get(self):
        categories = Category.query.all()
        return jsonify([{'id': category.id, 'name': category.name} for category in categories])
    
    #@jwt_required()
    def post(self):
       
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
        category=Category.query.filter(category_id==Category.name).first()
        new_subscription = Subscription(
            user_id=user_id,
            category_id=category.id, 
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