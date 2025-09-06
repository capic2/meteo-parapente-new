import z from 'zod';

const meteoPropertyValue = z
  .string()
  .or(z.number())
  .or(z.array(z.string()))
  .or(z.array(z.number()));

const meteoProperty = z.object({
  label: z.string(),
  unit: z.string().optional(),
  ranges: z
    .record(
      z.string().regex(/[0-9]{2} - [0-9]{2}/),
      z.object({
        meteoBlue: meteoPropertyValue,
        meteoParapente: meteoPropertyValue.optional(),
      })
    )
    .optional(),
});

const propertyWithSubPropertiesSchema = z.object({
  label: z.string(),
  unit: z.string().optional(),
  properties: z.record(z.string(), meteoProperty),
});

export const meteoDataSchema = z.record(
  z.string(),
  z.union([propertyWithSubPropertiesSchema, meteoProperty])
)

export const meteoSchema = z.object({
  structure: z.object({
    hourRanges: z
      .string()
      .regex(/[0-9]{2} - [0-9]{2}/)
      .array(),
    properties: z.string().array(),
  }),
  data: z.record(
    z.string().regex(/[0-9]{8}/),
    meteoDataSchema
  ),
});

export type MeteoPropertyValueType = z.infer<typeof meteoPropertyValue>;
export type MeteoType = z.infer<typeof meteoSchema>;
export type MeteoPropertyType = z.infer<typeof meteoProperty>;
export type MeteoPropertyWithSubPropertiesType = z.infer<
  typeof propertyWithSubPropertiesSchema
>;
export type MeteoDataType = z.infer<typeof meteoDataSchema>;
