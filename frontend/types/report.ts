export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type ReportListItem = {
  id: number;
  jenis_jasa: string;
  tanggal_laporan: string | null;
  nomor_laporan: string | null;
  debitur: string | null;
  perbankan: string | null;
  review_status: string;
  nama_file: string;
  uploaded_at: string | null;
};

export type ReportDetail = {
  id: number;
  jenis_jasa: string;
  tanggal_permintaan: string | null;
  tenaga_produksi: string | null;
  tanggal_laporan: string | null;
  nomor_laporan: string | null;
  debitur: string | null;
  master_bank_id: number | null;
  perbankan: string | null;
  perihal_pekerjaan: string | null;
  lokasi_objek: string | null;
  resi_pengiriman: string | null;
  blok: string | null;
  no_urut: string | null;
  review_status: string;
  nama_file: string;
  file_url: string | null;
  uploaded_at: string | null;
  reviewed_at: string | null;
  notes: string | null;
};

export type ReportTypeOption = {
  code: string;
  label: string;
};