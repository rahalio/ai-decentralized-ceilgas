/**
 * Certificates Service — hand-maintained API client.
 */
import { apiClient } from "@/services/shared/infrastructure";
import { makeService } from "@/services/shared/infrastructure/service-wrapper";

const raw = {
  async listCertificates(params?: Record<string, string>, signal?: AbortSignal) {
    const qs = params ? `?${new URLSearchParams(params)}` : "";
    const response = await apiClient.get<any>(`/v1/certificates${qs}`, { signal });
    return response.data;
  },
  async issueCertificate(body: { buildId: string; failClosed?: boolean; assumptions?: Record<string, number> }, signal?: AbortSignal) {
    const response = await apiClient.post<any>("/v1/certificates", { body, signal });
    return response.data;
  },
  async getCertificate(certificateId: string, signal?: AbortSignal) {
    const response = await apiClient.get<any>(`/v1/certificates/${certificateId}`, { signal });
    return response.data;
  },
};

export const certificatesService = makeService(raw, "certificates");
