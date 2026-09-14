import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { buildsService } from "@/services/domains/builds";
import { itemsOf } from "@/lib/envelope";

export function BuildsPage() {
  const qc = useQueryClient();
  const [bytecodeHex, setBytecodeHex] = useState("0x6080604052");
  const builds = useQuery({
    queryKey: ["builds"],
    queryFn: () => buildsService.listBuilds(),
  });
  const submit = useMutation({
    mutationFn: () => buildsService.submitBuild({ bytecodeHex, sourceLanguage: "solidity" }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["builds"] }),
  });

  const items = itemsOf(builds.data);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    submit.mutate();
  }

  return (
    <div>
      <h1 className="page-title">Build analysis</h1>
      <p className="page-sub">
        Ingest Solidity/EVM, show CFG completeness, run bound pipeline within CI
        SLA.
      </p>
      <div className="panel" style={{ marginBottom: "1rem" }}>
        <form onSubmit={onSubmit}>
          <div className="field">
            <label htmlFor="bytecode">Bytecode hex</label>
            <textarea
              id="bytecode"
              rows={3}
              value={bytecodeHex}
              onChange={(e) => setBytecodeHex(e.target.value)}
            />
          </div>
          <button className="btn" type="submit" disabled={submit.isPending}>
            {submit.isPending ? "Analysing…" : "Analyse build"}
          </button>
          {submit.isError ? (
            <p style={{ color: "var(--color-flag)" }}>
              {(submit.error as Error).message}
            </p>
          ) : null}
        </form>
      </div>
      <div className="panel">
        <table className="table">
          <thead>
            <tr>
              <th>Build</th>
              <th>Bytecode</th>
              <th>Analyser</th>
              <th>Status</th>
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
                <td className="mono">{String(b.bytecodeHash).slice(0, 12)}…</td>
                <td className="mono">{b.analyserVersion}</td>
                <td>
                  <span className={`badge ${b.status === "completed" ? "ok" : "warn"}`}>
                    {b.status}
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
