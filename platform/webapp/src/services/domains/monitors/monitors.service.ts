/**
 * Monitors Service — hand-maintained API client.
 */
import { apiClient } from "@/services/shared/infrastructure";
import { makeService } from "@/services/shared/infrastructure/service-wrapper";

const raw = {
  async listMonitors(params?: Record<string, string>, signal?: AbortSignal) {
    const qs = params ? `?${new URLSearchParams(params)}` : "";
    const response = await apiClient.get<any>(`/v1/monitors${qs}`, { signal });
    return response.data;
  },
  async createMonitor(body: { certificateId: string; metricName: string; threshold: number }, signal?: AbortSignal) {
    const response = await apiClient.post<any>("/v1/monitors", { body, signal });
    return response.data;
  },
  async listAlerts(monitorId: string, params?: Record<string, string>, signal?: AbortSignal) {
    const qs = params ? `?${new URLSearchParams(params)}` : "";
    const response = await apiClient.get<any>(`/v1/monitors/${monitorId}/alerts${qs}`, { signal });
    return response.data;
  },
};

export const monitorsService = makeService(raw, "monitors");
