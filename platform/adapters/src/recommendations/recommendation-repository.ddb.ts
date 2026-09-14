/**
 * RecommendationRepositoryDdb — sandbox in-memory (hand-maintained).
 */

import type { RecommendationRepository } from "@ceilgas/services/recommendations";
import {
  bounds,
  ensureDemoSeed,
  id,
  meta,
  nowIso,
  recommendations,
} from "../_shared/ceilgas-sandbox-store.js";

function evalFormula(formula: string | undefined, assumptions: Record<string, number>): number {
  if (!formula) return 0;
  if (/^\d+$/.test(formula.trim())) return Number(formula.trim());
  // Simple "a + b * name" style evaluation for demo
  let result = 0;
  const constMatch = formula.match(/^(\d+)/);
  if (constMatch) result += Number(constMatch[1]);
  for (const [name, value] of Object.entries(assumptions)) {
    const re = new RegExp(`(\\d+)\\s*\\*\\s*${name.replace(".", "\\.")}`);
    const m = formula.match(re);
    if (m) result += Number(m[1]) * value;
  }
  return Math.max(0, Math.floor(result));
}

export class RecommendationRepositoryDdb implements RecommendationRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listLimitRecommendations(
    input: Parameters<RecommendationRepository["listLimitRecommendations"]>[0]
  ) {
    ensureDemoSeed();
    const raw = input as Record<string, unknown>;
    const functionId = raw.functionId ? String(raw.functionId) : undefined;
    let items = [...recommendations.values()];
    if (functionId) items = items.filter((r) => r.functionId === functionId);
    return {
      data: { items, nextCursor: undefined },
      ...meta(String(raw.correlationId ?? "")),
    } as Awaited<ReturnType<RecommendationRepository["listLimitRecommendations"]>>;
  }

  async createLimitRecommendation(
    input: Parameters<RecommendationRepository["createLimitRecommendation"]>[0]
  ) {
    ensureDemoSeed();
    const raw = input as Record<string, unknown>;
    const functionId = String(raw.functionId ?? "");
    const assumptions = (raw.assumptions as Record<string, number>) ?? {};
    const bound = [...bounds.values()].find((b) => b.functionId === functionId);
    const sound = Boolean(bound && bound.incompletenessClass === "none");
    const opcode = evalFormula(bound?.opcodeBoundFormula, assumptions);
    const memory = evalFormula(bound?.memoryBoundFormula, assumptions);
    const margin = Number(raw.safetyMarginPercent ?? 0);
    const base = opcode + memory;
    const recommendedGasLimit = Math.floor(base * (1 + margin / 100));
    const entityId = String(raw.id ?? id("rec"));
    const rec = {
      id: entityId,
      functionId,
      recommendedGasLimit,
      assumptions,
      sound,
      callbackContext: Boolean(raw.callbackContext),
      safetyMarginPercent: margin,
      createdAt: nowIso(),
    };
    recommendations.set(entityId, rec);
    return {
      data: rec,
      ...meta(String(raw.correlationId ?? "")),
    } as Awaited<ReturnType<RecommendationRepository["createLimitRecommendation"]>>;
  }
}
