import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { buildsService } from "@/services/domains/builds";
import { boundsService } from "@/services/domains/bounds";
import { itemsOf } from "@/lib/envelope";

export function EngineeringHomePage() {
  const builds = useQuery({
    queryKey: ["builds"],
    queryFn: () => buildsService.listBuilds(),
  });
  const incompleteness = useQuery({
    queryKey: ["bounds", "incomplete"],
    queryFn: () => boundsService.listBounds({ incompletenessOnly: "true" }),
  });

  const items = itemsOf(builds.data);
  const incompleteItems = itemsOf(incompleteness.data);
  const completed = items.filter((b: any) => b.status === "completed").length;

  return (
    <div>
      <h1 className="page-title">Engineering home</h1>
      <p className="page-sub">
        Which public functions are certified, parametric, or incomplete — before
        we ship?
      </p>
      <div className="grid-stats">
        <div className="stat">
          <div className="label">Builds</div>
          <div className="value">{items.length}</div>
        </div>
        <div className="stat">
          <div className="label">Completed</div>
          <div className="value">{completed}</div>
        </div>
        <div className="stat">
          <div className="label">Incompleteness</div>
          <div className={`value${incompleteItems.length ? " flag" : ""}`}>
            {incompleteItems.length}
          </div>
        </div>
        <div className="stat">
          <div className="label">Coverage signal</div>
          <div className="value pressure">{items.length || "—"}</div>
        </div>
      </div>
      <div className="panel">
        <div
          className="row"
          style={{ justifyContent: "space-between", marginBottom: "0.75rem" }}
        >
          <strong>Recent builds</strong>
          <Link className="btn" to="/builds">
            Open builds
          </Link>
        </div>
        {builds.isLoading ? <p>Loading…</p> : null}
        {builds.isError ? (
          <p style={{ color: "var(--color-flag)" }}>
            {(builds.error as Error).message}
          </p>
        ) : null}
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Status</th>
              <th>Schedule</th>
              <th>CFG</th>
            </tr>
          </thead>
          <tbody>
            {items.map((b: any) => (
              <tr key={b.id}>
                <td>
                  <Link className="mono" to={`/builds/${b.id}`}>
                    {b.id}
                  </Link>
                </td>
                <td>
                  <span
                    className={`badge ${b.status === "completed" ? "ok" : "warn"}`}
                  >
                    {b.status}
                  </span>
                </td>
                <td className="mono">{b.gasScheduleVersion}</td>
                <td>{b.cfgComplete ? "complete" : "incomplete"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
