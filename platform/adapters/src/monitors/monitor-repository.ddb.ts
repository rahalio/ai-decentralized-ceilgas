/**
 * MonitorRepositoryDdb — sandbox in-memory (hand-maintained).
 */

import type { MonitorRepository } from "@ceilgas/services/monitors";
import {
  ensureDemoSeed,
  id,
  meta,
  monitors,
  nowIso,
} from "../_shared/ceilgas-sandbox-store.js";

export class MonitorRepositoryDdb implements MonitorRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listMonitors(input: Parameters<MonitorRepository["listMonitors"]>[0]) {
    ensureDemoSeed();
    const raw = input as Record<string, unknown>;
    const items = [...monitors.values()];
    return {
      data: { items, nextCursor: undefined },
      ...meta(String(raw.correlationId ?? "")),
    } as Awaited<ReturnType<MonitorRepository["listMonitors"]>>;
  }

  async createMonitor(input: Parameters<MonitorRepository["createMonitor"]>[0]) {
    ensureDemoSeed();
    const raw = input as Record<string, unknown>;
    const entityId = String(raw.id ?? id("mon"));
    const mon = {
      id: entityId,
      certificateId: String(raw.certificateId ?? ""),
      metricName: String(raw.metricName ?? ""),
      threshold: Number(raw.threshold ?? 0),
      status: "active" as const,
      lastObservedValue: 0,
      proximityRatio: 0,
      createdAt: nowIso(),
    };
    monitors.set(entityId, mon);
    return {
      data: mon,
      ...meta(String(raw.correlationId ?? "")),
    } as Awaited<ReturnType<MonitorRepository["createMonitor"]>>;
  }
}
