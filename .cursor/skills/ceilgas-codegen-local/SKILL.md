---
name: ceilgas-codegen-local
description: >-
  Ceilgas rule: never commit or push .codegen; sync zero-codegen locally from
  the scaffold. Use when committing, pushing, or running codegen in this repo.
---

# Ceilgas local codegen

## Hard rule

**Do not commit or push `.codegen/`** (Python `zero_codegen` tool + merged JSON with absolute paths). It is developer-local infrastructure.

## Sync from scaffold

```bash
rsync -a --delete \
  /Users/nrahal/@code/zero-apps/zero-apps-codegen-scaffold/.codegen/ \
  .codegen/
# Then re-apply @ceilgas package_scope and path sync:
pnpm codegen:paths
```

After sync, keep `"package_scope": "@ceilgas"` in `.codegen/zero-codegen.json` and `.codegen/.zero-codegen-merged.json`. Generator templates in this tree should emit `@ceilgas/*` imports.

## Ignore safeguards

Root `.gitignore` must include:

```
.codegen/
**/zero_codegen/
packages/openapi-core/src/.bundled/
```

## Related

- Skills: `ddd-platform`, `ddd-codegen` under `.cursor/skills/`
- Rule: `.cursor/rules/ceilgas-codegen-local.mdc`
