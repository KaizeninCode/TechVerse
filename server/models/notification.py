from .dbconfig import db
from sqlalchemy.orm import relationship
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime

class Notification(db.Model, SerializerMixin):
    __tablename__ = 'notifications'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    content_id = db.Column(db.Integer, db.ForeignKey('contents.id'), nullable=True)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=True)
    type = db.Column(db.String(50), nullable=False) # i.e liked, disliked, or new_content
    created_at = db.Column(db.DateTime, default=datetime.now)
    read = db.Column(db.Boolean, default=False)
    
    user = relationship("User", back_populates="notifications")
    content = relationship("Content", back_populates="notifications")
    category = relationship("Category", back_populates="notifications")
    
    def __repr__(self):
        return f"<Notification {self.id}, User {self.user_id}, Type {self.type}, Read {self.read}>"
