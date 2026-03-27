from fastapi import APIRouter
from app.schemas.common import ApiResponse

router = APIRouter()


@router.get("/report-types", response_model=ApiResponse)
def get_report_types():
    items = [
        {"code": "LPA_LPPP", "label": "LPA/LPPP"},
        {"code": "PENILAIAN_PROPERTI_TERINCI", "label": "Penilaian Properti (Lprn Terinci)"},
        {"code": "PENILAIAN_PROPERTI_RINGKAS", "label": "Penilaian Properti (Lprn Ringkas)"},
        {"code": "RESUME_LAPORAN", "label": "Resume Laporan"},
        {"code": "LAPORAN_TAKSASI", "label": "Laporan Taksasi"},
        {"code": "MANAGEMENT_STOCK", "label": "Management Stock"},
        {"code": "STUDI_KELAYAKAN", "label": "Laporan Studi Kelayakan"},
        {"code": "TAKSASI_AWAL", "label": "Taksasi Awal"},
    ]
    return ApiResponse(success=True, message="OK", data=items)


@router.get("/banks", response_model=ApiResponse)
def get_banks():
    items = [
        {
            "id": 1,
            "bank_code": "BTN_CIBINONG_KONVEN",
            "bank_name": "BTN",
            "branch_name": "Cibinong Konven",
            "display_name": "BTN_Cibinong Konven",
        }
    ]
    return ApiResponse(success=True, message="OK", data={"items": items})