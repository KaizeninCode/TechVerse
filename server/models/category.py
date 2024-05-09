from sqlalchemy.orm import relationship
from .dbconfig import db

class Category(db.Model):
    __tablename__ = 'categories'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    
    contents = relationship("Content", back_populates="category")
    subscribers = relationship("User", secondary="subscriptions", back_populates="subscriptions")
    