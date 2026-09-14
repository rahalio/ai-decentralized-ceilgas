import { FormEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { recommendationsService } from "@/services/domains/recommendations";
import { dataOf } from "@/lib/envelope";

export function OracleStipendPage() {
  const [functionId, setFunctionId] = useState("fnc_01demo00000000000000000001");
  const [assumptionsJson, setAssumptionsJson] = useState('{"slots.length": 25}');
  const create = useMutation({
    mutationFn: () =>
      recommendationsService.createRecommendation({
        functionId,
        assumptions: JSON.parse(assumptionsJson),
        callbackContext: true,
        safetyMarginPercent: 15,
      }),
  });

  const result = dataOf<any>(create.data) ?? (create.data as any);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    create.mutate();
  }

  return (
    <div>
      <h1 className="page-title">Oracle callback stipend</h1>
      <p className="page-sub">
        Provision certified gas stipend for callback-style entrypoints under
        stated sizes (BR-6).
      </p>
      <div className="panel">
        <form onSubmit={onSubmit}>
          <div className="field">
            <label>Callback entrypoint function id</label>
            <input
              className="mono"
              value={functionId}
              onChange={(e) => setFunctionId(e.target.value)}
            />
          </div>
          <div className="field">
            <label>Size assumptions</label>
            <textarea
              rows={3}
              value={assumptionsJson}
              onChange={(e) => setAssumptionsJson(e.target.value)}
            />
          </div>
          <button className="btn" type="submit">
            Issue stipend config
          </button>
        </form>
        {result ? (
          <div className="stamp" style={{ marginTop: "1rem" }}>
            <div className="badge ok">callback stipend</div>
            <div className="formula" style={{ marginTop: "0.5rem" }}>
              gasStipend = {result.recommendedGasLimit}
            </div>
            <pre className="mono" style={{ fontSize: "0.8rem", color: "var(--color-mute)" }}>
              {JSON.stringify(
                {
                  callbackContext: true,
                  recommendedGasLimit: result.recommendedGasLimit,
                  sound: result.sound,
                  assumptions: result.assumptions,
                },
                null,
                2
              )}
            </pre>
          </div>
        ) : null}
      </div>
    </div>
  );
}
