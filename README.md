# Ceilgas

Sound Ethereum gas upper-bound certification — OpenAPI-first DDD monorepo scoped as **`@ceilgas/*`**.

Product specs (repo root): [PRODUCT.md](./PRODUCT.md) · [WEBAPP.md](./WEBAPP.md) · [USER_STORIES.md](./USER_STORIES.md)

## Layout

```
packages/openapi-core  →  packages/core  →  platform/services  →  platform/adapters  →  platform/api-server
platform/webapp        →  Vite React console (WEBAPP.md)
.codegen/              →  local-only zero-codegen (gitignored — never push)
```

Domains (one OpenAPI YAML each under `packages/openapi-core/src/`):

`identity` · `builds` · `functions` · `bounds` · `certificates` · `recommendations` · `monitors` · `policies` · `griefing`

## Quick start

```bash
pnpm install
pnpm lint:openapi && pnpm bundle:openapi
pnpm codegen:paths
pnpm build
pnpm dev:api
# Health: curl http://127.0.0.1:4000/health
# Demo key: X-API-Key: ceilgas_demo_local_dev_key

pnpm --filter @ceilgas/webapp dev
# http://127.0.0.1:3000 — login with demo operator, then Engineering / SRE / Auditor
```

Optional Dynamo Local: see [docs/DYNAMO-LOCAL.md](./docs/DYNAMO-LOCAL.md) (`TABLE_NAME=ceilgas-core-local`).

## Codegen rules

1. **New domain** → full multi-layer generate once (Mode A).
2. **YAML edit on existing domain** → regenerate **core only**, handwrite below (Mode B).
3. Keep envelopes `{ data, meta }`, nested DI, and identity `/v0` auth paths intact.
4. **`.codegen` is never committed or pushed** — see `.cursor/rules/ceilgas-codegen-local.mdc`.

## Scripts

| Script | Purpose |
|--------|---------|
| `pnpm lint:openapi` / `bundle:openapi` | Redocly lint + bundle |
| `pnpm codegen:paths` | Sync absolute paths in merged codegen config |
| `pnpm codegen:core` | Regenerate core for all domains |
| `pnpm build` | core → services → adapters → api-server |
| `pnpm dev:api` | Fastify on :4000 |
