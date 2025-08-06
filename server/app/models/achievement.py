from sqlalchemy import Column, BigInteger, String, Text, DateTime, ForeignKey, Table
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base

# Association table between Achievement and Student
achievement_member = Table(
    "achievement_member",
    Base.metadata,
    Column("achievement_id", BigInteger, ForeignKey("achievement.achievement_id"), primary_key=True),
    Column("student_id", String(20), ForeignKey("student.student_id"), primary_key=True),
)

class Achievement(Base):
    __tablename__ = 'achievement'

    achievement_id = Column(BigInteger, primary_key=True, autoincrement=True)
    competition_name = Column(String(200), nullable=False)
    position = Column(String(50))
    description = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
    deleted_at = Column(DateTime(timezone=True), nullable=True)

    # Relationships with students
    students = relationship(
        "Student",
        secondary=achievement_member,
        back_populates="achievements",
        lazy="selectin"
    )
