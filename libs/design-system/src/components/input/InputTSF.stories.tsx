import preview from '../../../.storybook/preview';

import { InputTSF } from './InputTSF';
import { z } from 'zod';
import { useAppForm } from '../form/use-form';

/**
 * Meta data for the `InputTSF` component.
 * This comment will show up as the main opening paragraph in Storybook's Autodocs.
 */
const meta = preview.meta({
  component: InputTSF,
  title: 'InputTSF',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
});

/**
 * Default story for the `InputTSF` component.
 * This comment will show up as the story's description in Storybook's Autodocs.
 */
export const Default = meta.story({
  parameters: {
    actions: { disable: true },
    chromatic: { disableSnapshot: true },
  },
  args: {
    // complete the args!
  },
  render: function Render() {
    const schema = z.object({
      name: z.string().min(1),
    });

    const form = useAppForm({
      validators: {
        onBlur: schema,
      },
    });

    return (
      <form.AppForm>
        <form.Form>
          <form.AppField name="name">
            {(field) => <field.Input />}
          </form.AppField>
        </form.Form>
      </form.AppForm>
    );
  },
});
