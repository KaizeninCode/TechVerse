
from flask import Flask, request , session, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.dbconfig import db
from models.category import Category
from models.comment import Comment
from models.content import Content
from models.subscription import Subscription
from models.user import User

app = Flask(__name__)
api = Api(app)

@app.route('/')
def index():
    return f"<h1>TechVerse API</h1>"

class Contents(Resource):
    def get(self):
        contents_list = [content.to_dict() for content in Content.query.all()]
        return jsonify(contents_list)
    
    @jwt_required()  # Protect the endpoint with JWT authentication
    def post(self):
        current_user = get_jwt_identity()
        if current_user["role"] not in ["staff", "student"]:
            return jsonify({"error": "Only staff and students allowed to post"}), 403

        data = request.get_json()
        # Assuming 'title' and 'description' are required fields for creating content
        title = data.get('title')
        description = data.get('description')
        if not all([title, description]):
            return jsonify({"error": "Title and description are required fields"}), 400

        # Create new content
        new_content = Content(title=title, description=description)
        db.session.add(new_content)
        db.session.commit()

        return jsonify({"message": "Content created successfully", "content_id": new_content.id}), 201
    
    @jwt_required()  # Protect the endpoint with JWT authentication
    def delete(self, content_id):
        current_user = get_jwt_identity()
        if current_user["role"] not in ["staff", "student"]:
            return jsonify({"error": "Only staff and students can delete content"}), 403

        content = Content.query.get(content_id)
        if not content:
            return jsonify({"error": "Content not found"}), 404

        db.session.delete(content)
        db.session.commit()

        return jsonify({"message": "Content deleted successfully"}), 200
        
    
api.add_resource(Contents, "/contents")

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

if __name__ == "__main__":
    app.run(debug=True)
