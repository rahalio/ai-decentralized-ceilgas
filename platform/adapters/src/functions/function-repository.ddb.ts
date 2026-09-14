/**
 * FunctionRepositoryDdb — sandbox in-memory (hand-maintained).
 */

import type { FunctionRepository } from "@ceilgas/services/functions";
import {
  ensureDemoSeed,
  functions,
  meta,
} from "../_shared/ceilgas-sandbox-store.js";

export class FunctionRepositoryDdb implements FunctionRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listFunctions(input: Parameters<FunctionRepository["listFunctions"]>[0]) {
    ensureDemoSeed();
    const raw = input as Record<string, unknown>;
    const buildId = String(raw.buildId ?? "");
    const items = [...functions.values()].filter((f) =>
      buildId ? f.buildId === buildId : true
    );
    return {
      data: { items, nextCursor: undefined },
      ...meta(String(raw.correlationId ?? "")),
    } as Awaited<ReturnType<FunctionRepository["listFunctions"]>>;
  }

  async getFunction(input: Parameters<FunctionRepository["getFunction"]>[0]) {
    ensureDemoSeed();
    const raw = input as Record<string, unknown>;
    const functionId = String(raw.functionId ?? raw.id ?? "");
    const fn = functions.get(functionId);
    if (!fn) {
      const err = new Error(`Function not found: ${functionId}`) as Error & {
        statusCode?: number;
      };
      err.statusCode = 404;
      throw err;
    }
    return {
      data: fn,
      ...meta(String(raw.correlationId ?? "")),
    } as Awaited<ReturnType<FunctionRepository["getFunction"]>>;
  }
}
