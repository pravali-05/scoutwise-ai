from fastapi import Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from app.auth.jwt_utils import decode_access_token
from app.auth.models import User
from app.database import SessionLocal


security = HTTPBearer()


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
) -> User:

    token = credentials.credentials

    if not token:
        raise HTTPException(
            status_code=401,
            detail="Token missing",
        )

    try:
        payload = decode_access_token(token)

        user_id = payload.get("sub")

        if not user_id:
            raise HTTPException(
                status_code=401,
                detail="Invalid token",
            )

        db = SessionLocal()

        try:
            user = (
                db.query(User)
                .filter(User.id == int(user_id))
                .first()
            )

            if not user:
                raise HTTPException(
                    status_code=401,
                    detail="User not found",
                )

            return user

        finally:
            db.close()

    except HTTPException:
        raise

    except Exception:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token",
        )