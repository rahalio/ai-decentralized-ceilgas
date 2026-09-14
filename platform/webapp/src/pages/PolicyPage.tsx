import { FormEvent, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { policiesService } from "@/services/domains/policies";
import { dataOf, itemsOf } from "@/lib/envelope";

export function PolicyPage() {
  const qc = useQueryClient();
  const [name, setName] = useState("default-ci");
  const [mode, setMode] = useState<"certification" | "optimisation_hints">(
    "certification"
  );
  const [severity, setSeverity] = useState<"info" | "warn" | "fail">("fail");
  const [failClosed, setFailClosed] = useState(true);
  const [buildId, setBuildId] = useState("bld_01demo00000000000000000001");

  const list = useQuery({
    queryKey: ["policies"],
    queryFn: () => policiesService.listPolicies(),
  });
  const upsert = useMutation({
    mutationFn: () =>
      policiesService.upsertPolicy({
        name,
        mode,
        failClosedOnIncompleteness: failClosed,
        nonConstantSeverity: severity,
        exceptionNotes: [],
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["policies"] }),
  });
  const evaluate = useMutation({
    mutationFn: async () => {
      const items = itemsOf(list.data);
      const policyId = items[0]?.id;
      if (!policyId) throw new Error("Save a policy first");
      return policiesService.evaluatePolicy(policyId, { buildId });
    },
  });

  const items = itemsOf(list.data);
  const gate = dataOf<any>(evaluate.data) ?? (evaluate.data as any);

  function onSave(e: FormEvent) {
    e.preventDefault();
    upsert.mutate();
  }

  return (
    <div>
      <h1 className="page-title">CI policy gate</h1>
      <p className="page-sub">
        Fail CI on non-constant gas without approved exception; refuse
        certification on incompleteness. Certification ≠ optimisation (BR-10).
      </p>
      <div className="panel" style={{ marginBottom: "1rem" }}>
        <form onSubmit={onSave}>
          <div className="row">
            <div className="field" style={{ flex: 1 }}>
              <label>Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="field">
              <label>Mode</label>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value as typeof mode)}
              >
                <option value="certification">certification</option>
                <option value="optimisation_hints">optimisation_hints</option>
              </select>
            </div>
            <div className="field">
              <label>Non-constant severity</label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value as typeof severity)}
              >
                <option value="info">info</option>
                <option value="warn">warn</option>
                <option value="fail">fail</option>
              </select>
            </div>
          </div>
          <label className="row" style={{ gap: "0.5rem", marginBottom: "0.75rem" }}>
            <input
              type="checkbox"
              checked={failClosed}
              onChange={(e) => setFailClosed(e.target.checked)}
            />
            Fail closed on incompleteness
          </label>
          <button className="btn" type="submit">
            Save policy
          </button>
        </form>
      </div>
      <div className="panel" style={{ marginBottom: "1rem" }}>
        <div className="field">
          <label>Evaluate against build</label>
          <input
            className="mono"
            value={buildId}
            onChange={(e) => setBuildId(e.target.value)}
          />
        </div>
        <button className="btn ghost" type="button" onClick={() => evaluate.mutate()}>
          Evaluate gate
        </button>
        {gate ? (
          <div style={{ marginTop: "0.75rem" }}>
            <span className={`badge ${gate.passed ? "ok" : "bad"}`}>
              {gate.passed ? "passed" : "failed"}
            </span>
            <ul>
              {(gate.violations ?? []).map((v: any, i: number) => (
                <li key={i}>
                  <span className="badge bad">{v.code}</span> {v.message}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
      <div className="panel">
        <table className="table">
          <thead>
            <tr>
              <th>Policy</th>
              <th>Mode</th>
              <th>Non-constant</th>
              <th>Fail-closed</th>
            </tr>
          </thead>
          <tbody>
            {items.map((p: any) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>
                  <span className="badge">{p.mode}</span>
                </td>
                <td>{p.nonConstantSeverity}</td>
                <td>{String(p.failClosedOnIncompleteness)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
