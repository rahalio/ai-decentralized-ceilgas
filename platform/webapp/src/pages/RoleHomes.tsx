import { Link } from "react-router-dom";

export function SreHomePage() {
  return (
    <div>
      <h1 className="page-title">SRE monitors</h1>
      <p className="page-sub">
        Watch state growth toward unsafe regions; provision limits and oracle
        stipends from certified bounds.
      </p>
      <div className="grid-stats">
        <Link className="stat" to="/monitors">
          <div className="label">Assumption monitors</div>
          <div className="value pressure">Open</div>
        </Link>
        <Link className="stat" to="/recommendations">
          <div className="label">Recommendations</div>
          <div className="value">Open</div>
        </Link>
        <Link className="stat" to="/oracle">
          <div className="label">Oracle stipends</div>
          <div className="value">Open</div>
        </Link>
      </div>
    </div>
  );
}

export function AuditorHomePage() {
  return (
    <div>
      <h1 className="page-title">Auditor certificates</h1>
      <p className="page-sub">
        Residual risk documented via incompleteness register; historical
        certificates remain queryable after upgrades.
      </p>
      <div className="grid-stats">
        <Link className="stat" to="/certificates">
          <div className="label">Certificates</div>
          <div className="value">Open</div>
        </Link>
        <Link className="stat" to="/incompleteness">
          <div className="label">Incompleteness</div>
          <div className="value flag">Open</div>
        </Link>
        <Link className="stat" to="/griefing">
          <div className="label">Griefing (gated)</div>
          <div className="value flag">Open</div>
        </Link>
      </div>
    </div>
  );
}
