from sqlalchemy import Column, BigInteger, String, Text, DateTime, ForeignKey, Table
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base

# Association table between SPL and Student
spl_member = Table(
    "spl_member",
    Base.metadata,
    Column("spl_id", BigInteger, ForeignKey("spl.spl_id"), primary_key=True),
    Column("student_id", String(20), ForeignKey("student.student_id"), primary_key=True),
)

class SPL(Base):
    __tablename__ = "spl"

    spl_id = Column(BigInteger, primary_key=True, autoincrement=True)
    name = Column(String(200), nullable=False)
    github = Column(String(512), nullable=False)
    live = Column(String(512), nullable=True)
    mentor = Column(String(200), nullable=False)
    categories = Column(String(10), nullable=False)
    description = Column(Text, nullable=False)
    banner = Column(String(512), nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
    deleted_at = Column(DateTime(timezone=True), nullable=True)

    # Relationship with students
    students = relationship(
        "Student",
        secondary=spl_member,
        back_populates="spls",
        lazy="selectin"
    )
