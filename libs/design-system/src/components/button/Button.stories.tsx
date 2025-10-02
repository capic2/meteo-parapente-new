import type { Meta, StoryObj } from '@storybook/react-vite';

import type { ButtonProps } from './Button';

import { expect, fn, userEvent, within } from 'storybook/test';

import { Button } from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Actions/Button',
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    layout: 'centered',
    actions: { disable: true },
  },
  tags: ['autodocs', 'dd-privacy:allow'],
};
export default meta;

type Story = StoryObj<typeof Button>;

// Helper type to ensure proper variant/color combinations
type ButtonPropsWithVariant<T extends ButtonProps['variant']> = Extract<
  ButtonProps,
  { variant: T }
>;

export const Default: Story = {
  args: {
    children: 'Hello button!',
    color: 'primary',
    variant: 'primary',
  },
  parameters: {
    actions: { disable: false },
  },
};

/**
 * The `primary` variant is the default button style. Use it for the most important actions in your UI. It supports three colors: `primary`, `warning`, and `danger`.
 */
export const Primary: Story = {
  args: {
    variant: 'primary' as const,
    children: 'Hello button!',
    color: 'primary',
  },
  argTypes: {
    variant: {
      control: {
        disable: true,
      },
    },
    color: {
      control: {
        disable: true,
      },
    },
  },
  render: () => {
    return (
      <div className="uy:flex uy:gap-300">
        <Button variant="primary" color="primary">
          Primary
        </Button>
        <Button variant="primary" color="warning">
          Warning
        </Button>
        <Button variant="primary" color="danger">
          Danger
        </Button>
        <Button variant="primary" color="inverted">
          Inverted
        </Button>
      </div>
    );
  },
};

export const PrimaryHover: Story = {
  args: {
    variant: 'primary',
    children: 'Hello button!',
    color: 'primary',
  },
  argTypes: {
    variant: {
      control: {
        disable: true,
      },
    },
    color: {
      options: ['primary', 'danger', 'warning', 'inverted'],
    },
  },
  parameters: {
    pseudo: { hover: true },
  },
  tags: ['!autodocs', 'dev'],
};

export const PrimaryFocus: Story = {
  args: {
    variant: 'primary',
    children: 'Hello button!',
    color: 'primary',
  },
  argTypes: {
    variant: {
      control: {
        disable: true,
      },
    },
    color: {
      options: ['primary', 'danger', 'warning', 'inverted'],
    },
  },
  parameters: {
    pseudo: { focusVisible: true },
  },
  tags: ['!autodocs', 'dev'],
};

export const PrimaryActive: Story = {
  args: {
    variant: 'primary',
    children: 'Hello button!',
    color: 'primary',
  },
  argTypes: {
    variant: {
      control: {
        disable: true,
      },
    },
    color: {
      options: ['primary', 'danger', 'warning', 'inverted'],
    },
  },
  parameters: {
    pseudo: { active: true },
  },
  tags: ['!autodocs', 'dev'],
};

export const PrimaryDisabled: Story = {
  args: {
    variant: 'primary',
    children: 'Hello button!',
    color: 'primary',
    isDisabled: true,
  },
  argTypes: {
    variant: {
      control: {
        disable: true,
      },
    },
    color: {
      options: ['primary', 'danger', 'warning', 'inverted'],
    },
  },
  tags: ['!autodocs', 'dev'],
};

export const PrimaryLoading: Story = {
  args: {
    variant: 'primary',
    children: 'Hello button!',
    color: 'primary',
    isLoading: true,
  },
  argTypes: {
    variant: {
      control: {
        disable: true,
      },
    },
    color: {
      options: ['primary', 'danger', 'warning', 'inverted'],
    },
  },
  tags: ['!autodocs', 'dev'],
};

/**
 * The `secondary` variant is a less prominent button style. Use it for secondary actions. It only supports the `primary` color.
 */
