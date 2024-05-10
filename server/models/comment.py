from sqlalchemy.orm import relationship
from .dbconfig import db

class Comment(db.Model):
    __tablename__ = 'comments'
    
    id = db.Column(db.Integer, primary_key=True)
    content_id = db.Column(db.Integer, db.ForeignKey('contents.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    text = db.Column(db.String(255), nullable=False)
    parent_comment_id = db.Column(db.Integer, db.ForeignKey('comments.id'))
    created_at = db.Column(db.DateTime, nullable=False)
    
    content = relationship("Content", back_populates="comments")
    user = relationship("User", back_populates="comments")
    replies = relationship("Comment", back_populates="parent_comment", remote_side=[id])
    parent_comment = relationship("Comment", back_populates="replies", remote_side=[id])
    