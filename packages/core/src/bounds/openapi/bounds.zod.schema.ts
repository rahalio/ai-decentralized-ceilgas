import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const FunctionId = z.string();
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
const BoundId = z.string();
const BuildId = z.string();
const BoundStatus = z.enum(['proven', 'incomplete']);
const IncompletenessClass = z.enum([
  'none',
  'dont_know',
  'maximization',
  'ranking_function',
  'cover_point',
  'timeout',
]);
const GasBound = z
  .object({
    id: z.string().regex(/^bnd_[0-9A-HJKMNP-TV-Z]{26}$/),
    functionId: z.string().regex(/^fnc_[0-9A-HJKMNP-TV-Z]{26}$/),
    buildId: z
      .string()
      .regex(/^bld_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    status: z.enum(['proven', 'incomplete']),
    opcodeBoundFormula: z.string().optional(),
    memoryBoundFormula: z.string().optional(),
    incompletenessClass: z.enum([
      'none',
      'dont_know',
      'maximization',
      'ranking_function',
      'cover_point',
      'timeout',
    ]),
    residualRiskNote: z.string().optional(),
    nonConstantPolicyFlag: z.boolean().optional(),
    analysedAt: z.string().datetime({ offset: true }).optional(),
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
const GasBoundResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^bnd_[0-9A-HJKMNP-TV-Z]{26}$/),
        functionId: z.string().regex(/^fnc_[0-9A-HJKMNP-TV-Z]{26}$/),
        buildId: z
          .string()
          .regex(/^bld_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
        status: z.enum(['proven', 'incomplete']),
        opcodeBoundFormula: z.string().optional(),
        memoryBoundFormula: z.string().optional(),
        incompletenessClass: z.enum([
          'none',
          'dont_know',
          'maximization',
          'ranking_function',
          'cover_point',
          'timeout',
        ]),
        residualRiskNote: z.string().optional(),
        nonConstantPolicyFlag: z.boolean().optional(),
        analysedAt: z.string().datetime({ offset: true }).optional(),
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
const GasBoundListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^bnd_[0-9A-HJKMNP-TV-Z]{26}$/),
          functionId: z.string().regex(/^fnc_[0-9A-HJKMNP-TV-Z]{26}$/),
          buildId: z
            .string()
            .regex(/^bld_[0-9A-HJKMNP-TV-Z]{26}$/)
            .optional(),
          status: z.enum(['proven', 'incomplete']),
          opcodeBoundFormula: z.string().optional(),
          memoryBoundFormula: z.string().optional(),
          incompletenessClass: z.enum([
            'none',
            'dont_know',
            'maximization',
            'ranking_function',
            'cover_point',
            'timeout',
          ]),
          residualRiskNote: z.string().optional(),
          nonConstantPolicyFlag: z.boolean().optional(),
          analysedAt: z.string().datetime({ offset: true }).optional(),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const GasBoundListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^bnd_[0-9A-HJKMNP-TV-Z]{26}$/),
              functionId: z.string().regex(/^fnc_[0-9A-HJKMNP-TV-Z]{26}$/),
              buildId: z
                .string()
                .regex(/^bld_[0-9A-HJKMNP-TV-Z]{26}$/)
                .optional(),
              status: z.enum(['proven', 'incomplete']),
              opcodeBoundFormula: z.string().optional(),
              memoryBoundFormula: z.string().optional(),
              incompletenessClass: z.enum([
                'none',
                'dont_know',
                'maximization',
                'ranking_function',
                'cover_point',
                'timeout',
              ]),
              residualRiskNote: z.string().optional(),
              nonConstantPolicyFlag: z.boolean().optional(),
              analysedAt: z.string().datetime({ offset: true }).optional(),
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

export const schemas: any = {
  FunctionId,
  Problem,
  BoundId,
  BuildId,
  BoundStatus,
  IncompletenessClass,
  GasBound,
  ResponseMeta,
  GasBoundResponse,
  GasBoundListData,
  GasBoundListResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/bounds',
    alias: 'listBounds',
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
      {
        name: 'incompletenessOnly',
        type: 'Query',
        schema: z.boolean().optional().default(false),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  id: z.string().regex(/^bnd_[0-9A-HJKMNP-TV-Z]{26}$/),
                  functionId: z.string().regex(/^fnc_[0-9A-HJKMNP-TV-Z]{26}$/),
                  buildId: z
                    .string()
                    .regex(/^bld_[0-9A-HJKMNP-TV-Z]{26}$/)
                    .optional(),
                  status: z.enum(['proven', 'incomplete']),
                  opcodeBoundFormula: z.string().optional(),
                  memoryBoundFormula: z.string().optional(),
                  incompletenessClass: z.enum([
                    'none',
                    'dont_know',
                    'maximization',
                    'ranking_function',
                    'cover_point',
                    'timeout',
                  ]),
                  residualRiskNote: z.string().optional(),
                  nonConstantPolicyFlag: z.boolean().optional(),
                  analysedAt: z.string().datetime({ offset: true }).optional(),
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
    method: 'get',
    path: '/v1/functions/:functionId/bounds',
    alias: 'getFunctionBounds',
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
            id: z.string().regex(/^bnd_[0-9A-HJKMNP-TV-Z]{26}$/),
            functionId: z.string().regex(/^fnc_[0-9A-HJKMNP-TV-Z]{26}$/),
            buildId: z
              .string()
              .regex(/^bld_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            status: z.enum(['proven', 'incomplete']),
            opcodeBoundFormula: z.string().optional(),
            memoryBoundFormula: z.string().optional(),
            incompletenessClass: z.enum([
              'none',
              'dont_know',
              'maximization',
              'ranking_function',
              'cover_point',
              'timeout',
            ]),
            residualRiskNote: z.string().optional(),
            nonConstantPolicyFlag: z.boolean().optional(),
            analysedAt: z.string().datetime({ offset: true }).optional(),
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
