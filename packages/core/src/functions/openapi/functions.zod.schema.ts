import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

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
const FunctionId = z.string();
const SizeMetric = z
  .object({
    name: z.string(),
    kind: z.enum(['input', 'storage', 'chain']),
    description: z.string().optional(),
  })
  .passthrough();
const PublicFunction = z
  .object({
    id: z.string().regex(/^fnc_[0-9A-HJKMNP-TV-Z]{26}$/),
    buildId: z.string().regex(/^bld_[0-9A-HJKMNP-TV-Z]{26}$/),
    name: z.string(),
    selector: z.string().optional(),
    isConstantGas: z.boolean().optional(),
    sizeMetrics: z
      .array(
        z
          .object({
            name: z.string(),
            kind: z.enum(['input', 'storage', 'chain']),
            description: z.string().optional(),
          })
          .passthrough()
      )
      .optional(),
    analysisStatus: z
      .enum(['pending', 'proven', 'incomplete', 'failed'])
      .optional(),
  })
  .passthrough();
const PublicFunctionListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^fnc_[0-9A-HJKMNP-TV-Z]{26}$/),
          buildId: z.string().regex(/^bld_[0-9A-HJKMNP-TV-Z]{26}$/),
          name: z.string(),
          selector: z.string().optional(),
          isConstantGas: z.boolean().optional(),
          sizeMetrics: z
            .array(
              z
                .object({
                  name: z.string(),
                  kind: z.enum(['input', 'storage', 'chain']),
                  description: z.string().optional(),
                })
                .passthrough()
            )
            .optional(),
          analysisStatus: z
            .enum(['pending', 'proven', 'incomplete', 'failed'])
            .optional(),
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
const PublicFunctionListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^fnc_[0-9A-HJKMNP-TV-Z]{26}$/),
              buildId: z.string().regex(/^bld_[0-9A-HJKMNP-TV-Z]{26}$/),
              name: z.string(),
              selector: z.string().optional(),
              isConstantGas: z.boolean().optional(),
              sizeMetrics: z
                .array(
                  z
                    .object({
                      name: z.string(),
                      kind: z.enum(['input', 'storage', 'chain']),
                      description: z.string().optional(),
                    })
                    .passthrough()
                )
                .optional(),
              analysisStatus: z
                .enum(['pending', 'proven', 'incomplete', 'failed'])
                .optional(),
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
const PublicFunctionResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^fnc_[0-9A-HJKMNP-TV-Z]{26}$/),
        buildId: z.string().regex(/^bld_[0-9A-HJKMNP-TV-Z]{26}$/),
        name: z.string(),
        selector: z.string().optional(),
        isConstantGas: z.boolean().optional(),
        sizeMetrics: z
          .array(
            z
              .object({
                name: z.string(),
                kind: z.enum(['input', 'storage', 'chain']),
                description: z.string().optional(),
              })
              .passthrough()
          )
          .optional(),
        analysisStatus: z
          .enum(['pending', 'proven', 'incomplete', 'failed'])
          .optional(),
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
  BuildId,
  Problem,
  FunctionId,
  SizeMetric,
  PublicFunction,
  PublicFunctionListData,
  ResponseMeta,
  PublicFunctionListResponse,
  PublicFunctionResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/builds/:buildId/functions',
    alias: 'listFunctions',
    requestFormat: 'json',
    parameters: [
      {
        name: 'buildId',
        type: 'Path',
        schema: z.string().regex(/^bld_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
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
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  id: z.string().regex(/^fnc_[0-9A-HJKMNP-TV-Z]{26}$/),
                  buildId: z.string().regex(/^bld_[0-9A-HJKMNP-TV-Z]{26}$/),
                  name: z.string(),
                  selector: z.string().optional(),
                  isConstantGas: z.boolean().optional(),
                  sizeMetrics: z
                    .array(
                      z
                        .object({
                          name: z.string(),
                          kind: z.enum(['input', 'storage', 'chain']),
                          description: z.string().optional(),
                        })
                        .passthrough()
                    )
                    .optional(),
                  analysisStatus: z
                    .enum(['pending', 'proven', 'incomplete', 'failed'])
                    .optional(),
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
  {
    method: 'get',
    path: '/v1/functions/:functionId',
    alias: 'getFunction',
    requestFormat: 'json',
    parameters: [
      {
        name: 'functionId',
        type: 'Path',
        schema: z.string().regex(/^fnc_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^fnc_[0-9A-HJKMNP-TV-Z]{26}$/),
            buildId: z.string().regex(/^bld_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string(),
            selector: z.string().optional(),
            isConstantGas: z.boolean().optional(),
            sizeMetrics: z
              .array(
                z
                  .object({
                    name: z.string(),
                    kind: z.enum(['input', 'storage', 'chain']),
                    description: z.string().optional(),
                  })
                  .passthrough()
              )
              .optional(),
            analysisStatus: z
              .enum(['pending', 'proven', 'incomplete', 'failed'])
              .optional(),
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
