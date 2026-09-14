/**
 * Griefing Service — hand-maintained API client (BR-11 role-gated).
 */
import { apiClient } from "@/services/shared/infrastructure";
import { makeService } from "@/services/shared/infrastructure/service-wrapper";

const raw = {
  async listEstimates(params?: Record<string, string>, signal?: AbortSignal) {
    const qs = params ? `?${new URLSearchParams(params)}` : "";
    const response = await apiClient.get<any>(`/v1/griefing/estimates${qs}`, { signal });
    return response.data;
  },
  async createEstimate(body: { functionId: string; assumptions?: Record<string, number>; notes?: string }, signal?: AbortSignal) {
    const response = await apiClient.post<any>("/v1/griefing/estimates", { body, signal });
    return response.data;
  },
};

export const griefingService = makeService(raw, "griefing");
