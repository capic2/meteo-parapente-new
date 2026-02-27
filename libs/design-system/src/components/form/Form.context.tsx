import { createContext, useContext } from 'react'

import type { PropsWithChildren } from 'react';
import { Schema } from './use-form.types';

interface FormContextValue<TSchema extends Schema> {
  schema: TSchema
}

export const FormContext =
  createContext<FormContextValue<Schema> | null>(null)

export function FormProvider<TSchema extends Schema>({
                                                            children,
                                                            schema,
                                                          }: PropsWithChildren<FormContextValue<TSchema>>) {
  return (
    <FormContext.Provider
      value={{
        schema,
      }}
    >
      {children}
    </FormContext.Provider>
  )
}

export function useFormProvider<TSchema extends Schema>() {
  const context = useContext(FormContext)
  if (!context) {
    throw new Error('useFormContext must be used within a Form component')
  }
  return context as unknown as FormContextValue<TSchema>
}
