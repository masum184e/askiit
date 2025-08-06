from sqlalchemy import Column, String, Text, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base

class Student(Base):
    __tablename__ = "student"

    student_id = Column(String(20), primary_key=True)
    name = Column(String(200), nullable=False)
    email = Column(String(320), unique=True, nullable=False)
    mobile = Column(String(32), unique=True, nullable=True)
    session = Column(String(32), nullable=False)
    address = Column(Text, nullable=False)
    internship_company = Column(String(200), nullable=True)
    internship_technology = Column(String(200), nullable=True)
    codeforces_handle = Column(String(100), nullable=True)
    leetcode_handle = Column(String(100), nullable=True)
    image = Column(String(512), nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
    deleted_at = Column(DateTime(timezone=True), nullable=True)

    # Many-to-many with Achievement
    achievements = relationship(
        "Achievement",
        secondary="achievement_member",
        back_populates="students",
        lazy="selectin"
    )

    # Many-to-many with SPL
    spls = relationship(
        "SPL",
        secondary="spl_member",
        back_populates="students",
        lazy="selectin"
    )
