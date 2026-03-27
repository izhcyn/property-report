import Link from "next/link";
import { ReportListItem } from "@/types/report";
import StatusBadge from "./StatusBadge";

export default function ReportTable({ items = [] }: { items?: ReportListItem[] }) {
  return (
    <div className="card table-wrap">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Jenis Jasa</th>
            <th>Tgl Laporan</th>
            <th>No Laporan</th>
            <th>Debitur</th>
            <th>Perbankan</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan={8}>Belum ada data laporan.</td>
            </tr>
          ) : (
            items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.jenis_jasa}</td>
                <td>{item.tanggal_laporan || "-"}</td>
                <td>{item.nomor_laporan || "-"}</td>
                <td>{item.debitur || "-"}</td>
                <td>{item.perbankan || "-"}</td>
                <td>
                  <StatusBadge status={item.review_status} />
                </td>
                <td>
                  <Link href={`/reports/${item.id}`}>Detail / Edit</Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}