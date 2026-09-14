/**
 * Policies Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/policies.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type CiPolicy = components["schemas"]["CiPolicy"];
export type CiPolicyGateResult = components["schemas"]["CiPolicyGateResult"];
export type CiPolicyListData = components["schemas"]["CiPolicyListData"];
export type CiPolicyUpsert = components["schemas"]["CiPolicyUpsert"];
export type NonConstantSeverity = components["schemas"]["NonConstantSeverity"];
export type PolicyMode = components["schemas"]["PolicyMode"];
export type Policy = operations["listCiPolicies"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type UpsertCiPolicyRequestInput = NonNullable<operations["upsertCiPolicy"]["requestBody"]>["content"]["application/json"];
export type EvaluateCiPolicyRequestInput = NonNullable<operations["evaluateCiPolicy"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListCiPoliciesParams = NonNullable<operations["listCiPolicies"]["parameters"]["query"]>;
export type GetCiPolicyParams = operations["getCiPolicy"]["parameters"]["path"];
export type EvaluateCiPolicyParams = operations["evaluateCiPolicy"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListCiPoliciesResponse = operations["listCiPolicies"]["responses"]["200"]["content"]["application/json"];
export type UpsertCiPolicyResponse = operations["upsertCiPolicy"]["responses"]["200"]["content"]["application/json"];
export type GetCiPolicyResponse = operations["getCiPolicy"]["responses"]["200"]["content"]["application/json"];
export type EvaluateCiPolicyResponse = operations["evaluateCiPolicy"]["responses"]["200"]["content"]["application/json"];


