import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createLimitRecommendation_Body = z
  .object({
    functionId: z.string().regex(/^fnc_[0-9A-HJKMNP-TV-Z]{26}$/),
    assumptions: z.record(z.number()),
    callbackContext: z.boolean().optional().default(false),
    safetyMarginPercent: z.number().gte(0).optional().default(0),
  })
  .passthrough();
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
const RecommendationId = z.string();
const AssumptionSet = z.record(z.number());
const LimitRecommendation = z
  .object({
    id: z.string().regex(/^rec_[0-9A-HJKMNP-TV-Z]{26}$/),
    functionId: z.string().regex(/^fnc_[0-9A-HJKMNP-TV-Z]{26}$/),
    recommendedGasLimit: z.number().int().gte(0),
    assumptions: z.record(z.number()).optional(),
    sound: z.boolean(),
    callbackContext: z.boolean().optional(),
    safetyMarginPercent: z.number().gte(0).optional(),
    createdAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const LimitRecommendationListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^rec_[0-9A-HJKMNP-TV-Z]{26}$/),
          functionId: z.string().regex(/^fnc_[0-9A-HJKMNP-TV-Z]{26}$/),
          recommendedGasLimit: z.number().int().gte(0),
          assumptions: z.record(z.number()).optional(),
          sound: z.boolean(),
          callbackContext: z.boolean().optional(),
          safetyMarginPercent: z.number().gte(0).optional(),
          createdAt: z.string().datetime({ offset: true }).optional(),
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
const LimitRecommendationListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^rec_[0-9A-HJKMNP-TV-Z]{26}$/),
              functionId: z.string().regex(/^fnc_[0-9A-HJKMNP-TV-Z]{26}$/),
              recommendedGasLimit: z.number().int().gte(0),
              assumptions: z.record(z.number()).optional(),
              sound: z.boolean(),
              callbackContext: z.boolean().optional(),
              safetyMarginPercent: z.number().gte(0).optional(),
              createdAt: z.string().datetime({ offset: true }).optional(),
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
const LimitRecommendationCreate = z
  .object({
    functionId: z.string().regex(/^fnc_[0-9A-HJKMNP-TV-Z]{26}$/),
    assumptions: z.record(z.number()),
    callbackContext: z.boolean().optional().default(false),
    safetyMarginPercent: z.number().gte(0).optional().default(0),
  })
  .passthrough();
const LimitRecommendationResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^rec_[0-9A-HJKMNP-TV-Z]{26}$/),
        functionId: z.string().regex(/^fnc_[0-9A-HJKMNP-TV-Z]{26}$/),
        recommendedGasLimit: z.number().int().gte(0),
        assumptions: z.record(z.number()).optional(),
        sound: z.boolean(),
        callbackContext: z.boolean().optional(),
        safetyMarginPercent: z.number().gte(0).optional(),
        createdAt: z.string().datetime({ offset: true }).optional(),
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
  createLimitRecommendation_Body,
  FunctionId,
  Problem,
  RecommendationId,
  AssumptionSet,
  LimitRecommendation,
  LimitRecommendationListData,
  ResponseMeta,
  LimitRecommendationListResponse,
  LimitRecommendationCreate,
  LimitRecommendationResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/recommendations',
    alias: 'listLimitRecommendations',
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
        name: 'functionId',
        type: 'Query',
        schema: z
          .string()
          .regex(/^fnc_[0-9A-HJKMNP-TV-Z]{26}$/)
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
                  id: z.string().regex(/^rec_[0-9A-HJKMNP-TV-Z]{26}$/),
                  functionId: z.string().regex(/^fnc_[0-9A-HJKMNP-TV-Z]{26}$/),
                  recommendedGasLimit: z.number().int().gte(0),
                  assumptions: z.record(z.number()).optional(),
                  sound: z.boolean(),
                  callbackContext: z.boolean().optional(),
                  safetyMarginPercent: z.number().gte(0).optional(),
                  createdAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/recommendations',
    alias: 'createLimitRecommendation',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createLimitRecommendation_Body,
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
            id: z.string().regex(/^rec_[0-9A-HJKMNP-TV-Z]{26}$/),
            functionId: z.string().regex(/^fnc_[0-9A-HJKMNP-TV-Z]{26}$/),
            recommendedGasLimit: z.number().int().gte(0),
            assumptions: z.record(z.number()).optional(),
            sound: z.boolean(),
            callbackContext: z.boolean().optional(),
            safetyMarginPercent: z.number().gte(0).optional(),
            createdAt: z.string().datetime({ offset: true }).optional(),
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
]);

export const api: any = new Zodios('https://api.ceilgas.local/v1', endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
