/**
 * Bounds Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/bounds.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type BoundStatus = components["schemas"]["BoundStatus"];
export type GasBound = components["schemas"]["GasBound"];
export type GasBoundListData = components["schemas"]["GasBoundListData"];
export type IncompletenessClass = components["schemas"]["IncompletenessClass"];
export type Bound = operations["listBounds"]["responses"]["200"]["content"]["application/json"]["data"];



// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type GetFunctionBoundsParams = operations["getFunctionBounds"]["parameters"]["path"];
export type ListBoundsParams = NonNullable<operations["listBounds"]["parameters"]["query"]>;


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type GetFunctionBoundsResponse = operations["getFunctionBounds"]["responses"]["200"]["content"]["application/json"];
export type ListBoundsResponse = operations["listBounds"]["responses"]["200"]["content"]["application/json"];


