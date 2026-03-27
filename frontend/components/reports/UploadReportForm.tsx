"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { uploadReport } from "@/lib/api";
import { ReportTypeOption } from "@/types/report";

export default function UploadReportForm({ reportTypes }: { reportTypes: ReportTypeOption[] }) {
  const router = useRouter();
  const [jenisJasa, setJenisJasa] = useState(reportTypes[0]?.code || "");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!jenisJasa) {
      setError("Jenis jasa wajib dipilih.");
      return;
    }

    if (!file) {
      setError("File PDF wajib dipilih.");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("jenis_jasa", jenisJasa);
      formData.append("file", file);

      const response = await uploadReport(formData);
      router.push(`/reports/${response.data.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      {error ? <div className="error-box">{error}</div> : null}

      <div className="grid" style={{ gap: 20 }}>
        <div className="field">
          <label htmlFor="jenis_jasa">Jenis Jasa</label>
          <select
            id="jenis_jasa"
            className="select"
            value={jenisJasa}
            onChange={(e) => setJenisJasa(e.target.value)}
          >
            {reportTypes.map((item) => (
              <option key={item.code} value={item.code}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="file">Upload PDF</label>
          <input
            id="file"
            className="input"
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
          <span className="helper-text">Pilih file laporan dalam format PDF.</span>
        </div>

        <div className="actions">
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Mengupload..." : "Upload Laporan"}
          </button>
        </div>
      </div>
    </form>
  );
}