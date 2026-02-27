import type { ComponentProps, FormEvent } from 'react';
import { forwardRef } from 'react';
import { useFormContext } from './use-form-context';

/**
 * `Form` is a form wrapper bound to the TanStack form context.
 * It prevents the default browser submission, delegates to the TanStack form
 * `handleSubmit`, and then invokes the provided `onSubmit` (if any).
 *
 * Behavior:
 * - `onSubmit` handler: prevents default, calls `form.handleSubmit(event)`, then
 *   forwards the event to the user-provided `onSubmit`.
 * - Exposes a standard `<form>` element API via `ComponentProps<'form'>`.
 *
 * Usage:
 * ```tsx
 * function Example() {
 *   const form = useTanstackUnityForm<{ name: string }>({ validators: {} })
 *   return (
 *     <Form>
 *       <form.AppField name="name">{() => <TanstackInput />}</form.AppField>
 *     </Form>
 *   )
 * }
 * ```
 */
const Form = forwardRef<HTMLFormElement, ComponentProps<'form'>>(
  ({ children, onSubmit, ...rest }, ref) => {
    const form = useFormContext()

    const submit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      event.stopPropagation()
      void form.handleSubmit(event)
      onSubmit?.(event)
    }

    return (
      <form data-dd-privacy="mask" onSubmit={submit} {...rest} ref={ref}>
        {children}
      </form>
    )
  },
)

Form.displayName = 'Form'

export { Form }
