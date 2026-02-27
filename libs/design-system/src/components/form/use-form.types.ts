import type { StandardSchemaV1 } from '@standard-schema/spec'

export type TFormValues = Record<string, unknown>
export type Schema = StandardSchemaV1<TFormValues>
