import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps } from 'react';
import { GoAlert } from 'react-icons/go';

import {
  expect,
  fireEvent,
  fn,
  userEvent,
  waitFor,
  within,
} from 'storybook/test';

import { IconButton } from './IconButton';

const meta: Meta<typeof IconButton> = {
  component: IconButton,
  title: 'Actions/IconButton',
  parameters: {
    layout: 'centered',
  },
  args: {
    icon: GoAlert,
    variant: 'primary',
    color: 'primary',
    label: 'I am a label',
    onClick: () => {
      alert('Triggered');
    },
  },
  tags: ['autodocs', 'dd-privacy:allow'],
};
export default meta;

type Story = StoryObj<typeof IconButton>;

export const Primary: Story = {
  argTypes: {
    variant: {
      table: {
        disable: true,
      },
    },
    color: {
      table: {
        disable: true,
      },
    },
  },
  render: () => {
    return (
      <div className="flex gap-6">
        <div className="flex flex-col gap-1 justify-center items-center">
          <span>Primary</span>
          <IconButton
            variant="primary"
            color="primary"
            label="I am a label"
            icon={GoAlert}
            onClick={fn()}
          />
        </div>
        <div className="flex flex-col gap-1 justify-center items-center">
          <span>
            Danger
          </span>
          <IconButton
            variant="primary"
            color="danger"
            label="I am a label"
            icon={GoAlert}
            onClick={fn()}
          />
        </div>
        <div className="flex flex-col gap-1 justify-center items-center">
          <span>
            Warning
          </span>
          <IconButton
            variant="primary"
            color="warning"
            label="I am a label"
            icon={GoAlert}
            onClick={fn()}
          />
        </div>
        <div className="flex flex-col gap-1 justify-center items-center bg-surface-primary px-2 pb-2">
          <span>
            Inverted
          </span>
          <IconButton
            variant="primary"
            color="inverted"
            label="I am a label"
            icon={GoAlert}
            onClick={fn()}
          />
        </div>
      </div>
    );
  },
};

