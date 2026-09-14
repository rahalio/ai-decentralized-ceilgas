/**
 * Certificates Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/certificates.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type AssumptionSnapshot = components["schemas"]["AssumptionSnapshot"];
export type CertificateStatus = components["schemas"]["CertificateStatus"];
export type GasCertificate = components["schemas"]["GasCertificate"];
export type GasCertificateCreate = components["schemas"]["GasCertificateCreate"];
export type GasCertificateListData = components["schemas"]["GasCertificateListData"];
export type Certificate = operations["listGasCertificates"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type IssueGasCertificateRequestInput = NonNullable<operations["issueGasCertificate"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListGasCertificatesParams = NonNullable<operations["listGasCertificates"]["parameters"]["query"]>;
export type GetGasCertificateParams = operations["getGasCertificate"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListGasCertificatesResponse = operations["listGasCertificates"]["responses"]["200"]["content"]["application/json"];
export type IssueGasCertificateResponse = operations["issueGasCertificate"]["responses"]["201"]["content"]["application/json"];
export type GetGasCertificateResponse = operations["getGasCertificate"]["responses"]["200"]["content"]["application/json"];


