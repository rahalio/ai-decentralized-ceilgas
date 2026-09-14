import { FormEvent, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { functionsService } from "@/services/domains/functions";
import { boundsService } from "@/services/domains/bounds";
import { recommendationsService } from "@/services/domains/recommendations";
import { dataOf } from "@/lib/envelope";

export function FunctionBoundPage() {
  const { functionId = "" } = useParams();
  const [assumptionsJson, setAssumptionsJson] = useState('{"slots.length": 25}');
  const fn = useQuery({
    queryKey: ["function", functionId],
    queryFn: () => functionsService.getFunction(functionId),
    enabled: Boolean(functionId),
  });
  const bounds = useQuery({
    queryKey: ["bounds", functionId],
    queryFn: () => boundsService.getFunctionBounds(functionId),
    enabled: Boolean(functionId),
  });
  const recommend = useMutation({
    mutationFn: () =>
      recommendationsService.createRecommendation({
        functionId,
        assumptions: JSON.parse(assumptionsJson),
        safetyMarginPercent: 10,
      }),
  });

  const f = dataOf<any>(fn.data) ?? (fn.data as any);
  const b = dataOf<any>(bounds.data) ?? (bounds.data as any);
  const incomplete = b && b.incompletenessClass && b.incompletenessClass !== "none";

  function onRecommend(e: FormEvent) {
    e.preventDefault();
    recommend.mutate();
  }

  return (
    <div>
      <h1 className="page-title">{f?.name ?? "Function bounds"}</h1>
      <p className="page-sub">
        Opcode and memory upper bounds as constants or parametric formulas with
        size metrics. Don’t-know is hatched — never stamped safe.
      </p>
      {f?.isConstantGas === false ? (
        <p>
          <span className="badge bad">Non-constant policy flag (BR-8)</span>
        </p>
      ) : null}
      <div
        className={`panel${incomplete ? " hatch" : ""}`}
        style={{ marginBottom: "1rem" }}
      >
        {incomplete ? (
          <div className="badge incomplete" style={{ marginBottom: "0.75rem" }}>
            incompleteness: {b.incompletenessClass}
          </div>
        ) : (
          <div className="badge ok stamp" style={{ marginBottom: "0.75rem" }}>
            proven
          </div>
        )}
        <div className="field">
          <label>Opcode bound</label>
          <div className="formula">{b?.opcodeBoundFormula ?? "—"}</div>
        </div>
        <div className="field">
          <label>Memory bound</label>
          <div className="formula">{b?.memoryBoundFormula ?? "—"}</div>
        </div>
        {f?.sizeMetrics?.length ? (
          <div>
            <div className="nav-label">Size metrics</div>
            <ul>
              {f.sizeMetrics.map((m: any) => (
                <li key={m.name} className="mono">
                  {m.name} <span className="badge">{m.kind}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
      <div className="panel">
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem" }}>
          Evaluate under assumptions
        </h2>
        <form onSubmit={onRecommend}>
          <div className="field">
            <label htmlFor="assumptions">Assumption set S (JSON)</label>
            <textarea
              id="assumptions"
              rows={3}
              value={assumptionsJson}
              onChange={(e) => setAssumptionsJson(e.target.value)}
            />
          </div>
          <div className="row">
            <button className="btn" type="submit" disabled={recommend.isPending || incomplete}>
              Recommend limit
            </button>
            <Link className="btn ghost" to="/monitors">
              Open monitors
            </Link>
          </div>
          {incomplete ? (
            <p style={{ color: "var(--color-incomplete)" }}>
              Certification mode cannot recommend — incompleteness present.
            </p>
          ) : null}
          {recommend.isSuccess ? (
            <p className="mono" style={{ color: "var(--color-gauge)" }}>
              recommendedGasLimit={" "}
              {(dataOf<any>(recommend.data) ?? recommend.data as any)?.recommendedGasLimit}
              {" · sound="}
              {String((dataOf<any>(recommend.data) ?? recommend.data as any)?.sound)}
            </p>
          ) : null}
        </form>
      </div>
    </div>
  );
}
