/**
 * BoundRepositoryDdb — sandbox in-memory (hand-maintained).
 */

import type { BoundRepository } from "@ceilgas/services/bounds";
import {
  bounds,
  ensureDemoSeed,
  meta,
} from "../_shared/ceilgas-sandbox-store.js";

export class BoundRepositoryDdb implements BoundRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async getFunctionBounds(
    input: Parameters<BoundRepository["getFunctionBounds"]>[0]
  ) {
    ensureDemoSeed();
    const raw = input as Record<string, unknown>;
    const functionId = String(raw.functionId ?? "");
    const bound = [...bounds.values()].find((b) => b.functionId === functionId);
    if (!bound) {
      const err = new Error(`Bounds not found for function: ${functionId}`) as Error & {
        statusCode?: number;
      };
      err.statusCode = 404;
      throw err;
    }
    return {
      data: bound,
      ...meta(String(raw.correlationId ?? "")),
    } as Awaited<ReturnType<BoundRepository["getFunctionBounds"]>>;
  }

  async listBounds(input: Parameters<BoundRepository["listBounds"]>[0]) {
    ensureDemoSeed();
    const raw = input as Record<string, unknown>;
    const buildId = raw.buildId ? String(raw.buildId) : undefined;
    const incompletenessOnly = Boolean(raw.incompletenessOnly);
    let items = [...bounds.values()];
    if (buildId) items = items.filter((b) => b.buildId === buildId);
    if (incompletenessOnly)
      items = items.filter((b) => b.incompletenessClass !== "none");
    return {
      data: { items, nextCursor: undefined },
      ...meta(String(raw.correlationId ?? "")),
    } as Awaited<ReturnType<BoundRepository["listBounds"]>>;
  }
}
