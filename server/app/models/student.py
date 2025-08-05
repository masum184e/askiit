from sqlalchemy import Column, BigInteger, String, Text, TIMESTAMP
from app.database import Base

class Student(Base):
    __tablename__ = "student"

    student_id = Column(BigInteger, primary_key=True)
    name = Column(String(200), nullable=False)
    email = Column(String(320), nullable=False, unique=True)
    whatsapp = Column(String(32), unique=True)
    session = Column(String(32))
    address = Column(Text)
    internship_company = Column(String(200))
    internship_technology = Column(String(200))
    created_at = Column(TIMESTAMP)
    updated_at = Column(TIMESTAMP)
    deleted_at = Column(TIMESTAMP)
