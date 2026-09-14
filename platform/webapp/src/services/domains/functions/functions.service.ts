/**
 * Functions Service — hand-maintained API client.
 */
import { apiClient } from "@/services/shared/infrastructure";
import { makeService } from "@/services/shared/infrastructure/service-wrapper";

const raw = {
  async listFunctions(buildId: string, params?: Record<string, string>, signal?: AbortSignal) {
    const qs = params ? `?${new URLSearchParams(params)}` : "";
    const response = await apiClient.get<any>(`/v1/builds/${buildId}/functions${qs}`, { signal });
    return response.data;
  },
  async getFunction(functionId: string, signal?: AbortSignal) {
    const response = await apiClient.get<any>(`/v1/functions/${functionId}`, { signal });
    return response.data;
  },
};

export const functionsService = makeService(raw, "functions");
