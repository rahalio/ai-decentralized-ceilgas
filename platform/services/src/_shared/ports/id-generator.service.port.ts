/**
 * IdGeneratorService Port — Ceilgas prefixes.
 */

import type { DomainCode } from '@ceilgas/core/_shared/helpers';

export interface IdGeneratorService {
  tntId(): string;
  keyId(): string;
  idnId(): string;
  autId(): string;
  bldId(): string;
  fncId(): string;
  bndId(): string;
  crtId(): string;
  recId(): string;
  monId(): string;
  altId(): string;
  polId(): string;
  grfId(): string;
  generateIdForDomain(domainCode: DomainCode): string;
}
