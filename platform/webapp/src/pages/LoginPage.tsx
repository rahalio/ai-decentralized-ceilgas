import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@demo.local");
  const [password, setPassword] = useState("sandbox-admin-8");
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    // Sandbox: API-key auth is primary; store a session flag for shell access.
    if (!email || !password) {
      setError("Email and password required");
      return;
    }
    localStorage.setItem("ceilgas_session", "1");
    localStorage.setItem("ceilgas_role", "admin");
    navigate("/engineering");
  }

  return (
    <div className="login-wrap">
      <div className="login-panel panel">
        <div className="brand stamp">Ceilgas</div>
        <h1>How much gas is necessary?</h1>
        <form onSubmit={onSubmit}>
          <div className="field" style={{ textAlign: "left" }}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
            />
          </div>
          <div className="field" style={{ textAlign: "left" }}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          {error ? (
            <p style={{ color: "var(--color-flag)", fontSize: "0.85rem" }}>
              {error}
            </p>
          ) : null}
          <button className="btn" type="submit" style={{ width: "100%" }}>
            Enter certification console
          </button>
        </form>
        <p style={{ color: "var(--color-mute)", fontSize: "0.75rem", marginTop: "1rem" }}>
          Demo uses API key auth under the hood. Operator login seeds the shell.
        </p>
      </div>
    </div>
  );
}
