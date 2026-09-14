/**
 * ID Generator Service Implementation — Ceilgas prefixes.
 */

import type { DomainCode } from '@ceilgas/core/_shared/helpers';
import { DOMAIN_PREFIX_MAP, isValidDomainId } from '@ceilgas/core';
import { ulid } from 'ulid';
import type { IdGeneratorService } from '@ceilgas/services/_shared';

export function generateIdWithPrefix(prefix: string): string {
  if (!prefix || prefix.length !== 3 || !/^[a-z]{3}$/.test(prefix)) {
    throw new Error(
      `Invalid domain prefix: "${prefix}". Must be exactly 3 lowercase letters.`
    );
  }
  const id = `${prefix}_${ulid().toLowerCase()}`;
  if (!isValidDomainId(id)) {
    throw new Error(`Generated ID "${id}" failed validation.`);
  }
  return id;
}

export class DefaultIdGeneratorService implements IdGeneratorService {
  tntId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.tenant);
  }
  keyId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.apiKey);
  }
  idnId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.identity);
  }
  autId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.auth);
  }
  bldId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.build);
  }
  fncId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.function);
  }
  bndId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.bound);
  }
  crtId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.certificate);
  }
  recId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.recommendation);
  }
  monId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.monitor);
  }
  altId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.alert);
  }
  polId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.policy);
  }
  grfId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.griefing);
  }
  generateIdForDomain(domainCode: DomainCode): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP[domainCode]);
  }
}

let idGeneratorService: DefaultIdGeneratorService | null = null;

export function getIdGeneratorService(): DefaultIdGeneratorService {
  if (!idGeneratorService) {
    idGeneratorService = new DefaultIdGeneratorService();
  }
  return idGeneratorService;
}
