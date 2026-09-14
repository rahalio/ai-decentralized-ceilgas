/**
 * AlertRepositoryDdb — sandbox in-memory (hand-maintained).
 */

import type { AlertRepository } from "@ceilgas/services/monitors";
import {
  alerts,
  ensureDemoSeed,
  meta,
} from "../_shared/ceilgas-sandbox-store.js";

export class AlertRepositoryDdb implements AlertRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listMonitorAlerts(
    input: Parameters<AlertRepository["listMonitorAlerts"]>[0]
  ) {
    ensureDemoSeed();
    const raw = input as Record<string, unknown>;
    const monitorId = String(raw.monitorId ?? "");
    const items = [...alerts.values()].filter((a) =>
      monitorId ? a.monitorId === monitorId : true
    );
    return {
      data: { items, nextCursor: undefined },
      ...meta(String(raw.correlationId ?? "")),
    } as Awaited<ReturnType<AlertRepository["listMonitorAlerts"]>>;
  }
}
