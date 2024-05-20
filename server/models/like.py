from sqlalchemy.orm import relationship
from .dbconfig import db

class Like(db.Model):
    __tablename__ = 'likes'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    content_id = db.Column(db.Integer, db.ForeignKey('contents.id'), nullable=False)
    like = db.Column(db.Boolean, nullable=False)

    user = relationship("User", back_populates="likes")
    content = relationship("Content", back_populates="likes")

    def __repr__(self):
        return f"<Like {self.id}, User {self.user_id}, Content {self.content_id}, Like {self.like}>"
