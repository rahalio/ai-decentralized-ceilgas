/**
 * EstimateRepositoryDdb — sandbox in-memory (hand-maintained). BR-11.
 */

import type { EstimateRepository } from "@ceilgas/services/griefing";
import {
  ensureDemoSeed,
  griefingEstimates,
  id,
  meta,
  nowIso,
} from "../_shared/ceilgas-sandbox-store.js";

export class EstimateRepositoryDdb implements EstimateRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listGriefingEstimates(
    input: Parameters<EstimateRepository["listGriefingEstimates"]>[0]
  ) {
    ensureDemoSeed();
    const raw = input as Record<string, unknown>;
    return {
      data: { items: [...griefingEstimates.values()], nextCursor: undefined },
      ...meta(String(raw.correlationId ?? "")),
    } as Awaited<ReturnType<EstimateRepository["listGriefingEstimates"]>>;
  }

  async createGriefingEstimate(
    input: Parameters<EstimateRepository["createGriefingEstimate"]>[0]
  ) {
    ensureDemoSeed();
    const raw = input as Record<string, unknown>;
    const entityId = String(raw.id ?? id("grf"));
    const estimate = {
      id: entityId,
      functionId: String(raw.functionId ?? ""),
      estimatedCostWei: "1000000000000000000",
      assumptions: (raw.assumptions as Record<string, number>) ?? {},
      labelledAdversarial: true,
      notes: String(raw.notes ?? "Adversarial analytics — role-gated (BR-11)"),
      createdAt: nowIso(),
      createdByUserId: String(raw.createdByActorId ?? "usr_api_key_demo"),
    };
    griefingEstimates.set(entityId, estimate);
    return {
      data: estimate,
      ...meta(String(raw.correlationId ?? "")),
    } as Awaited<ReturnType<EstimateRepository["createGriefingEstimate"]>>;
  }
}