export const Secondary: Story = {
  args: {
    variant: 'secondary' as const,
    children: 'Hello button!',
    color: 'primary',
  },
  argTypes: {
    variant: {
      control: {
        disable: true,
      },
    },
    color: {
      control: {
        disable: true,
      },
    },
  },
  render: () => (
    <div className="uy:flex uy:gap-300">
      <div className="uy:px-100 uy:py-100">
        <Button variant="secondary" color="primary">
          Primary
        </Button>
      </div>
      <div className="uy:bg-surface-primary uy:px-100 uy:py-100">
        <Button variant="secondary" color="inverted">
          Inverted
        </Button>
      </div>
    </div>
  ),
};

export const SecondaryHover: Story = {
  args: {
    variant: 'secondary',
    children: 'Hello button!',
    color: 'primary',
  },
  argTypes: {
    variant: {
      control: {
        disable: true,
      },
    },
    color: {
      options: ['primary', 'inverted'],
    },
  },
  parameters: {
    pseudo: { hover: true },
  },
  tags: ['!autodocs', 'dev'],
};

export const SecondaryFocus: Story = {
  args: {
    variant: 'secondary',
    children: 'Hello button!',
    color: 'primary',
  },
  argTypes: {
    variant: {
      control: {
        disable: true,
      },
    },
    color: {
      options: ['primary', 'inverted'],
    },
  },
  parameters: {
    pseudo: { focusVisible: true },
  },
  tags: ['!autodocs', 'dev'],
};

export const SecondaryActive: Story = {
  args: {
    variant: 'secondary',
    children: 'Hello button!',
    color: 'primary',
  },
  argTypes: {
    variant: {
      control: {
        disable: true,
      },
    },
    color: {
      options: ['primary', 'inverted'],
    },
  },
  parameters: {
    pseudo: { active: true },
  },
  tags: ['!autodocs', 'dev'],
};

export const SecondaryDisabled: Story = {
  args: {
    variant: 'secondary',
    children: 'Hello button!',
    color: 'primary',
    isDisabled: true,
  },
  argTypes: {
    variant: {
      control: {
        disable: true,
      },
    },
    color: {
      options: ['primary', 'inverted'],
    },
  },
  tags: ['!autodocs', 'dev'],
};

export const SecondaryLoading: Story = {
  args: {
    variant: 'secondary',
    children: 'Hello button!',
    color: 'primary',
    isLoading: true,
  },
  argTypes: {
    variant: {
      control: {
        disable: true,
      },
    },
    color: {
      options: ['primary', 'inverted'],
    },
  },
  tags: ['!autodocs', 'dev'],
};

/**
 * The `ghost` variant is a minimal button style. Use it for tertiary actions or less important actions in your UI. It supports four colors: `primary`, `warning`, `danger`, and `neutral`.
 */
export const Ghost: Story = {
  args: {
    variant: 'ghost' as const,
    children: 'Hello button!',
    color: 'primary',
  },
  argTypes: {
    variant: {
      control: {
        disable: true,
      },
    },
    color: {
      control: {
        disable: true,
      },
    },
  },
  render: (args) => {
    return (
      <div className="uy:grid uy:grid-cols-5 uy:gap-100 uy:items-center">
        <Button variant="ghost" color="primary">
          Primary
        </Button>
        <Button variant="ghost" color="warning">
          Warning
        </Button>
        <Button variant="ghost" color="danger">
          Danger
        </Button>
        <Button variant="ghost" color="neutral">
          Neutral
        </Button>
        <div className="uy:bg-grayscale-l12 uy:px-100 uy:py-100">
          <Button variant="ghost" color="inverted">
            Inverted
          </Button>
        </div>
      </div>
    );
  },
};

export const GhostHover: Story = {
  args: {
    variant: 'ghost',
    children: 'Hello button!',
    color: 'primary',
  },
  argTypes: {
    variant: {
      control: {
        disable: true,
      },
    },
    color: {
      options: ['primary', 'neutral', 'danger', 'warning'],
    },
  },
  parameters: {
    pseudo: { hover: true },
  },
  tags: ['!autodocs', 'dev'],
};

export const GhostFocus: Story = {
  args: {
    variant: 'ghost',
    children: 'Hello button!',
    color: 'primary',
  },
  argTypes: {
    variant: {
      control: {
        disable: true,
      },
    },
    color: {
      options: ['primary', 'neutral', 'danger', 'warning'],
    },
  },
  parameters: {
    pseudo: { focusVisible: true },
  },
  tags: ['!autodocs', 'dev'],
};

