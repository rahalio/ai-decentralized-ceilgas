/**
 * Recommendations Service — hand-maintained API client.
 */
import { apiClient } from "@/services/shared/infrastructure";
import { makeService } from "@/services/shared/infrastructure/service-wrapper";

const raw = {
  async listRecommendations(params?: Record<string, string>, signal?: AbortSignal) {
    const qs = params ? `?${new URLSearchParams(params)}` : "";
    const response = await apiClient.get<any>(`/v1/recommendations${qs}`, { signal });
    return response.data;
  },
  async createRecommendation(body: {
    functionId: string;
    assumptions: Record<string, number>;
    callbackContext?: boolean;
    safetyMarginPercent?: number;
  }, signal?: AbortSignal) {
    const response = await apiClient.post<any>("/v1/recommendations", { body, signal });
    return response.data;
  },
};

export const recommendationsService = makeService(raw, "recommendations");
