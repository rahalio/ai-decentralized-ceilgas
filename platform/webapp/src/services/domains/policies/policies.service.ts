/**
 * Policies Service — hand-maintained API client.
 */
import { apiClient } from "@/services/shared/infrastructure";
import { makeService } from "@/services/shared/infrastructure/service-wrapper";

const raw = {
  async listPolicies(params?: Record<string, string>, signal?: AbortSignal) {
    const qs = params ? `?${new URLSearchParams(params)}` : "";
    const response = await apiClient.get<any>(`/v1/policies${qs}`, { signal });
    return response.data;
  },
  async upsertPolicy(body: Record<string, unknown>, signal?: AbortSignal) {
    const response = await apiClient.post<any>("/v1/policies", { body, signal });
    return response.data;
  },
  async getPolicy(policyId: string, signal?: AbortSignal) {
    const response = await apiClient.get<any>(`/v1/policies/${policyId}`, { signal });
    return response.data;
  },
  async evaluatePolicy(policyId: string, body: { buildId: string }, signal?: AbortSignal) {
    const response = await apiClient.post<any>(`/v1/policies/${policyId}/evaluate`, { body, signal });
    return response.data;
  },
};

export const policiesService = makeService(raw, "policies");
