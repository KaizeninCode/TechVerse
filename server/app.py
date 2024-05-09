from flask import Flask, request , session, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from models import db, User, Comment
from flask_restful import Api, Resource

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

migrate = Migrate(app, db)
db.init_app(app)
api = Api(app)

#CRUD FOR USER
class User(Resource):
    def get(self):
        users = User.query.all()
        return jsonify([{'id': user.id, 'username': user.username, 'role': user.role, 'active_status': user.active_status, 'created_at': user.created_at, 'updated_at': user.updated_at} for user in users])

    def post(self):
        data = request.json
        new_user = User(
            username=data['username'],
            role=data['role'],
            active_status=data['active_status'],
            created_at=data['created_at'],
            updated_at=data['updated_at']
        )
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'User created successfully'}), 201

    def put(self, id):
        user = User.query.get(id)
        if user:
            data = request.json
            user.username = data.get('username', user.username)
            user.role = data.get('role', user.role)
            user.active_status = data.get('active_status', user.active_status)
            user.created_at = data.get('created_at', user.created_at)
            user.updated_at = data.get('updated_at', user.updated_at)
            db.session.commit()
            return jsonify({'message': 'User updated successfully'})
        else:
            return jsonify({'message': 'User not found'}), 404

    def delete(self, id):
        user = User.query.get(id)
        if user:
            db.session.delete(user)
            db.session.commit()
            return jsonify({'message': 'User deleted successfully'})
        else:
            return jsonify({'message': 'User not found'}), 404
        
#CRUD FOR COMMENTS
class Comment(Resource):
    def get(self):
        comments = Comment.query.all()
        return jsonify([{'id': comment.id, 'content_id': comment.content_id, 'text': comment.text, 'parent_comment_id': comment.parent_comment_id, 'created_at': comment.created_at} for comment in comments])

    def post(self):
        data = request.json
        new_comment = Comment(
            content_id=data['content_id'],
            user_id=data['user_id'],
            text=data['text'],
            parent_comment_id=data['parent_comment_id'],
            created_at=data['created_at']
        )
        db.session.add(new_comment)
        db.session.commit()
        return jsonify({'message': 'Comment created successfully'}), 201

    def put(self, id):
        comment = Comment.query.get(id)
        if comment:
            data = request.json
            comment.content_id = data.get('content_id', comment.content_id)
            comment.user_id = data.get('user_id', comment.user_id)
            comment.text = data.get('text', comment.text)
            comment.parent_comment_id = data.get('parent_comment_id', comment.parent_comment_id)
            comment.created_at = data.get('created_at', comment.created_at)
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
api.add_resource(User, '/users', '/users/<int:id>')
api.add_resource(Comment, '/comments', '/comments/<int:id>')

if __name__ == '__main__':
    app.run(debug=True)
