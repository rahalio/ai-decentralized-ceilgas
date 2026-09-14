import { NavLink, Outlet } from "react-router-dom";

const engineering = [
  { to: "/engineering", label: "Engineering home", end: true },
  { to: "/builds", label: "Builds" },
  { to: "/policy", label: "CI policy" },
  { to: "/incompleteness", label: "Incompleteness" },
];

const sre = [
  { to: "/sre", label: "SRE home", end: true },
  { to: "/recommendations", label: "Recommendations" },
  { to: "/oracle", label: "Oracle stipends" },
  { to: "/monitors", label: "Assumption monitors" },
];

const auditor = [
  { to: "/auditor", label: "Auditor home", end: true },
  { to: "/certificates", label: "Certificates" },
  { to: "/griefing", label: "Griefing (gated)" },
];

function Group({
  title,
  items,
}: {
  title: string;
  items: Array<{ to: string; label: string; end?: boolean }>;
}) {
  return (
    <div className="nav-group">
      <div className="nav-label">{title}</div>
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={({ isActive }) =>
            `nav-link${isActive ? " active" : ""}`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </div>
  );
}

export function AppShell() {
  return (
    <div className="shell">
      <aside className="shell-nav">
        <div className="brand">
          Ceilgas
          <small>Gas ceiling certification</small>
        </div>
        <Group title="Engineering" items={engineering} />
        <Group title="SRE" items={sre} />
        <Group title="Auditor" items={auditor} />
        <div style={{ marginTop: "auto" }}>
          <NavLink to="/login" className="nav-link">
            Sign out
          </NavLink>
        </div>
      </aside>
      <main className="shell-main">
        <Outlet />
      </main>
    </div>
  );
}
