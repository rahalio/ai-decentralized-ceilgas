/**
 * PolicyRepositoryDdb — sandbox in-memory (hand-maintained).
 */

import type { PolicyRepository } from "@ceilgas/services/policies";
import {
  ensureDemoSeed,
  id,
  meta,
  nowIso,
  policies,
} from "../_shared/ceilgas-sandbox-store.js";

export class PolicyRepositoryDdb implements PolicyRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listCiPolicies(input: Parameters<PolicyRepository["listCiPolicies"]>[0]) {
    ensureDemoSeed();
    const raw = input as Record<string, unknown>;
    return {
      data: { items: [...policies.values()], nextCursor: undefined },
      ...meta(String(raw.correlationId ?? "")),
    } as Awaited<ReturnType<PolicyRepository["listCiPolicies"]>>;
  }

  async upsertCiPolicy(input: Parameters<PolicyRepository["upsertCiPolicy"]>[0]) {
    ensureDemoSeed();
    const raw = input as Record<string, unknown>;
    const entityId = String(raw.id ?? id("pol"));
    const pol = {
      id: entityId,
      name: String(raw.name ?? "ci-policy"),
      mode: (raw.mode as "certification" | "optimisation_hints") ?? "certification",
      failClosedOnIncompleteness: Boolean(raw.failClosedOnIncompleteness ?? true),
      nonConstantSeverity:
        (raw.nonConstantSeverity as "info" | "warn" | "fail") ?? "fail",
      exceptionNotes: (raw.exceptionNotes as string[]) ?? [],
      updatedAt: nowIso(),
    };
    policies.set(entityId, pol);
    return {
      data: pol,
      ...meta(String(raw.correlationId ?? "")),
    } as Awaited<ReturnType<PolicyRepository["upsertCiPolicy"]>>;
  }

  async getCiPolicy(input: Parameters<PolicyRepository["getCiPolicy"]>[0]) {
    ensureDemoSeed();
    const raw = input as Record<string, unknown>;
    const policyId = String(raw.policyId ?? raw.id ?? "");
    const pol = policies.get(policyId);
    if (!pol) {
      const err = new Error(`Policy not found: ${policyId}`) as Error & {
        statusCode?: number;
      };
      err.statusCode = 404;
      throw err;
    }
    return {
      data: pol,
      ...meta(String(raw.correlationId ?? "")),
    } as Awaited<ReturnType<PolicyRepository["getCiPolicy"]>>;
  }
}
