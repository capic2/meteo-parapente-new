import z from 'zod';

export const structureMeteoResponseSchema = z.object({
  hourRanges: z
    .string()
    .regex(/[0-9]{2}-[0-9]{2}/)
    .array(),
  properties: z
    .object({
      id: z.string(),
      label: z.string(),
      properties: z
        .object({ id: z.string(), label: z.string() })
        .array()
        .optional(),
    })
    .array(),
});
export const structureMeteoQuerySchema = z.object({
  hourRanges: z
    .string()
    .regex(/[0-9]{2}-[0-9]{2}/)
    .array()
    .transform((value) => value.join(',')),
  propertyIds: z
    .string()
    .array()
    .transform((value) => value.join(',')),
});

export const dataMeteoQueryInputSchema = z.object({
  startDate: z.string().regex(/^\d{4}\d{2}\d{2}$/),
  lat: z.number(),
  lon: z.number(),
  hourRanges: z
    .string()
    .regex(/[0-9]{2}-[0-9]{2}/)
    .array()
    .transform((value) => value.join(',')).optional(),
  propertyIds: z
    .string()
    .array()
    .transform((value) => value.join(',')).optional(),
});

export const dataMeteoQueryOutputSchema = z.object({
  startDate: z.string().regex(/^\d{4}\d{2}\d{2}$/),
  lat: z.number(),
  lon: z.number(),
  hourRanges: z.string().transform((value) => value.split(',')),
  propertyIds: z.string().transform((value) => value.split(',')),
});

const meteoData = z
  .string()
  .or(z.number())
  .or(z.array(z.string()))
  .or(z.array(z.number()));

const meteoProperty = z.object({
  unit: z.string().optional(),
  ranges: z.record(
    z.string().regex(/[0-9]{2}-[0-9]{2}/),
    z.object({
      meteoBlue: meteoData.optional(),
      meteoParapente: meteoData.optional(),
    })
  ),
});

const propertyWithSubPropertiesSchema = z.object({
  unit: z.string().optional(),
  properties: z.record(z.string(), meteoProperty),
});

export const meteoSchema = z.record(
  z.string(),
  z.union([propertyWithSubPropertiesSchema, meteoProperty])
);

export type StructureMeteoResponseType = z.infer<
  typeof structureMeteoResponseSchema
>;
export type StructureMeteoQueryType = z.infer<typeof structureMeteoQuerySchema>;
export type DataMeteoQueryInputType = z.infer<typeof dataMeteoQueryInputSchema>;
export type DataMeteoQueryOutputType = z.infer<typeof dataMeteoQueryOutputSchema>;
export type MeteoDataType = z.infer<typeof meteoData>;
export type MeteoType = z.infer<typeof meteoSchema>;
export type MeteoPropertyType = z.infer<typeof meteoProperty>;
export type MeteoPropertyWithSubPropertiesType = z.infer<
  typeof propertyWithSubPropertiesSchema
>;
