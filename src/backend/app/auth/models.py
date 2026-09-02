from sqlalchemy import Column, Integer, String
from app.database import Base
from sqlalchemy import Text, ForeignKey


class JobAnalysis(Base):
    __tablename__ = "job_analyses"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    job_title = Column(String, nullable=True)
    company_name = Column(String, nullable=True)
    location = Column(String, nullable=True)

    risk_score = Column(String, nullable=True)
    status = Column(String, nullable=True)

    ats_score = Column(Integer, nullable=True)

    job_description = Column(Text, nullable=True)
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)

    email = Column(
        String,
        unique=True,
        index=True,
        nullable=False
    )

    password = Column(
        String,
        nullable=False
    )