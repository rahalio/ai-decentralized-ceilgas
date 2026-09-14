/**
 * Functions Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/functions.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type PublicFunction = components["schemas"]["PublicFunction"];
export type PublicFunctionListData = components["schemas"]["PublicFunctionListData"];
export type SizeMetric = components["schemas"]["SizeMetric"];
export type Function = operations["listFunctions"]["responses"]["200"]["content"]["application/json"]["data"];



// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListFunctionsParams = NonNullable<operations["listFunctions"]["parameters"]["query"]>;
export type GetFunctionParams = operations["getFunction"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListFunctionsResponse = operations["listFunctions"]["responses"]["200"]["content"]["application/json"];
export type GetFunctionResponse = operations["getFunction"]["responses"]["200"]["content"]["application/json"];


