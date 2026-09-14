import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { certificatesService } from "@/services/domains/certificates";
import { dataOf } from "@/lib/envelope";

export function CertificateDetailPage() {
  const { certificateId = "" } = useParams();
  const cert = useQuery({
    queryKey: ["certificate", certificateId],
    queryFn: () => certificatesService.getCertificate(certificateId),
    enabled: Boolean(certificateId),
  });
  const c = dataOf<any>(cert.data) ?? (cert.data as any);

  return (
    <div>
      <h1 className="page-title">Certificate viewer</h1>
      <p className="page-sub">
        Machine-verifiable bindings. Ceilgas wordmark seals every certificate
        view.
      </p>
      {c ? (
        <div className="panel stamp">
          <div className="brand" style={{ marginBottom: "1rem" }}>
            Ceilgas
            <small>certified gas ceiling</small>
          </div>
          <div className="field">
            <label>Status</label>
            <span
              className={`badge ${
                c.status === "certified"
                  ? "ok"
                  : c.status === "refused"
                    ? "bad"
                    : "warn"
              }`}
            >
              {c.status}
            </span>
          </div>
          <div className="field">
            <label>Bytecode hash</label>
            <div className="mono">{c.bytecodeHash}</div>
          </div>
          <div className="field">
            <label>Analyser version</label>
            <div className="mono">{c.analyserVersion}</div>
          </div>
          <div className="field">
            <label>Gas schedule</label>
            <div className="mono">{c.gasScheduleVersion}</div>
          </div>
          <div className="field">
            <label>Assumptions</label>
            <pre className="mono" style={{ fontSize: "0.85rem" }}>
              {JSON.stringify(c.assumptions ?? {}, null, 2)}
            </pre>
          </div>
          {c.refusedReason ? (
            <p style={{ color: "var(--color-flag)" }}>{c.refusedReason}</p>
          ) : null}
        </div>
      ) : (
        <p>Loading…</p>
      )}
    </div>
  );
}
