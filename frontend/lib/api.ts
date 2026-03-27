import { ApiResponse, ReportDetail, ReportListItem, ReportTypeOption } from "@/types/report";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

async function parseResponse<T>(response: Response): Promise<ApiResponse<T>> {
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.detail || json.message || "Request gagal");
  }

  return json;
}

export async function getReportTypes() {
  const response = await fetch(`${API_BASE_URL}/api/master/report-types`, {
    cache: "no-store",
  });

  return parseResponse<ReportTypeOption[]>(response);
}

export async function getReports() {
  const response = await fetch(`${API_BASE_URL}/api/reports`, {
    cache: "no-store",
  });

  return parseResponse<{ items: ReportListItem[] }>(response);
}

export async function getReportDetail(id: string) {
  const response = await fetch(`${API_BASE_URL}/api/reports/${id}`, {
    cache: "no-store",
  });

  return parseResponse<ReportDetail>(response);
}

export async function uploadReport(formData: FormData) {
  const response = await fetch(`${API_BASE_URL}/api/reports/upload`, {
    method: "POST",
    body: formData,
  });

  return parseResponse<{
    id: number;
    jenis_jasa: string;
    nama_file: string;
    review_status: string;
  }>(response);
}

export async function updateReport(id: string, payload: Record<string, unknown>) {
  const response = await fetch(`${API_BASE_URL}/api/reports/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return parseResponse<{ id: number; review_status: string }>(response);
}