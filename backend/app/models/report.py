from sqlalchemy import Column, Integer, String, Text, Date, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.core.database import Base


class Report(Base):
    __tablename__ = "reports"

    id = Column(Integer, primary_key=True, index=True)
    jenis_jasa = Column(String(100), nullable=False)
    tanggal_permintaan = Column(Date, nullable=True)
    tenaga_produksi = Column(String(255), nullable=True)
    tanggal_laporan = Column(Date, nullable=True)
    nomor_laporan = Column(String(255), nullable=True)
    debitur = Column(String(255), nullable=True)
    master_bank_id = Column(Integer, ForeignKey("master_banks.id"), nullable=True)
    perbankan = Column(String(255), nullable=True)
    perihal_pekerjaan = Column(String(255), nullable=True)
    lokasi_objek = Column(Text, nullable=True)
    resi_pengiriman = Column(String(255), nullable=True)
    blok = Column(String(50), nullable=True)
    no_urut = Column(String(50), nullable=True)
    nama_file = Column(String(255), nullable=False)
    file_path = Column(Text, nullable=False)
    extracted_text = Column(Text, nullable=True)
    extraction_json = Column(Text, nullable=True)
    review_status = Column(String(50), nullable=False, default="draft")
    uploaded_by = Column(Integer, nullable=True)
    uploaded_at = Column(DateTime(timezone=True), server_default=func.now())
    reviewed_by = Column(Integer, nullable=True)
    reviewed_at = Column(DateTime(timezone=True), nullable=True)
    notes = Column(Text, nullable=True)
