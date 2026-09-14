/**
 * CertificateRepositoryDdb — sandbox in-memory (hand-maintained).
 */

import type { CertificateRepository } from "@ceilgas/services/certificates";
import {
  bounds,
  builds,
  certificates,
  ensureDemoSeed,
  functions,
  id,
  meta,
  nowIso,
} from "../_shared/ceilgas-sandbox-store.js";

export class CertificateRepositoryDdb implements CertificateRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listGasCertificates(
    input: Parameters<CertificateRepository["listGasCertificates"]>[0]
  ) {
    ensureDemoSeed();
    const raw = input as Record<string, unknown>;
    const buildId = raw.buildId ? String(raw.buildId) : undefined;
    let items = [...certificates.values()];
    if (buildId) items = items.filter((c) => c.buildId === buildId);
    return {
      data: { items, nextCursor: undefined },
      ...meta(String(raw.correlationId ?? "")),
    } as Awaited<ReturnType<CertificateRepository["listGasCertificates"]>>;
  }

  async issueGasCertificate(
    input: Parameters<CertificateRepository["issueGasCertificate"]>[0]
  ) {
    ensureDemoSeed();
    const raw = input as Record<string, unknown>;
    const buildId = String(raw.buildId ?? "");
    const build = builds.get(buildId);
    if (!build) {
      const err = new Error(`Build not found: ${buildId}`) as Error & {
        statusCode?: number;
      };
      err.statusCode = 404;
      throw err;
    }
    const failClosed = raw.failClosed !== false;
    const fnIds = [...functions.values()]
      .filter((f) => f.buildId === buildId)
      .map((f) => f.id);
    const incomplete = [...bounds.values()].filter(
      (b) =>
        fnIds.includes(b.functionId) && b.incompletenessClass !== "none"
    );
    const entityId = String(raw.id ?? id("crt"));
    let status: "certified" | "partial" | "refused" = "certified";
    let refusedReason: string | undefined;
    if (incomplete.length > 0) {
      if (failClosed) {
        status = "refused";
        refusedReason = "Fail-closed: incompleteness present";
      } else {
        status = "partial";
      }
    }
    const cert = {
      id: entityId,
      buildId,
      bytecodeHash: build.bytecodeHash,
      analyserVersion: build.analyserVersion ?? "ceilgas-analyser@0.1.0",
      gasScheduleVersion: build.gasScheduleVersion ?? "london",
      status,
      assumptions: (raw.assumptions as Record<string, number>) ?? {},
      refusedReason,
      incompleteFunctionIds: incomplete.map((b) => b.functionId),
      issuedAt: nowIso(),
    };
    certificates.set(entityId, cert);
    return {
      data: cert,
      ...meta(String(raw.correlationId ?? "")),
    } as Awaited<ReturnType<CertificateRepository["issueGasCertificate"]>>;
  }

  async getGasCertificate(
    input: Parameters<CertificateRepository["getGasCertificate"]>[0]
  ) {
    ensureDemoSeed();
    const raw = input as Record<string, unknown>;
    const certificateId = String(raw.certificateId ?? raw.id ?? "");
    const cert = certificates.get(certificateId);
    if (!cert) {
      const err = new Error(`Certificate not found: ${certificateId}`) as Error & {
        statusCode?: number;
      };
      err.statusCode = 404;
      throw err;
    }
    return {
      data: cert,
      ...meta(String(raw.correlationId ?? "")),
    } as Awaited<ReturnType<CertificateRepository["getGasCertificate"]>>;
  }
}
