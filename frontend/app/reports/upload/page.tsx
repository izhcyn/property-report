import UploadReportForm from "@/components/reports/UploadReportForm";
import { getReportTypes } from "@/lib/api";

export default async function UploadPage() {
  const response = await getReportTypes();
  const reportTypes = response.data ?? [];

  return (
    <main className="container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Upload Laporan</h1>
          <p className="page-subtitle">
            Pilih jenis jasa lalu upload file PDF laporan.
          </p>
        </div>
      </div>

      <UploadReportForm reportTypes={reportTypes} />
    </main>
  );
}