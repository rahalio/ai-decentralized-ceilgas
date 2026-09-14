/**
 * Recommendations Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/recommendations.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type AssumptionSet = components["schemas"]["AssumptionSet"];
export type LimitRecommendation = components["schemas"]["LimitRecommendation"];
export type LimitRecommendationCreate = components["schemas"]["LimitRecommendationCreate"];
export type LimitRecommendationListData = components["schemas"]["LimitRecommendationListData"];
export type Recommendation = operations["listLimitRecommendations"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateLimitRecommendationRequestInput = NonNullable<operations["createLimitRecommendation"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListLimitRecommendationsParams = NonNullable<operations["listLimitRecommendations"]["parameters"]["query"]>;


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListLimitRecommendationsResponse = operations["listLimitRecommendations"]["responses"]["200"]["content"]["application/json"];
export type CreateLimitRecommendationResponse = operations["createLimitRecommendation"]["responses"]["200"]["content"]["application/json"];


