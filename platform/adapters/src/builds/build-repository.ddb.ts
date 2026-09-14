/**
 * BuildRepositoryDdb — sandbox in-memory implementation (hand-maintained).
 */

import type { BuildRepository } from "@ceilgas/services/builds";
import {
  bytecodeHash,
  builds,
  ensureDemoSeed,
  functions,
  bounds,
  id,
  meta,
  nowIso,
  type ContractBuild,
} from "../_shared/ceilgas-sandbox-store.js";

function seedFunctionsForBuild(build: ContractBuild) {
  const fnId = id("fnc");
  const boundId = id("bnd");
  const isConstant = Math.random() > 0.5;
  functions.set(fnId, {
    id: fnId,
    buildId: build.id,
    name: "publicEntrypoint",
    selector: "0x12345678",
    isConstantGas: isConstant,
    sizeMetrics: isConstant
      ? []
      : [{ name: "items.length", kind: "storage" }],
    analysisStatus: "proven",
  });
  bounds.set(boundId, {
    id: boundId,
    functionId: fnId,
    buildId: build.id,
    status: "proven",
    opcodeBoundFormula: isConstant ? "21000" : "21000 + 50 * items.length",
    memoryBoundFormula: isConstant ? "0" : "3 * items.length",
    incompletenessClass: "none",
    nonConstantPolicyFlag: !isConstant,
    analysedAt: nowIso(),
  });
}

export class BuildRepositoryDdb implements BuildRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listBuilds(input: Parameters<BuildRepository["listBuilds"]>[0]) {
    ensureDemoSeed();
    const items = [...builds.values()].sort((a, b) =>
      b.createdAt.localeCompare(a.createdAt)
    );
    return {
      data: { items, nextCursor: undefined },
      ...meta((input as { correlationId?: string }).correlationId),
    } as Awaited<ReturnType<BuildRepository["listBuilds"]>>;
  }

  async submitBuild(input: Parameters<BuildRepository["submitBuild"]>[0]) {
    ensureDemoSeed();
    const raw = input as Record<string, unknown>;
    const entityId = String(raw.id ?? id("bld"));
    const hex = String(raw.bytecodeHex ?? "");
    const now = nowIso();
    const build: ContractBuild = {
      id: entityId,
      bytecodeHash: bytecodeHash(hex),
      sourceLanguage: String(raw.sourceLanguage ?? "solidity"),
      status: "completed",
      cfgComplete: true,
      analyserVersion: String(raw.analyserVersion ?? "ceilgas-analyser@0.1.0"),
      gasScheduleVersion: String(raw.gasScheduleVersion ?? "london"),
      progressPercent: 100,
      createdAt: now,
      completedAt: now,
    };
    builds.set(entityId, build);
    seedFunctionsForBuild(build);
    return {
      data: build,
      ...meta(String(raw.correlationId ?? "")),
    } as Awaited<ReturnType<BuildRepository["submitBuild"]>>;
  }

  async getBuild(input: Parameters<BuildRepository["getBuild"]>[0]) {
    ensureDemoSeed();
    const raw = input as Record<string, unknown>;
    const buildId = String(raw.buildId ?? raw.id ?? "");
    const build = builds.get(buildId);
    if (!build) {
      const err = new Error(`Build not found: ${buildId}`) as Error & {
        statusCode?: number;
      };
      err.statusCode = 404;
      throw err;
    }
    return {
      data: build,
      ...meta(String(raw.correlationId ?? "")),
    } as Awaited<ReturnType<BuildRepository["getBuild"]>>;
  }
}
