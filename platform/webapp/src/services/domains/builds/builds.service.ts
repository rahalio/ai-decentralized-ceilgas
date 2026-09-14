/**
 * Builds Service — hand-maintained API client (codegen stubs were incorrect).
 */
import { apiClient } from "@/services/shared/infrastructure";
import { makeService } from "@/services/shared/infrastructure/service-wrapper";

const rawBuildsService = {
  async listBuilds(params?: Record<string, string>, signal?: AbortSignal) {
    const qs = params ? `?${new URLSearchParams(params)}` : "";
    const response = await apiClient.get<any>(`/v1/builds${qs}`, { signal });
    return response.data;
  },
  async submitBuild(body: { bytecodeHex: string; soliditySource?: string; sourceLanguage?: string }, signal?: AbortSignal) {
    const response = await apiClient.post<any>("/v1/builds", { body, signal });
    return response.data;
  },
  async getBuild(buildId: string, signal?: AbortSignal) {
    const response = await apiClient.get<any>(`/v1/builds/${buildId}`, { signal });
    return response.data;
  },
};

export const buildsService = makeService(rawBuildsService, "builds");