export const GhostActive: Story = {
  args: {
    variant: 'ghost',
    children: 'Hello button!',
    color: 'primary',
  },
  argTypes: {
    variant: {
      control: {
        disable: true,
      },
    },
    color: {
      options: ['primary', 'neutral', 'danger', 'warning'],
    },
  },
  parameters: {
    pseudo: { active: true },
  },
  tags: ['!autodocs', 'dev'],
};

export const GhostDisabled: Story = {
  args: {
    variant: 'ghost',
    children: 'Hello button!',
    color: 'primary',
    isDisabled: true,
  },
  argTypes: {
    variant: {
      control: {
        disable: true,
      },
    },
    color: {
      options: ['primary', 'neutral', 'danger', 'warning'],
    },
  },
  tags: ['!autodocs', 'dev'],
};

export const GhostLoading: Story = {
  args: {
    variant: 'ghost',
    children: 'Hello button!',
    color: 'primary',
    isLoading: true,
  },
  argTypes: {
    variant: {
      control: {
        disable: true,
      },
    },
    color: {
      options: ['primary', 'neutral', 'danger', 'warning'],
    },
  },
  tags: ['!autodocs', 'dev'],
};

/**
 * The `inverted` color is a special color variant that can be used with the `primary`, `secondary` and 'ghost' variants. It is designed to be used on dark backgrounds.
 */
export const ColorInverted: Story = {
  args: {
    children: 'Hello button!',
    color: 'inverted',
  },
  globals: {
    backgrounds: { value: 'dark' },
  },
  argTypes: {
    variant: {
      control: {
        disable: true,
      },
    },
    color: {
      control: {
        disable: true,
      },
    },
  },
  render: (args) => {
    return (
      <div className="uy:grid uy:grid-cols-3 uy:gap-100">
        <Button
          //@ts-expect-error – REACT-18-MIGRATION
          {...(args as ButtonPropsWithVariant<'primary'>)}
          variant="primary"
          color="inverted"
        />
        <Button
          //@ts-expect-error – REACT-18-MIGRATION
          {...(args as ButtonPropsWithVariant<'secondary'>)}
          variant="secondary"
          color="inverted"
        />
        <Button
          //@ts-expect-error – REACT-18-MIGRATION
          {...(args as ButtonPropsWithVariant<'ghost'>)}
          variant="ghost"
          color="inverted"
        />
      </div>
    );
  },
};

/**
 * The `full` size is a special size variant that makes the button take up the full width of its container. By default, buttons only take the minimum width necessary to display their content.
 */
export const FullWidth: Story = {
  args: {
    variant: 'primary' as const,
    color: 'primary',
    size: 'full',
    children: 'Hello button!',
  },
  parameters: {
    layout: 'padded',
  },
};

/**
 * Buttons support a `prefixIcon` prop that allows you to add an icon to the left of the button's text. The icon has to be one of the icons from the Unity Icons package.
 */
export const WithIcon: Story = {
  args: {
    variant: 'primary' as const,
    color: 'primary',
    children: 'Hello button!',
    prefixIcon: 'GearSparkleFilled',
  },
};

/**
 * You can disable a button by setting the `isDisabled` prop to `true`. This will prevent the button from being clicked or focused and will change its appearance to indicate that it is disabled.
 */
