import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const issueGasCertificate_Body = z
  .object({
    buildId: z.string().regex(/^bld_[0-9A-HJKMNP-TV-Z]{26}$/),
    failClosed: z.boolean().optional().default(true),
    assumptions: z.record(z.number()).optional(),
  })
  .passthrough();
const BuildId = z.string();
const Problem = z
  .object({
    type: z.string().url(),
    title: z.string(),
    status: z.number().int(),
    detail: z.string(),
    instance: z.string().url(),
    code: z.string(),
  })
  .partial()
  .passthrough();
const CertificateId = z.string();
const CertificateStatus = z.enum(['certified', 'partial', 'refused']);
const AssumptionSnapshot = z.record(z.number());
const FunctionId = z.string();
const GasCertificate = z
  .object({
    id: z.string().regex(/^crt_[0-9A-HJKMNP-TV-Z]{26}$/),
    buildId: z.string().regex(/^bld_[0-9A-HJKMNP-TV-Z]{26}$/),
    bytecodeHash: z.string(),
    analyserVersion: z.string(),
    gasScheduleVersion: z.string(),
    status: z.enum(['certified', 'partial', 'refused']),
    assumptions: z.record(z.number()).optional(),
    refusedReason: z.string().optional(),
    incompleteFunctionIds: z
      .array(z.string().regex(/^fnc_[0-9A-HJKMNP-TV-Z]{26}$/))
      .optional(),
    issuedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const GasCertificateListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^crt_[0-9A-HJKMNP-TV-Z]{26}$/),
          buildId: z.string().regex(/^bld_[0-9A-HJKMNP-TV-Z]{26}$/),
          bytecodeHash: z.string(),
          analyserVersion: z.string(),
          gasScheduleVersion: z.string(),
          status: z.enum(['certified', 'partial', 'refused']),
          assumptions: z.record(z.number()).optional(),
          refusedReason: z.string().optional(),
          incompleteFunctionIds: z
            .array(z.string().regex(/^fnc_[0-9A-HJKMNP-TV-Z]{26}$/))
            .optional(),
          issuedAt: z.string().datetime({ offset: true }),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const ResponseMeta = z
  .object({
    requestId: z.string().uuid(),
    correlationId: z.string(),
    generatedAt: z.string().datetime({ offset: true }),
  })
  .partial()
  .passthrough();
const GasCertificateListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^crt_[0-9A-HJKMNP-TV-Z]{26}$/),
              buildId: z.string().regex(/^bld_[0-9A-HJKMNP-TV-Z]{26}$/),
              bytecodeHash: z.string(),
              analyserVersion: z.string(),
              gasScheduleVersion: z.string(),
              status: z.enum(['certified', 'partial', 'refused']),
              assumptions: z.record(z.number()).optional(),
              refusedReason: z.string().optional(),
              incompleteFunctionIds: z
                .array(z.string().regex(/^fnc_[0-9A-HJKMNP-TV-Z]{26}$/))
                .optional(),
              issuedAt: z.string().datetime({ offset: true }),
            })
            .passthrough()
        ),
        nextCursor: z.string().optional(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const GasCertificateCreate = z
  .object({
    buildId: z.string().regex(/^bld_[0-9A-HJKMNP-TV-Z]{26}$/),
    failClosed: z.boolean().optional().default(true),
    assumptions: z.record(z.number()).optional(),
  })
  .passthrough();
const GasCertificateResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^crt_[0-9A-HJKMNP-TV-Z]{26}$/),
        buildId: z.string().regex(/^bld_[0-9A-HJKMNP-TV-Z]{26}$/),
        bytecodeHash: z.string(),
        analyserVersion: z.string(),
        gasScheduleVersion: z.string(),
        status: z.enum(['certified', 'partial', 'refused']),
        assumptions: z.record(z.number()).optional(),
        refusedReason: z.string().optional(),
        incompleteFunctionIds: z
          .array(z.string().regex(/^fnc_[0-9A-HJKMNP-TV-Z]{26}$/))
          .optional(),
        issuedAt: z.string().datetime({ offset: true }),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();

export const schemas: any = {
  issueGasCertificate_Body,
  BuildId,
  Problem,
  CertificateId,
  CertificateStatus,
  AssumptionSnapshot,
  FunctionId,
  GasCertificate,
  GasCertificateListData,
  ResponseMeta,
  GasCertificateListResponse,
  GasCertificateCreate,
  GasCertificateResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/certificates',
    alias: 'listGasCertificates',
    requestFormat: 'json',
    parameters: [
      {
        name: 'cursor',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'limit',
        type: 'Query',
        schema: z.number().int().gte(1).lte(100).optional().default(25),
      },
      {
        name: 'buildId',
        type: 'Query',
        schema: z
          .string()
          .regex(/^bld_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  id: z.string().regex(/^crt_[0-9A-HJKMNP-TV-Z]{26}$/),
                  buildId: z.string().regex(/^bld_[0-9A-HJKMNP-TV-Z]{26}$/),
                  bytecodeHash: z.string(),
                  analyserVersion: z.string(),
                  gasScheduleVersion: z.string(),
                  status: z.enum(['certified', 'partial', 'refused']),
                  assumptions: z.record(z.number()).optional(),
                  refusedReason: z.string().optional(),
                  incompleteFunctionIds: z
                    .array(z.string().regex(/^fnc_[0-9A-HJKMNP-TV-Z]{26}$/))
                    .optional(),
                  issuedAt: z.string().datetime({ offset: true }),
                })
                .passthrough()
            ),
            nextCursor: z.string().optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v1/certificates',
    alias: 'issueGasCertificate',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: issueGasCertificate_Body,
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^crt_[0-9A-HJKMNP-TV-Z]{26}$/),
            buildId: z.string().regex(/^bld_[0-9A-HJKMNP-TV-Z]{26}$/),
            bytecodeHash: z.string(),
            analyserVersion: z.string(),
            gasScheduleVersion: z.string(),
            status: z.enum(['certified', 'partial', 'refused']),
            assumptions: z.record(z.number()).optional(),
            refusedReason: z.string().optional(),
            incompleteFunctionIds: z
              .array(z.string().regex(/^fnc_[0-9A-HJKMNP-TV-Z]{26}$/))
              .optional(),
            issuedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Malformed request`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 422,
        description: `Semantically invalid request (e.g. PACK_EMPTY)`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'get',
    path: '/v1/certificates/:certificateId',
    alias: 'getGasCertificate',
    requestFormat: 'json',
    parameters: [
      {
        name: 'certificateId',
        type: 'Path',
        schema: z.string().regex(/^crt_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^crt_[0-9A-HJKMNP-TV-Z]{26}$/),
            buildId: z.string().regex(/^bld_[0-9A-HJKMNP-TV-Z]{26}$/),
            bytecodeHash: z.string(),
            analyserVersion: z.string(),
            gasScheduleVersion: z.string(),
            status: z.enum(['certified', 'partial', 'refused']),
            assumptions: z.record(z.number()).optional(),
            refusedReason: z.string().optional(),
            incompleteFunctionIds: z
              .array(z.string().regex(/^fnc_[0-9A-HJKMNP-TV-Z]{26}$/))
              .optional(),
            issuedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
]);

export const api: any = new Zodios('https://api.ceilgas.local/v1', endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
