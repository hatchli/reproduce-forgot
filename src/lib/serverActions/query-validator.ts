import { z } from 'zod'
export const QueryValidator = z
  .object({
    category: z.string().optional(),
    restaurant: z.string().optional(),
    city: z.string(),
    sort: z.enum(['asc', 'desc']).optional(),
    limit: z.number().optional(),
    seats: z.coerce.number().nullable(),
    timeInterval: z.string().nullable(),
  })
  .transform(({ restaurant, city, ...rest }) => ({
    'restaurant.slug': restaurant,
    'restaurant.city.slug': city,
    ...rest,
  }))
export const QueryCityResoValidator = z
  .object({
    category: z.string().optional(),
    restaurant: z.string().optional(),
    city: z.string(),
    sort: z.enum(['asc', 'desc']).optional(),
    limit: z.number().optional(),
  })
  .transform(({ city, ...rest }) => ({
    'restaurant.city.slug': city,
    ...rest,
  }))

export const QueryResoValidator = z
  .object({
    // category: z.string().optional(),
    city: z.string(),
    sort: z.enum(['asc', 'desc']).optional(),
    limit: z.number().optional(),
    // filter: z.array(z.string().optional()).optional()
    // filter: z.string().array().optional()
  })
  .refine(({ city, ...rest }) => {
    // const spreadFilters = filter.map((item) => ({ [item]: true }));
    // console.log(spreadFilters);
    const ret = {
      'restaurant.city.slug': city,
      // ...spreadFilters,
      // day: filter.includes('tonight') ? true : null,
      // 'restaurant.trending': filter.includes('trending') ? true : undefined,
      ...rest,
    }
    return ret
  })

export const QueryValidatorOwned = z.object({
  sort: z.enum(['asc', 'desc']).optional(),
  limit: z.number().optional(),
  name: z.string().optional(),
})
export const QueryValidatorOrders = z.object({
  sort: z.enum(['asc', 'desc']).optional(),
  limit: z.number().optional(),
  name: z.string().optional(),
})

export type TQueryValidator = z.infer<typeof QueryValidator>
export type TQueryResoValidator = z.infer<typeof QueryResoValidator>
export type TQueryCityValidator = z.infer<typeof QueryCityResoValidator>
export type TQueryValidatorOwned = z.infer<typeof QueryValidatorOwned>
export type TQueryValidatorOrders = z.infer<typeof QueryValidatorOrders>