export const Disabled: Story = {
  args: {
    children: 'Hello button!',
    color: 'primary',
    isDisabled: true,
  },
  argTypes: {
    variant: {
      control: {
        disable: true,
      },
    },
    color: {
      control: {
        disable: true,
      },
    },
  },
  render: (args) => {
    return (
      <div className="uy:grid uy:grid-cols-3 uy:gap-100">
        <Button
          // @ts-expect-error – REACT-18-MIGRATION
          {...(args as ButtonPropsWithVariant<'primary'>)}
          variant="primary"
        />
        <Button
          // @ts-expect-error – REACT-18-MIGRATION
          {...(args as ButtonPropsWithVariant<'secondary'>)}
          variant="secondary"
        />
        <Button
          //@ts-expect-error – REACT-18-MIGRATION
          {...(args as ButtonPropsWithVariant<'ghost'>)}
          variant="ghost"
        />
      </div>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const button = canvas.getAllByRole('button')[0];

    if (!button) {
      throw new Error('Button not found');
    }

    await step('Verify button is disabled', async () => {
      await expect(button).toBeDisabled();
    });

    await step('Verify button cannot be focused', async () => {
      await userEvent.tab();
      //@ts-expect-error I don't know why
      await expect(document.activeElement).not.toBe(button);
    });

    await step('Verify button does not respond to clicks', async () => {
      await userEvent.click(button);
      await expect(button).toBeDisabled();
    });
  },
};

/**
 * You can set the `isLoading` prop to `true` to show a loading spinner in place of the button's content. This is useful when you need to indicate that an action is in progress. Setting `isLoading` to `true` will also disable the button.
 */
export const Loading: Story = {
  args: {
    variant: 'primary' as const,
    children: 'Hello button!',
    color: 'primary',
    isLoading: true,
  },
  argTypes: {
    variant: {
      control: {
        disable: true,
      },
    },
    color: {
      control: {
        disable: true,
      },
    },
  },
  parameters: {
    chromatic: {
      prefersReducedMotion: 'reduce',
    },
  },
  render: (args) => {
    return (
      <div className="uy:grid uy:grid-cols-3 uy:gap-100">
        <Button
          //@ts-expect-error – REACT-18-MIGRATION
          {...(args as ButtonPropsWithVariant<'primary'>)}
          variant="primary"
          color="primary"
        />
        <Button
          //@ts-expect-error – REACT-18-MIGRATION
          {...(args as ButtonPropsWithVariant<'secondary'>)}
          variant="secondary"
          color="primary"
        />
        <Button
          // @ts-expect-error – REACT-18-MIGRATION
          {...(args as ButtonPropsWithVariant<'ghost'>)}
          variant="ghost"
          color="primary"
        />
      </div>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const button = canvas.getAllByRole('button')[0];

    if (!button) {
      throw new Error('Button not found');
    }

    await step('Verify loading state', async () => {
      await expect(button).toBeDisabled();

      const spinner = within(button).getByRole('status');
      await expect(spinner).toBeInTheDocument();
    });

    await step(
      'Verify loading button does not respond to interaction',
      async () => {
        await userEvent.click(button);
        await expect(button).toBeDisabled();

        await userEvent.tab();
        //@ts-expect-error I don't know why
        await expect(document.activeElement).not.toBe(button);
      }
    );
  },
};

/**
 * Buttons are accessible by default. They support keyboard navigation, focus styles, and screen reader announcements. Users can also interact with them with the mouse, or activate them using the `Enter` or `Space` keys.
 */
export const AccessibilityTests: Story = {
  name: '[Test] Accessibility',
  args: {
    variant: 'primary',
    children: 'Accessible Button',
    color: 'primary',
    onPress: fn(),
  },
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: { codePanel: false },
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Accessible Button' });

    // Test mouse interaction
    await step('Mouse click interaction', async () => {
      await userEvent.click(button);
      await expect(args.onPress).toHaveBeenCalled();
    });

    // Test focus handling
    await step('Focus interaction', async () => {
      //@ts-expect-error I don't know why
      button.blur();
      await userEvent.tab();
      //@ts-expect-error I don't know why
      await expect(document.activeElement).toBe(button);
      //@ts-expect-error I don't know why
      button.blur();
      //@ts-expect-error I don't know why
      await expect(document.activeElement).not.toBe(button);
    });

    // Test keyboard interactions
    await step('Keyboard Enter press', async () => {
      //@ts-expect-error I don't know why
      button.focus();
      await userEvent.keyboard('[Enter]');
      await expect(args.onPress).toHaveBeenCalled();
      //@ts-expect-error I don't know why
      button.blur();
    });

    await step('Keyboard Space press', async () => {
      //@ts-expect-error I don't know why
      button.focus();
      await userEvent.keyboard('[Space]');
      await expect(args.onPress).toHaveBeenCalled();
      //@ts-expect-error I don't know why
      button.blur();
    });
  },
};
