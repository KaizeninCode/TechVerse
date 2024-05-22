from sqlalchemy.orm import relationship
from .dbconfig import db
from datetime import datetime


class Content(db.Model):
    __tablename__ = 'contents'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    type = db.Column(db.String(255), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    published_status = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)
    

    user = relationship("User", back_populates="contents")
    comments = relationship(
        "Comment", back_populates="content", cascade="all, delete-orphan")
    category = relationship("Category", back_populates="contents")
    likes = relationship("Like", back_populates="content", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Content {self.id}, {self.title}>"
