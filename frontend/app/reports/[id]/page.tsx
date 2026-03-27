import Link from "next/link";
import ReportReviewForm from "@/components/reports/ReportReviewForm";
import { getReportDetail, getReportTypes } from "@/lib/api";

export default async function ReportDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [reportResponse, reportTypesResponse] = await Promise.all([
    getReportDetail(params.id),
    getReportTypes(),
  ]);

  const report = reportResponse.data;
  const reportTypes = reportTypesResponse.data ?? [];

  return (
    <main className="container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Review Laporan #{report.id}</h1>
          <p className="page-subtitle">Review, edit, lalu simpan data laporan.</p>
        </div>

        <div className="actions">
          <Link className="btn btn-secondary" href="/reports">
            Kembali ke List
          </Link>
        </div>
      </div>

      <ReportReviewForm report={report} reportTypes={reportTypes} />
    </main>
  );
}