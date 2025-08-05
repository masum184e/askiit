from sqlalchemy import Column, BigInteger, String, Text, TIMESTAMP
from app.database import Base

class Achievement(Base):
    __tablename__ = "achievement"

    achievement_id = Column(BigInteger, primary_key=True)
    competition_name = Column(String(200), nullable=False)
    position = Column(String(50))
    overview = Column(Text)
    created_at = Column(TIMESTAMP)
    updated_at = Column(TIMESTAMP)
    deleted_at = Column(TIMESTAMP)
