import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createMonitor_Body = z
  .object({
    certificateId: z.string().regex(/^crt_[0-9A-HJKMNP-TV-Z]{26}$/),
    metricName: z.string(),
    threshold: z.number(),
  })
  .passthrough();
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
const MonitorId = z.string();
const CertificateId = z.string();
const MonitorStatus = z.enum(['active', 'paused', 'breached']);
const AssumptionMonitor = z
  .object({
    id: z.string().regex(/^mon_[0-9A-HJKMNP-TV-Z]{26}$/),
    certificateId: z.string().regex(/^crt_[0-9A-HJKMNP-TV-Z]{26}$/),
    metricName: z.string(),
    threshold: z.number(),
    status: z.enum(['active', 'paused', 'breached']),
    lastObservedValue: z.number().optional(),
    proximityRatio: z.number().optional(),
    createdAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const AssumptionMonitorListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^mon_[0-9A-HJKMNP-TV-Z]{26}$/),
          certificateId: z.string().regex(/^crt_[0-9A-HJKMNP-TV-Z]{26}$/),
          metricName: z.string(),
          threshold: z.number(),
          status: z.enum(['active', 'paused', 'breached']),
          lastObservedValue: z.number().optional(),
          proximityRatio: z.number().optional(),
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
const AssumptionMonitorListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^mon_[0-9A-HJKMNP-TV-Z]{26}$/),
              certificateId: z.string().regex(/^crt_[0-9A-HJKMNP-TV-Z]{26}$/),
              metricName: z.string(),
              threshold: z.number(),
              status: z.enum(['active', 'paused', 'breached']),
              lastObservedValue: z.number().optional(),
              proximityRatio: z.number().optional(),
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
const AssumptionMonitorCreate = z
  .object({
    certificateId: z.string().regex(/^crt_[0-9A-HJKMNP-TV-Z]{26}$/),
    metricName: z.string(),
    threshold: z.number(),
  })
  .passthrough();
const AssumptionMonitorResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^mon_[0-9A-HJKMNP-TV-Z]{26}$/),
        certificateId: z.string().regex(/^crt_[0-9A-HJKMNP-TV-Z]{26}$/),
        metricName: z.string(),
        threshold: z.number(),
        status: z.enum(['active', 'paused', 'breached']),
        lastObservedValue: z.number().optional(),
        proximityRatio: z.number().optional(),
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
const AlertId = z.string();
const MonitorAlert = z
  .object({
    id: z.string().regex(/^alt_[0-9A-HJKMNP-TV-Z]{26}$/),
    monitorId: z.string().regex(/^mon_[0-9A-HJKMNP-TV-Z]{26}$/),
    observedValue: z.number(),
    acknowledged: z.boolean().optional().default(false),
    createdAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const MonitorAlertListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^alt_[0-9A-HJKMNP-TV-Z]{26}$/),
          monitorId: z.string().regex(/^mon_[0-9A-HJKMNP-TV-Z]{26}$/),
          observedValue: z.number(),
          acknowledged: z.boolean().optional().default(false),
          createdAt: z.string().datetime({ offset: true }),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const MonitorAlertListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^alt_[0-9A-HJKMNP-TV-Z]{26}$/),
              monitorId: z.string().regex(/^mon_[0-9A-HJKMNP-TV-Z]{26}$/),
              observedValue: z.number(),
              acknowledged: z.boolean().optional().default(false),
              createdAt: z.string().datetime({ offset: true }),
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
  createMonitor_Body,
  Problem,
  MonitorId,
  CertificateId,
  MonitorStatus,
  AssumptionMonitor,
  AssumptionMonitorListData,
  ResponseMeta,
  AssumptionMonitorListResponse,
  AssumptionMonitorCreate,
  AssumptionMonitorResponse,
  AlertId,
  MonitorAlert,
  MonitorAlertListData,
  MonitorAlertListResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/monitors',
    alias: 'listMonitors',
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
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  id: z.string().regex(/^mon_[0-9A-HJKMNP-TV-Z]{26}$/),
                  certificateId: z
                    .string()
                    .regex(/^crt_[0-9A-HJKMNP-TV-Z]{26}$/),
                  metricName: z.string(),
                  threshold: z.number(),
                  status: z.enum(['active', 'paused', 'breached']),
                  lastObservedValue: z.number().optional(),
                  proximityRatio: z.number().optional(),
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
    path: '/v1/monitors',
    alias: 'createMonitor',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createMonitor_Body,
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
            id: z.string().regex(/^mon_[0-9A-HJKMNP-TV-Z]{26}$/),
            certificateId: z.string().regex(/^crt_[0-9A-HJKMNP-TV-Z]{26}$/),
            metricName: z.string(),
            threshold: z.number(),
            status: z.enum(['active', 'paused', 'breached']),
            lastObservedValue: z.number().optional(),
            proximityRatio: z.number().optional(),
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
    ],
  },
  {
    method: 'get',
    path: '/v1/monitors/:monitorId/alerts',
    alias: 'listMonitorAlerts',
    requestFormat: 'json',
    parameters: [
      {
        name: 'monitorId',
        type: 'Path',
        schema: z.string().regex(/^mon_[0-9A-HJKMNP-TV-Z]{26}$/),
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
                  id: z.string().regex(/^alt_[0-9A-HJKMNP-TV-Z]{26}$/),
                  monitorId: z.string().regex(/^mon_[0-9A-HJKMNP-TV-Z]{26}$/),
                  observedValue: z.number(),
                  acknowledged: z.boolean().optional().default(false),
                  createdAt: z.string().datetime({ offset: true }),
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
]);

export const api: any = new Zodios('https://api.ceilgas.local/v1', endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
