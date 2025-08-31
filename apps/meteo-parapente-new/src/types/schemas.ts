import z from 'zod';

const meteoProperty = z.object({
  label: z.string(),
  unit: z.string().optional(),
  ranges: z.record(
    z.string().regex(/[0-9]{2} - [0-9]{2}/),
    z.object({
      meteoBlue: z.string().or(z.number()),
      meteoParapente: z.string().or(z.number()).optional(),
    })
  ),
});

const propertyWithSubPropertiesSchema = z.object({
    label: z.string(),
    unit: z.string().optional(),
    properties: z.record(z.string(), meteoProperty),
  })

export const meteoSchema = z.object({
  structure: z.object({
    hourRanges: z
      .string()
      .regex(/[0-9]{2} - [0-9]{2}/)
      .array(),
    properties: z.string().array(),
  }),
  data: z.record(
    z.string(),
    z.union([
      propertyWithSubPropertiesSchema,
      meteoProperty,
    ])
  ),
});

export type MeteoType = z.infer<typeof meteoSchema>;
export type MeteoProperty = z.infer<typeof meteoProperty>;
export type MeteoPropertyWithSubPropertiesType = z.infer<typeof propertyWithSubPropertiesSchema>;
