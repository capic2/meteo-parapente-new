import type { Meta, StoryObj } from '@storybook/react-vite'

import { Input, TextField } from 'react-aria-components'
import { expect, within } from 'storybook/test'

import { IconButton } from '../../icon-button/IconButton'
import { AppMenuHeader } from './AppMenuHeader'

/**
 * This stories demonstrates how to compose Unity components in order to create the AppMenu component for a specific space
 */
const meta = {
  component: AppMenuHeader,
  title: 'Navigation/AppMenu/AppMenuHeader',
  parameters: {
    layout: 'fullscreen',
    actions: { disable: true },
    chromatic: { disableSnapshot: true },
  },
  args: {
    linkLabel: 'Go to dashboard',
    environment: 'production',
    linkHref: '/',
  },

  tags: ['autodocs', 'dd-privacy:allow'],

  decorators: [

  ],
} satisfies Meta<typeof AppMenuHeader>

export default meta

type Story = StoryObj<typeof AppMenuHeader>

export const Production: Story = {
  args: {
    linkLabel: 'Go to dashboard',
    environment: 'production',
    linkHref: '/',
  },
}

export const OtherEnvironment: Story = {
  args: {
    ...meta.args,
    environment: 'working',
  },
}

export const WithSearchComponent: Story = {
  args: {
    ...meta.args,
    searchComponent: (
      <TextField className="uy:w-full">
        <Input
          placeholder="Search..."
          className="uy:w-full uy:border uy:border-border-form-enabled uy:rounded-50"
        />
      </TextField>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole('textbox')).toBeInTheDocument()
  },
}

export const WithNotificationsComponent: Story = {
  args: {
    ...meta.args,
    notificationsComponent: (
      <Anchor position="top-right" offset={-12}>
        <IconButton
          icon="BellOutlined"
          label="Notifications en attente"
          onClick={() => {
            console.log('TODO: not yet implemented')
          }}
          color="neutral"
          variant="ghost"
        />
        <Pill variant="critical" value={5} aria-label="5 notifications" />
      </Anchor>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(
      canvas.getByRole('button', { name: 'Notifications en attente' }),
    ).toBeInTheDocument()
  },
}
