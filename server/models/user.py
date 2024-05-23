from sqlalchemy.orm import relationship
from .dbconfig import db
from sqlalchemy_serializer import SerializerMixin

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), unique=True)
    email = db.Column(db.String(255), unique=True)
    password_hash = db.Column(db.String(255))
    role = db.Column(db.String(255), nullable=False)
    active_status = db.Column(db.Boolean, default=True)
    created_at = db.Column(
        db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(),onupdate=db.func.now())
    
    contents = relationship("Content", back_populates="user")
    comments = relationship("Comment", back_populates="user")
    subscriptions = relationship("Category", secondary="subscriptions", back_populates="subscribers")
    likes = relationship("Like", back_populates="user")
    
    def __repr__(self):
        return f"<User {self.id}, {self.username}>"