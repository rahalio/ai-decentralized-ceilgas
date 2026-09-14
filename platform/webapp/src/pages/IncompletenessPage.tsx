import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { boundsService } from "@/services/domains/bounds";
import { itemsOf } from "@/lib/envelope";

export function IncompletenessPage() {
  const list = useQuery({
    queryKey: ["bounds", "all"],
    queryFn: () => boundsService.listBounds(),
  });
  const items = itemsOf(list.data).filter(
    (b: any) => b.incompletenessClass && b.incompletenessClass !== "none"
  );

  return (
    <div>
      <h1 className="page-title">Incompleteness register</h1>
      <p className="page-sub">
        Don’t-know, ranking-function, cover-point, maximization, timeout — never
        collapsed to “analysed = safe”.
      </p>
      <div className={`panel${items.length ? " hatch" : ""}`}>
        {!items.length ? (
          <p style={{ color: "var(--color-gauge)" }}>
            Full closed-form coverage on current bounds.
          </p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Bound</th>
                <th>Function</th>
                <th>Class</th>
                <th>Note</th>
              </tr>
            </thead>
            <tbody>
              {items.map((b: any) => (
                <tr key={b.id}>
                  <td className="mono">{b.id}</td>
                  <td>
                    <Link className="mono" to={`/functions/${b.functionId}`}>
                      {b.functionId}
                    </Link>
                  </td>
                  <td>
                    <span className="badge incomplete">{b.incompletenessClass}</span>
                  </td>
                  <td>{b.residualRiskNote ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
