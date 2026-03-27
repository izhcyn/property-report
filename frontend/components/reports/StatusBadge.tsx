export default function StatusBadge({ status }: { status: string }) {
  const statusClassMap: Record<string, string> = {
    draft: "badge badge-draft",
    reviewed: "badge badge-reviewed",
    final: "badge badge-final",
    failed: "badge badge-failed",
  };

  return (
    <span className={statusClassMap[status] || "badge badge-reviewed"}>
      {status}
    </span>
  );
}