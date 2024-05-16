from sqlalchemy.orm import relationship
from .dbconfig import db

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), nullable=False, unique=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(255), nullable=False, default="student")
    active_status = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)
    
    contents = relationship("Content", back_populates="user")
    comments = relationship("Comment", back_populates="user")
    subscriptions = relationship("Category", secondary="subscriptions", back_populates="subscribers")
    
    def __repr__(self):
        return f"<User {self.id}, {self.username}>"