import Link from "next/link";
import { getReports } from "@/lib/api";
import ReportTable from "@/components/reports/ReportTable";

export default async function ReportsPage() {
  const response = await getReports();
  const items = response.data?.items ?? [];

  return (
    <main className="container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Data Laporan</h1>
          <p className="page-subtitle">Daftar laporan yang sudah diupload ke sistem.</p>
        </div>

        <div className="actions">
          <Link className="btn btn-primary" href="/reports/upload">
            Upload Laporan
          </Link>
        </div>
      </div>

      <ReportTable items={items} />
    </main>
  );
}