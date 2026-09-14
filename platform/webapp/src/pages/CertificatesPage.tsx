import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { certificatesService } from "@/services/domains/certificates";
import { itemsOf } from "@/lib/envelope";

export function CertificatesPage() {
  const list = useQuery({
    queryKey: ["certificates"],
    queryFn: () => certificatesService.listCertificates(),
  });
  const items = itemsOf(list.data);

  return (
    <div>
      <h1 className="page-title">Gas certificates</h1>
      <p className="page-sub">
        Bind bytecode hash, analyser version, gas-schedule version, and
        assumption set — reproducible forever (BR-7, BR-9).
      </p>
      <div className="panel">
        <table className="table">
          <thead>
            <tr>
              <th>Certificate</th>
              <th>Build</th>
              <th>Schedule</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {items.map((c: any) => (
              <tr key={c.id}>
                <td>
                  <Link className="mono" to={`/certificates/${c.id}`}>
                    {c.id}
                  </Link>
                </td>
                <td className="mono">{c.buildId}</td>
                <td className="mono">{c.gasScheduleVersion}</td>
                <td>
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
