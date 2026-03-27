from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.report import Report
from app.models.bank import MasterBank, MasterBankAlias
from app.schemas.common import ApiResponse
from app.schemas.report import ReportUpdateRequest
from app.services.file_storage_service import save_pdf_file

router = APIRouter()


@router.post("/upload", response_model=ApiResponse)
def upload_report(
    file: UploadFile = File(...),
    jenis_jasa: str = Form(...),
    db: Session = Depends(get_db),
):
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="File harus PDF")

    original_name, full_path = save_pdf_file(file)

    report = Report(
        jenis_jasa=jenis_jasa,
        nama_file=original_name,
        file_path=full_path,
        review_status="draft",
    )
    db.add(report)
    db.commit()
    db.refresh(report)

    return ApiResponse(
        success=True,
        message="Upload berhasil",
        data={
            "id": report.id,
            "jenis_jasa": report.jenis_jasa,
            "nama_file": report.nama_file,
            "review_status": report.review_status,
            "uploaded_at": report.uploaded_at,
        },
    )


@router.get("", response_model=ApiResponse)
def list_reports(db: Session = Depends(get_db)):
    reports = db.query(Report).order_by(Report.id.desc()).all()
    items = []
    for r in reports:
        items.append(
            {
                "id": r.id,
                "jenis_jasa": r.jenis_jasa,
                "tanggal_laporan": r.tanggal_laporan,
                "nomor_laporan": r.nomor_laporan,
                "debitur": r.debitur,
                "perbankan": r.perbankan,
                "review_status": r.review_status,
                "nama_file": r.nama_file,
                "uploaded_at": r.uploaded_at,
            }
        )

    return ApiResponse(success=True, message="OK", data={"items": items})


@router.get("/{report_id}", response_model=ApiResponse)
def get_report_detail(report_id: int, db: Session = Depends(get_db)):
    report = db.query(Report).filter(Report.id == report_id).first()
    if not report:
        raise HTTPException(status_code=404, detail="Report tidak ditemukan")

    return ApiResponse(
        success=True,
        message="OK",
        data={
            "id": report.id,
            "jenis_jasa": report.jenis_jasa,
            "tanggal_permintaan": report.tanggal_permintaan,
            "tenaga_produksi": report.tenaga_produksi,
            "tanggal_laporan": report.tanggal_laporan,
            "nomor_laporan": report.nomor_laporan,
            "debitur": report.debitur,
            "master_bank_id": report.master_bank_id,
            "perbankan": report.perbankan,
            "perihal_pekerjaan": report.perihal_pekerjaan,
            "lokasi_objek": report.lokasi_objek,
            "resi_pengiriman": report.resi_pengiriman,
            "blok": report.blok,
            "no_urut": report.no_urut,
            "review_status": report.review_status,
            "nama_file": report.nama_file,
            "file_url": f"/{report.file_path}",
            "uploaded_at": report.uploaded_at,
            "reviewed_at": report.reviewed_at,
            "notes": report.notes,
        },
    )


@router.put("/{report_id}", response_model=ApiResponse)
def update_report(report_id: int, payload: ReportUpdateRequest, db: Session = Depends(get_db)):
    report = db.query(Report).filter(Report.id == report_id).first()
    if not report:
        raise HTTPException(status_code=404, detail="Report tidak ditemukan")

    if payload.save_mode == "final":
        required_fields = {
            "jenis_jasa": payload.jenis_jasa,
            "tanggal_laporan": payload.tanggal_laporan,
            "nomor_laporan": payload.nomor_laporan,
            "debitur": payload.debitur,
            "perbankan": payload.perbankan,
            "perihal_pekerjaan": payload.perihal_pekerjaan,
            "lokasi_objek": payload.lokasi_objek,
        }
        missing = [k for k, v in required_fields.items() if not v]
        if missing:
            raise HTTPException(
                status_code=422,
                detail=f"Field wajib belum lengkap: {', '.join(missing)}"
            )

    report.jenis_jasa = payload.jenis_jasa
    report.tanggal_permintaan = payload.tanggal_permintaan
    report.tenaga_produksi = payload.tenaga_produksi
    report.tanggal_laporan = payload.tanggal_laporan
    report.nomor_laporan = payload.nomor_laporan
    report.debitur = payload.debitur
    report.master_bank_id = payload.master_bank_id
    report.perbankan = payload.perbankan
    report.perihal_pekerjaan = payload.perihal_pekerjaan
    report.lokasi_objek = payload.lokasi_objek
    report.resi_pengiriman = payload.resi_pengiriman
    report.blok = payload.blok
    report.no_urut = payload.no_urut
    report.notes = payload.notes
    report.review_status = "final" if payload.save_mode == "final" else "reviewed"

    db.commit()
    db.refresh(report)

    return ApiResponse(
        success=True,
        message="Data berhasil disimpan",
        data={"id": report.id, "review_status": report.review_status},
    )