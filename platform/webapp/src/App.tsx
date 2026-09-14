import type { ReactNode } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "@/components/AppShell";
import { LoginPage } from "@/pages/LoginPage";
import { EngineeringHomePage } from "@/pages/EngineeringHomePage";
import { BuildsPage } from "@/pages/BuildsPage";
import { BuildDetailPage } from "@/pages/BuildDetailPage";
import { FunctionBoundPage } from "@/pages/FunctionBoundPage";
import { RecommendationsPage } from "@/pages/RecommendationsPage";
import { OracleStipendPage } from "@/pages/OracleStipendPage";
import { MonitorsPage } from "@/pages/MonitorsPage";
import { PolicyPage } from "@/pages/PolicyPage";
import { CertificatesPage } from "@/pages/CertificatesPage";
import { CertificateDetailPage } from "@/pages/CertificateDetailPage";
import { IncompletenessPage } from "@/pages/IncompletenessPage";
import { GriefingPage } from "@/pages/GriefingPage";
import { AuditorHomePage, SreHomePage } from "@/pages/RoleHomes";

function RequireSession({ children }: { children: ReactNode }) {
  const ok =
    typeof window !== "undefined" && localStorage.getItem("ceilgas_session");
  if (!ok) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <RequireSession>
            <AppShell />
          </RequireSession>
        }
      >
        <Route index element={<Navigate to="/engineering" replace />} />
        <Route path="engineering" element={<EngineeringHomePage />} />
        <Route path="builds" element={<BuildsPage />} />
        <Route path="builds/:buildId" element={<BuildDetailPage />} />
        <Route path="functions/:functionId" element={<FunctionBoundPage />} />
        <Route path="policy" element={<PolicyPage />} />
        <Route path="incompleteness" element={<IncompletenessPage />} />
        <Route path="sre" element={<SreHomePage />} />
        <Route path="recommendations" element={<RecommendationsPage />} />
        <Route path="oracle" element={<OracleStipendPage />} />
        <Route path="monitors" element={<MonitorsPage />} />
        <Route path="auditor" element={<AuditorHomePage />} />
        <Route path="certificates" element={<CertificatesPage />} />
        <Route path="certificates/:certificateId" element={<CertificateDetailPage />} />
        <Route path="griefing" element={<GriefingPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
