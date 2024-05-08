from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    username = Column(String(255), nullable=False, unique=True)
    email = Column(String(255), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    role = Column(String(255), nullable=False)
    active_status = Column(Boolean, default=True)
    created_at = Column(DateTime, nullable=False)
    updated_at = Column(DateTime, nullable=False)
    
    contents = relationship("Content", back_populates="user")
    comments = relationship("Comment", back_populates="user")
    subscriptions = relationship("Category", secondary="subscriptions", back_populates="subscribers")
    