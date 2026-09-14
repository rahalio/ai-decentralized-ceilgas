/**
 * Identity Service — hand-maintained (login + keys).
 */
import { apiClient } from "@/services/shared/infrastructure";
import { makeService } from "@/services/shared/infrastructure/service-wrapper";

const raw = {
  async login(body: { email: string; password: string }, signal?: AbortSignal) {
    const response = await apiClient.post<any>("/v0/auth/login", { body, signal });
    return response.data;
  },
  async listApiKeys(signal?: AbortSignal) {
    const response = await apiClient.get<any>("/v0/tenants/me/api-keys", { signal });
    return response.data;
  },
};

export const identityService = makeService(raw, "identity");
