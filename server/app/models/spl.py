from sqlalchemy import Column, BigInteger, String, Text, TIMESTAMP
from app.database import Base

class SPL(Base):
    __tablename__ = "spl"

    spl_id = Column(BigInteger, primary_key=True)
    name = Column(String(200), nullable=False)
    github = Column(String(512))
    live = Column(String(512))
    mentor = Column(String(200))
    overview = Column(Text)
    banner = Column(String(512))
    created_at = Column(TIMESTAMP)
    updated_at = Column(TIMESTAMP)
    deleted_at = Column(TIMESTAMP)
