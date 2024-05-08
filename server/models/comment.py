from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()
class Comment(Base):
    __tablename__ = 'comments'
    
    id = Column(Integer, primary_key=True)
    content_id = Column(Integer, ForeignKey('contents.id'), nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'))
    text = Column(String(255), nullable=False)
    parent_comment_id = Column(Integer, ForeignKey('comments.id'))
    created_at = Column(DateTime, nullable=False)
    
    content = relationship("Content", back_populates="comments")
    user = relationship("User", back_populates="comments")
    replies = relationship("Comment", back_populates="parent_comment", remote_side=[id])
    parent_comment = relationship("Comment", back_populates="replies", remote_side=[id])
    