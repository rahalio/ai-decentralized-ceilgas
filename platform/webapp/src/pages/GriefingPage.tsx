import { FormEvent, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { griefingService } from "@/services/domains/griefing";
import { itemsOf, dataOf } from "@/lib/envelope";

export function GriefingPage() {
  const role = localStorage.getItem("ceilgas_role") ?? "viewer";
  const authorised = role === "admin" || role === "auditor";
  const qc = useQueryClient();
  const [functionId, setFunctionId] = useState("fnc_01demo00000000000000000001");
  const list = useQuery({
    queryKey: ["griefing"],
    queryFn: () => griefingService.listEstimates(),
    enabled: authorised,
  });
  const create = useMutation({
    mutationFn: () =>
      griefingService.createEstimate({
        functionId,
        notes: "Authorised adversarial estimate",
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["griefing"] }),
  });

  if (!authorised) {
    return (
      <div>
        <h1 className="page-title">Griefing-cost estimate</h1>
        <div className="panel">
          <p style={{ color: "var(--color-flag)" }}>
            Access denied. Adversarial analytics are role-gated (BR-11). Values
            are not soft-hidden in the URL.
          </p>
        </div>
      </div>
    );
  }

  const items = itemsOf(list.data);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    create.mutate();
  }

  return (
    <div>
      <h1 className="page-title">Griefing-cost estimate</h1>
      <p className="page-sub">
        Adversarial analytics of griefing cost — labelled and role-gated.
      </p>
      <div className="adversarial-banner">
        ADVERSARIAL ANALYTICS — not a certification surface. Access is audited.
      </div>
      <div className="panel" style={{ marginBottom: "1rem" }}>
        <form onSubmit={onSubmit} className="row" style={{ alignItems: "flex-end" }}>
          <div className="field" style={{ flex: 1, marginBottom: 0 }}>
            <label>Function id</label>
            <input
              className="mono"
              value={functionId}
              onChange={(e) => setFunctionId(e.target.value)}
            />
          </div>
          <button className="btn flag" type="submit">
            Run estimate
          </button>
        </form>
        {create.isSuccess ? (
          <p className="mono" style={{ marginTop: "0.75rem" }}>
            costWei=
            {(dataOf<any>(create.data) ?? create.data as any)?.estimatedCostWei}
          </p>
        ) : null}
      </div>
      <div className="panel">
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Function</th>
              <th>Cost (wei)</th>
              <th>Labelled</th>
            </tr>
          </thead>
          <tbody>
            {items.map((g: any) => (
              <tr key={g.id}>
                <td className="mono">{g.id}</td>
                <td className="mono">{g.functionId}</td>
                <td className="mono">{g.estimatedCostWei}</td>
                <td>
                  <span className="badge bad">
                    {g.labelledAdversarial ? "adversarial" : "unset"}
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