export const PrimaryHover: Story = {
  args: {
    variant: 'primary',
  },
  argTypes: {
    variant: {
      table: {
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

export const PrimaryActive: Story = {
  args: {
    variant: 'primary',
  },
  argTypes: {
    variant: {
      table: {
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
  args: { variant: 'primary', isDisabled: true },
  argTypes: {
    variant: {
      table: {
        disable: true,
      },
    },
    color: {
      options: ['primary', 'danger', 'warning', 'inverted'],
    },
  },
};

export const PrimaryLoading: Story = {
  args: { variant: 'primary', isLoading: true },
  argTypes: {
    variant: {
      table: {
        disable: true,
      },
    },
    color: {
      options: ['primary', 'danger', 'warning', 'inverted'],
    },
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
  argTypes: {
    variant: {
      table: {
        disable: true,
      },
    },
    color: {
      table: {
        disable: true,
      },
    },
  },
  render: () => {
    return (
      <div className="flex gap-6">
        <div className="flex flex-col gap-1 justify-center items-center">
          <span>
            Primary
          </span>
          <IconButton
            variant="secondary"
            color="primary"
            label="I am a label"
            icon={GoAlert}
            onClick={fn()}
          />
        </div>
        <div className="flex flex-col gap-1 justify-center items-center bg-surface-primary px-2 pb-2">
          <span >
            Inverted
          </span>
          <IconButton
            variant="secondary"
            color="inverted"
            label="I am a label"
            icon={GoAlert}
            onClick={fn()}
          />
        </div>
      </div>
    );
  },
};

export const SecondaryHover: Story = {
  args: {
    variant: 'secondary',
  },
  argTypes: {
    variant: {
      table: {
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

export const SecondaryActive: Story = {
  args: {
    variant: 'secondary',
  },
  argTypes: {
    variant: {
      table: {
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

export const SecondaryDisabled: Story = {
  args: { variant: 'secondary', isDisabled: true },
  argTypes: {
    variant: {
      table: {
        disable: true,
      },
    },
    color: {
      options: ['primary', 'danger', 'warning', 'inverted'],
    },
  },
  tags: ['!autodocs', 'dev'],
};

export const SecondaryLoading: Story = {
  args: { variant: 'secondary', isLoading: true },
  tags: ['!autodocs', 'dev'],
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
  },
  argTypes: {
    variant: {
      table: {
        disable: true,
      },
    },
    color: {
      table: {
        disable: true,
      },
    },
  },
  render: () => {
    return (
      <div className="flex gap-6">
        <div className="flex flex-col gap-1 justify-center items-center">
          <span>
            Primary
          </span>
          <IconButton
            variant="ghost"
            color="primary"
            label="I am a label"
            icon={GoAlert}
            onClick={fn()}
          />
        </div>
        <div className="flex flex-col gap-1 justify-center items-center">
          <span>
            Danger
          </span>
          <IconButton
            variant="ghost"
            color="danger"
            label="I am a label"
            icon={GoAlert}
            onClick={fn()}
          />
        </div>
        <div className="flex flex-col gap-1 justify-center items-center">
          <span >
            Warning
          </span>
          <IconButton
            variant="ghost"
            color="warning"
            label="I am a label"
            icon={GoAlert}
            onClick={fn()}
          />
        </div>
        <div className="flex flex-col gap-1 justify-center items-center px-2 pb-2">
          <span>
            Neutral
          </span>
          <IconButton
            variant="ghost"
            color="neutral"
            label="I am a label"
            icon={GoAlert}
            onClick={fn()}
          />
        </div>
        <div className="flex flex-col gap-1 justify-center items-center bg-surface-primary px-2 pb-2">
          <span>
            Inverted
          </span>
          <IconButton
            variant="ghost"
            color="inverted"
            label="I am a label"
            icon={GoAlert}
            onClick={fn()}
          />
        </div>
      </div>
    );
  },
};

export const GhostHover: Story = {
  args: {
    variant: 'ghost',
  },
  argTypes: {
    variant: {
      table: {
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

export const GhostActive: Story = {
  args: {
    variant: 'ghost',
  },
  argTypes: {
    variant: {
      table: {
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

export const GhostDisabled: Story = {
  args: { variant: 'ghost', isDisabled: true },
  tags: ['!autodocs', 'dev'],
};

export const GhostLoading: Story = {
  args: { variant: 'ghost', isLoading: true },
  tags: ['!autodocs', 'dev'],
};

export const WithColor: Story = {
  args: {
    color: 'inverted',
  },
};

/**
 * The `inverted` color is a special color variant that can be used with the `primary`, `secondary` and `ghost` variants. It is designed to be used on dark backgrounds.
 */
export const ColorInverted: Story = {
  args: {
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
        <IconButton {...args} variant="primary" color="inverted" />
        <IconButton {...args} variant="secondary" color="inverted" />
        <IconButton {...args} variant="ghost" color="inverted" />
      </div>
    );
  },
};

const HandlerClick = (args: ComponentProps<typeof IconButton>) => {
  const [events, setEvents] = useState<number>(0);

  return (
    <>
      <IconButton
        {...args}
        onClick={() => {
          setEvents((prevState) => prevState + 1);
        }}
      />
      <div className="uy:mt-150">onClick (x{events})</div>
    </>
  );
};

export const WithOnClick: Story = {
  render: (args) => <HandlerClick {...args} />,
};

export const OnClickTest: Story = {
  name: 'It triggers the onClick function when it is provided',
  args: {
    onClick: fn(),
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Click on the button', async () => {
      await userEvent.click(canvas.getByRole('button'));
    });

    await waitFor(() => expect(args.onClick).toHaveBeenCalled());
  },
};

export const KeyboardNavigationTest: Story = {
  args: {
    onClick: fn(),
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.tab();
    await expect(canvas.getByRole('button')).toHaveFocus();

    await fireEvent.keyDown(canvas.getByRole('button'), {
      key: 'Enter',
    });
    await fireEvent.keyUp(canvas.getByRole('button'), {
      key: 'Enter',
    });

    await waitFor(() => expect(args.onClick).toHaveBeenCalled());
  },
};

export const LabelTest: Story = {
  args: {
    label: 'I am the label property',
  },
  name: '[Test] It adds a title from label property',
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: { codePanel: false },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button')).toHaveAttribute(
      'aria-label',
      'I am the label property'
    );
  },
};
