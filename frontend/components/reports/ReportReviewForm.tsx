"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ReportDetail, ReportTypeOption } from "@/types/report";
import { updateReport } from "@/lib/api";

type FormState = {
  jenis_jasa: string;
  tanggal_permintaan: string;
  tenaga_produksi: string;
  tanggal_laporan: string;
  nomor_laporan: string;
  debitur: string;
  master_bank_id: string;
  perbankan: string;
  perihal_pekerjaan: string;
  lokasi_objek: string;
  resi_pengiriman: string;
  blok: string;
  no_urut: string;
  notes: string;
};

function toInputValue(value: string | null) {
  return value ?? "";
}

export default function ReportReviewForm({
  report,
  reportTypes,
}: {
  report: ReportDetail;
  reportTypes: ReportTypeOption[];
}) {
  const router = useRouter();

  const initialState = useMemo<FormState>(
    () => ({
      jenis_jasa: report.jenis_jasa || "",
      tanggal_permintaan: toInputValue(report.tanggal_permintaan),
      tenaga_produksi: toInputValue(report.tenaga_produksi),
      tanggal_laporan: toInputValue(report.tanggal_laporan),
      nomor_laporan: toInputValue(report.nomor_laporan),
      debitur: toInputValue(report.debitur),
      master_bank_id: report.master_bank_id ? String(report.master_bank_id) : "",
      perbankan: toInputValue(report.perbankan),
      perihal_pekerjaan: toInputValue(report.perihal_pekerjaan),
      lokasi_objek: toInputValue(report.lokasi_objek),
      resi_pengiriman: toInputValue(report.resi_pengiriman),
      blok: toInputValue(report.blok),
      no_urut: toInputValue(report.no_urut),
      notes: toInputValue(report.notes),
    }),
    [report]
  );

  const [form, setForm] = useState<FormState>(initialState);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(saveMode: "draft" | "final") {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await updateReport(String(report.id), {
        jenis_jasa: form.jenis_jasa,
        tanggal_permintaan: form.tanggal_permintaan || null,
        tenaga_produksi: form.tenaga_produksi || null,
        tanggal_laporan: form.tanggal_laporan || null,
        nomor_laporan: form.nomor_laporan || null,
        debitur: form.debitur || null,
        master_bank_id: form.master_bank_id ? Number(form.master_bank_id) : null,
        perbankan: form.perbankan || null,
        perihal_pekerjaan: form.perihal_pekerjaan || null,
        lokasi_objek: form.lokasi_objek || null,
        resi_pengiriman: form.resi_pengiriman || null,
        blok: form.blok || null,
        no_urut: form.no_urut || null,
        notes: form.notes || null,
        save_mode: saveMode,
      });

      setSuccess(saveMode === "final" ? "Data berhasil disimpan final." : "Draft berhasil disimpan.");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menyimpan data");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid grid-2">
      <div className="card">
        <h3 style={{ marginTop: 0 }}>Preview PDF</h3>
        <div className="pdf-box">
          <p><strong>Nama file:</strong> {report.nama_file}</p>
          <p><strong>Lokasi file:</strong> {report.file_url || "-"}</p>
          <p className="helper-text">
            Untuk tahap awal, preview PDF belum di-embed. Nanti bisa ditingkatkan pakai iframe atau PDF viewer.
          </p>
        </div>
      </div>

      <div className="card">
        <h3 style={{ marginTop: 0 }}>Form Review</h3>

        {error ? <div className="error-box">{error}</div> : null}
        {success ? <div className="success-box">{success}</div> : null}

        <div className="grid" style={{ gap: 16 }}>
          <div className="field">
            <label>Jenis Jasa</label>
            <select
              className="select"
              value={form.jenis_jasa}
              onChange={(e) => updateField("jenis_jasa", e.target.value)}
            >
              {reportTypes.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label>Tgl Permintaan / Stempel</label>
            <input
              className="input"
              type="date"
              value={form.tanggal_permintaan}
              onChange={(e) => updateField("tanggal_permintaan", e.target.value)}
            />
          </div>

          <div className="field">
            <label>Tenaga Produksi / Inspeksi</label>
            <input
              className="input"
              value={form.tenaga_produksi}
              onChange={(e) => updateField("tenaga_produksi", e.target.value)}
            />
          </div>

          <div className="field">
            <label>Tgl Laporan</label>
            <input
              className="input"
              type="date"
              value={form.tanggal_laporan}
              onChange={(e) => updateField("tanggal_laporan", e.target.value)}
            />
          </div>

          <div className="field">
            <label>No Laporan</label>
            <input
              className="input"
              value={form.nomor_laporan}
              onChange={(e) => updateField("nomor_laporan", e.target.value)}
            />
          </div>

          <div className="field">
            <label>Pemberi Tugas / Debitur</label>
            <input
              className="input"
              value={form.debitur}
              onChange={(e) => updateField("debitur", e.target.value)}
            />
          </div>

          <div className="field">
            <label>Perbankan</label>
            <input
              className="input"
              value={form.perbankan}
              onChange={(e) => updateField("perbankan", e.target.value)}
            />
          </div>

          <div className="field">
            <label>Perihal / Nama Pekerjaan</label>
            <input
              className="input"
              value={form.perihal_pekerjaan}
              onChange={(e) => updateField("perihal_pekerjaan", e.target.value)}
            />
          </div>

          <div className="field">
            <label>Lokasi Objek Pekerjaan</label>
            <textarea
              className="textarea"
              value={form.lokasi_objek}
              onChange={(e) => updateField("lokasi_objek", e.target.value)}
            />
          </div>

          <div className="field">
            <label>Resi Pengiriman</label>
            <input
              className="input"
              value={form.resi_pengiriman}
              onChange={(e) => updateField("resi_pengiriman", e.target.value)}
            />
          </div>

          <div className="grid grid-2">
            <div className="field">
              <label>Blok</label>
              <input
                className="input"
                value={form.blok}
                onChange={(e) => updateField("blok", e.target.value)}
              />
            </div>

            <div className="field">
              <label>No Urut</label>
              <input
                className="input"
                value={form.no_urut}
                onChange={(e) => updateField("no_urut", e.target.value)}
              />
            </div>
          </div>

          <div className="field">
            <label>Catatan</label>
            <textarea
              className="textarea"
              value={form.notes}
              onChange={(e) => updateField("notes", e.target.value)}
            />
          </div>

          <div className="actions">
            <button
              className="btn btn-secondary"
              type="button"
              disabled={loading}
              onClick={() => handleSubmit("draft")}
            >
              {loading ? "Menyimpan..." : "Simpan Draft"}
            </button>
            <button
              className="btn btn-primary"
              type="button"
              disabled={loading}
              onClick={() => handleSubmit("final")}
            >
              {loading ? "Menyimpan..." : "Simpan Final"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}