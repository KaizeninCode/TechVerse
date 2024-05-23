from .dbconfig import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import relationship


class Subscription(db.Model, SerializerMixin):
    __tablename__ = 'subscriptions'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)
    
    user = relationship("User", back_populates="subscriptions")
    category = relationship("Category", back_populates="subscriptions")
    
    def __repr__(self):
        return f"<Subscription {self.id}, user_id={self.user_id}, category_id={self.category_id}>"