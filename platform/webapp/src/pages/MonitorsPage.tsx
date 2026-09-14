import { FormEvent, useState, type CSSProperties } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { monitorsService } from "@/services/domains/monitors";
import { itemsOf } from "@/lib/envelope";

export function MonitorsPage() {
  const qc = useQueryClient();
  const [certificateId, setCertificateId] = useState(
    "crt_01demo00000000000000000001"
  );
  const [metricName, setMetricName] = useState("slots.length");
  const [threshold, setThreshold] = useState("25");
  const list = useQuery({
    queryKey: ["monitors"],
    queryFn: () => monitorsService.listMonitors(),
  });
  const create = useMutation({
    mutationFn: () =>
      monitorsService.createMonitor({
        certificateId,
        metricName,
        threshold: Number(threshold),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["monitors"] }),
  });

  const items = itemsOf(list.data);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    create.mutate();
  }

  return (
    <div>
      <h1 className="page-title">Assumption monitors</h1>
      <p className="page-sub">
        Alert when live chain metrics approach certificate size assumptions
        before OOG.
      </p>
      <div className="panel" style={{ marginBottom: "1rem" }}>
        <form onSubmit={onSubmit} className="row" style={{ alignItems: "flex-end" }}>
          <div className="field" style={{ flex: 1, marginBottom: 0 }}>
            <label>Certificate</label>
            <input
              className="mono"
              value={certificateId}
              onChange={(e) => setCertificateId(e.target.value)}
            />
          </div>
          <div className="field" style={{ flex: 1, marginBottom: 0 }}>
            <label>Metric</label>
            <input value={metricName} onChange={(e) => setMetricName(e.target.value)} />
          </div>
          <div className="field" style={{ width: 100, marginBottom: 0 }}>
            <label>Threshold</label>
            <input value={threshold} onChange={(e) => setThreshold(e.target.value)} />
          </div>
          <button className="btn" type="submit">
            Create monitor
          </button>
        </form>
      </div>
      <div className="panel">
        <table className="table">
          <thead>
            <tr>
              <th>Monitor</th>
              <th>Metric</th>
              <th>Threshold</th>
              <th>Proximity</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {items.map((m: any) => (
              <tr key={m.id}>
                <td className="mono">{m.id}</td>
                <td>{m.metricName}</td>
                <td className="mono">{m.threshold}</td>
                <td>
                  <div
                    className="gauge-meter"
                    style={
                      {
                        "--needle": `${Math.min(80, (m.proximityRatio ?? 0) * 80)}deg`,
                      } as CSSProperties
                    }
                    role="img"
                    aria-label={`Proximity ${(m.proximityRatio ?? 0) * 100}%`}
                  />
                </td>
                <td>
                  <span
                    className={`badge ${
                      m.status === "breached"
                        ? "bad"
                        : m.status === "active"
                          ? "ok"
                          : "warn"
                    }`}
                  >
                    {m.status}
                  </span>
                </td>
              </tr>
            ))}
            {!items.length ? (
              <tr>
                <td colSpan={5} style={{ color: "var(--color-mute)" }}>
                  No monitors yet — attach certificate assumptions.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
