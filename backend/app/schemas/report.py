from datetime import date, datetime
from typing import Optional
from pydantic import BaseModel, Field


class ReportUploadResponse(BaseModel):
    id: int
    jenis_jasa: str
    nama_file: str
    review_status: str
    uploaded_at: Optional[datetime] = None


class ReportUpdateRequest(BaseModel):
    jenis_jasa: str
    tanggal_permintaan: Optional[date] = None
    tenaga_produksi: Optional[str] = None
    tanggal_laporan: Optional[date] = None
    nomor_laporan: Optional[str] = None
    debitur: Optional[str] = None
    master_bank_id: Optional[int] = None
    perbankan: Optional[str] = None
    perihal_pekerjaan: Optional[str] = None
    lokasi_objek: Optional[str] = None
    resi_pengiriman: Optional[str] = None
    blok: Optional[str] = None
    no_urut: Optional[str] = None
    notes: Optional[str] = None
    save_mode: str = Field(pattern="^(draft|final)$")


class ReportDetailResponse(BaseModel):
    id: int
    jenis_jasa: str
    tanggal_permintaan: Optional[date] = None
    tenaga_produksi: Optional[str] = None
    tanggal_laporan: Optional[date] = None
    nomor_laporan: Optional[str] = None
    debitur: Optional[str] = None
    master_bank_id: Optional[int] = None
    perbankan: Optional[str] = None
    perihal_pekerjaan: Optional[str] = None
    lokasi_objek: Optional[str] = None
    resi_pengiriman: Optional[str] = None
    blok: Optional[str] = None
    no_urut: Optional[str] = None
    review_status: str
    nama_file: str
    file_url: Optional[str] = None
    uploaded_at: Optional[datetime] = None
    reviewed_at: Optional[datetime] = None
    notes: Optional[str] = None

    class Config:
        from_attributes = True
