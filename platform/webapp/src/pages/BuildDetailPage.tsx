import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { buildsService } from "@/services/domains/builds";
import { functionsService } from "@/services/domains/functions";
import { certificatesService } from "@/services/domains/certificates";
import { dataOf, itemsOf } from "@/lib/envelope";

export function BuildDetailPage() {
  const { buildId = "" } = useParams();
  const qc = useQueryClient();
  const build = useQuery({
    queryKey: ["build", buildId],
    queryFn: () => buildsService.getBuild(buildId),
    enabled: Boolean(buildId),
  });
  const functions = useQuery({
    queryKey: ["functions", buildId],
    queryFn: () => functionsService.listFunctions(buildId),
    enabled: Boolean(buildId),
  });
  const certify = useMutation({
    mutationFn: () =>
      certificatesService.issueCertificate({ buildId, failClosed: true }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["certificates"] }),
  });

  const b = dataOf<any>(build.data) ?? (build.data as any);
  const fns = itemsOf(functions.data);

  return (
    <div>
      <h1 className="page-title">Build {buildId}</h1>
      <p className="page-sub">
        Per-function status with analyser and gas-schedule pins. Certification is
        distinct from optimisation hints.
      </p>
      {b ? (
        <div className="panel stamp" style={{ marginBottom: "1rem" }}>
          <div className="row" style={{ justifyContent: "space-between" }}>
            <div>
              <div className="mono">bytecode {b.bytecodeHash}</div>
              <div style={{ color: "var(--color-mute)", fontSize: "0.85rem" }}>
                analyser {b.analyserVersion} · schedule {b.gasScheduleVersion}
              </div>
            </div>
            <button
              className="btn"
              type="button"
              onClick={() => certify.mutate()}
              disabled={certify.isPending}
            >
              Issue certificate
            </button>
          </div>
          {certify.isSuccess ? (
            <p style={{ color: "var(--color-gauge)" }}>
              Certificate issued — see Certificates.
            </p>
          ) : null}
          {certify.isError ? (
            <p style={{ color: "var(--color-flag)" }}>
              {(certify.error as Error).message}
            </p>
          ) : null}
        </div>
      ) : null}
      <div className="panel">
        <table className="table">
          <thead>
            <tr>
              <th>Function</th>
              <th>Constant gas</th>
              <th>Analysis</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {fns.map((f: any) => (
              <tr key={f.id}>
                <td>
                  <Link to={`/functions/${f.id}`}>{f.name}</Link>
                  <div className="mono" style={{ fontSize: "0.75rem", color: "var(--color-mute)" }}>
                    {f.id}
                  </div>
                </td>
                <td>
                  {f.isConstantGas === false ? (
                    <span className="badge bad">non-constant</span>
                  ) : (
                    <span className="badge ok">constant</span>
                  )}
                </td>
                <td>{f.analysisStatus}</td>
                <td>
                  <Link to={`/functions/${f.id}`}>Bounds</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
