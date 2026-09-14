/**
 * EvaluateRepositoryDdb — sandbox in-memory (hand-maintained).
 */

import type { EvaluateRepository } from "@ceilgas/services/policies";
import {
  bounds,
  builds,
  ensureDemoSeed,
  functions,
  meta,
  policies,
} from "../_shared/ceilgas-sandbox-store.js";

export class EvaluateRepositoryDdb implements EvaluateRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async evaluateCiPolicy(
    input: Parameters<EvaluateRepository["evaluateCiPolicy"]>[0]
  ) {
    ensureDemoSeed();
    const raw = input as Record<string, unknown>;
    const policyId = String(raw.policyId ?? "");
    const buildId = String(raw.buildId ?? "");
    const policy = policies.get(policyId) ?? [...policies.values()][0];
    const build = builds.get(buildId);
    const violations: Array<{
      code: string;
      message: string;
      functionId?: string;
    }> = [];
    if (!build?.cfgComplete) {
      violations.push({
        code: "cfg_incomplete",
        message: "CFG incomplete for build",
      });
    }
    const fns = [...functions.values()].filter((f) => f.buildId === buildId);
    for (const fn of fns) {
      if (fn.isConstantGas === false && policy?.nonConstantSeverity === "fail") {
        violations.push({
          code: "non_constant_gas",
          message: `Non-constant gas on ${fn.name}`,
          functionId: fn.id,
        });
      }
      const bound = [...bounds.values()].find((b) => b.functionId === fn.id);
      if (
        bound &&
        bound.incompletenessClass !== "none" &&
        policy?.failClosedOnIncompleteness
      ) {
        violations.push({
          code: "incompleteness",
          message: `Incompleteness ${bound.incompletenessClass} on ${fn.name}`,
          functionId: fn.id,
        });
      }
    }
    const result = {
      buildId,
      policyId: policy?.id ?? policyId,
      passed: violations.length === 0,
      mode: policy?.mode ?? "certification",
      violations,
    };
    return {
      data: result,
      ...meta(String(raw.correlationId ?? "")),
    } as Awaited<ReturnType<EvaluateRepository["evaluateCiPolicy"]>>;
  }
}
