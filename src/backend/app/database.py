import os

from dotenv import load_dotenv

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base


# Load environment variables
load_dotenv()


# Get database URL from environment
DATABASE_URL = os.getenv("DATABASE_URL")


if not DATABASE_URL:
    raise RuntimeError(
        "DATABASE_URL environment variable is not configured."
    )


# Create database engine
engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,
)


# Create database session
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)


# Base class for SQLAlchemy models
Base = declarative_base()