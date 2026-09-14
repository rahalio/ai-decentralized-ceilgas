import { FormEvent, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { recommendationsService } from "@/services/domains/recommendations";
import { itemsOf, dataOf } from "@/lib/envelope";

export function RecommendationsPage() {
  const qc = useQueryClient();
  const [functionId, setFunctionId] = useState("fnc_01demo00000000000000000001");
  const [assumptionsJson, setAssumptionsJson] = useState('{"slots.length": 25}');
  const list = useQuery({
    queryKey: ["recommendations"],
    queryFn: () => recommendationsService.listRecommendations(),
  });
  const create = useMutation({
    mutationFn: () =>
      recommendationsService.createRecommendation({
        functionId,
        assumptions: JSON.parse(assumptionsJson),
        safetyMarginPercent: 10,
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["recommendations"] }),
  });

  const items = itemsOf(list.data);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    create.mutate();
  }

  return (
    <div>
      <h1 className="page-title">Limit recommendations</h1>
      <p className="page-sub">
        Minimum gas to safely execute F under size assumptions S.
      </p>
      <div className="panel" style={{ marginBottom: "1rem" }}>
        <form onSubmit={onSubmit}>
          <div className="field">
            <label>Function id</label>
            <input value={functionId} onChange={(e) => setFunctionId(e.target.value)} className="mono" />
          </div>
          <div className="field">
            <label>Assumptions S</label>
            <textarea
              rows={3}
              value={assumptionsJson}
              onChange={(e) => setAssumptionsJson(e.target.value)}
            />
          </div>
          <button className="btn" type="submit">
            Recommend
          </button>
          {create.isSuccess ? (
            <p className="mono" style={{ color: "var(--color-gauge)" }}>
              {(dataOf<any>(create.data) ?? create.data as any)?.recommendedGasLimit} gas
            </p>
          ) : null}
        </form>
      </div>
      <div className="panel">
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Function</th>
              <th>Limit</th>
              <th>Sound</th>
            </tr>
          </thead>
          <tbody>
            {items.map((r: any) => (
              <tr key={r.id}>
                <td className="mono">{r.id}</td>
                <td className="mono">{r.functionId}</td>
                <td className="mono">{r.recommendedGasLimit}</td>
                <td>
                  <span className={`badge ${r.sound ? "ok" : "bad"}`}>
                    {String(r.sound)}
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
