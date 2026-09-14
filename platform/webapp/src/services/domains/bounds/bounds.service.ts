/**
 * Bounds Service — hand-maintained API client.
 */
import { apiClient } from "@/services/shared/infrastructure";
import { makeService } from "@/services/shared/infrastructure/service-wrapper";

const raw = {
  async getFunctionBounds(functionId: string, signal?: AbortSignal) {
    const response = await apiClient.get<any>(`/v1/functions/${functionId}/bounds`, { signal });
    return response.data;
  },
  async listBounds(params?: Record<string, string>, signal?: AbortSignal) {
    const qs = params ? `?${new URLSearchParams(params)}` : "";
    const response = await apiClient.get<any>(`/v1/bounds${qs}`, { signal });
    return response.data;
  },
};

export const boundsService = makeService(raw, "bounds");
