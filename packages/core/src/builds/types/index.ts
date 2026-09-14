/**
 * Builds Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/builds.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type BuildStatus = components["schemas"]["BuildStatus"];
export type ContractBuild = components["schemas"]["ContractBuild"];
export type ContractBuildCreate = components["schemas"]["ContractBuildCreate"];
export type ContractBuildListData = components["schemas"]["ContractBuildListData"];
export type SourceLanguage = components["schemas"]["SourceLanguage"];
export type Build = operations["listBuilds"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type SubmitBuildRequestInput = NonNullable<operations["submitBuild"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListBuildsParams = NonNullable<operations["listBuilds"]["parameters"]["query"]>;
export type GetBuildParams = operations["getBuild"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListBuildsResponse = operations["listBuilds"]["responses"]["200"]["content"]["application/json"];
export type SubmitBuildResponse = operations["submitBuild"]["responses"]["202"]["content"]["application/json"];
export type GetBuildResponse = operations["getBuild"]["responses"]["200"]["content"]["application/json"];


