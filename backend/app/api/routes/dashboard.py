from fastapi import APIRouter
from app.schemas.common import ApiResponse

router = APIRouter()


@router.get("/summary", response_model=ApiResponse)
def get_dashboard_summary():
    return ApiResponse(
        success=True,
        message="OK",
        data={
            "total_reports": 0,
            "total_draft": 0,
            "total_extracted": 0,
            "total_reviewed": 0,
            "total_final": 0,
            "total_failed": 0,
        },
    )
