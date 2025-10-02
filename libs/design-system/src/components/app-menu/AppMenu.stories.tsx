import type { Meta, StoryObj } from '@storybook/react-vite'

import { Input, TextField } from 'react-aria-components'
import { MemoryRouter } from 'react-router-dom'

import { UnityReactRouterV5Provider } from '../../integrations/react-router/v5/UnityReactRouterV5Provider'
import { Anchor } from '../anchor/Anchor'
import { AppLayout } from '../app-layout/AppLayout'
import { IconButton } from '../icon-button/IconButton'
import { Icon } from '../icon/Icon'
import { MenuItem } from '../menu/parts/MenuItem'
import { MenuSeparator } from '../menu/parts/MenuSeparator'
import { Nav } from '../nav/Nav'
import { NavItem } from '../nav/parts/NavItem'
import { Pill } from '../pill/Pill'
import { Text } from '../text/Text'
import { AppMenu } from './AppMenu'
import { AppMenuFooter } from './parts/AppMenuFooter'
import { AppMenuHeader } from './parts/AppMenuHeader'
import { AppMenuNavContent } from './parts/AppMenuNavContent'

/**
 * This stories demonstrates how to compose Unity components in order to create the AppMenu component for a specific space
 */
const meta = {
  component: AppMenu,
  title: 'Navigation/AppMenu',

  subcomponents: { AppMenuNavContent, AppMenuHeader, AppMenuFooter },
  parameters: {
    layout: 'fullscreen',
    actions: { disable: true },
    chromatic: { disableSnapshot: true },
  },

  tags: ['autodocs', 'dd-privacy:allow'],

  decorators: [
    Story => (
      <AppLayout menu={<Story />}>
        <div>content</div>
      </AppLayout>
    ),
  ],
} satisfies Meta<typeof AppMenu>

export default meta

type Story = StoryObj<typeof AppMenu>

/**
 * Default story for the `AppMenu` component.
 */
export const Default: Story = {
  render: () => {
    return (
      <AppMenu>
        <AppMenuHeader
          environment="production"
          linkLabel={'go to the dashboard'}
          linkHref="/"
        />
        <AppMenuNavContent>
          <Nav title="Essentials">
            <NavItem
              key="title"
              href="/"
              prefix={({ isCurrent }) => (
                <Icon
                  src={isCurrent ? 'DashboardFilled' : 'DashboardOutlined'}
                  size={20}
                  color="inherit"
                  alt="Dashboard"
                />
              )}
            >
              Dashboard
            </NavItem>
          </Nav>
          <Nav title="Daily">
            <NavItem
              key="title"
              href="/absences"
              prefix={({ isCurrent }) => (
                <Icon
                  src={isCurrent ? 'CalendarFilled' : 'CalendarOutlined'}
                  size={20}
                  color="inherit"
                  alt="Dashboard"
                />
              )}
            >
              Absences
            </NavItem>
          </Nav>
        </AppMenuNavContent>
        <AppMenuFooter
          title="Acme Inc"
          description="10 employees"
          badgeLabel="Admin"
          menuTriggerDescription="Press this button to open the profile menu."
        >
          <MenuItem
            prefix={<Icon src="SignOutOutlined" size={20} />}
            onAction={() => {
              console.log('logout')
            }}
          >
            Logout
          </MenuItem>
        </AppMenuFooter>
      </AppMenu>
    )
  },
}

export const WithScrollableContent: Story = {
  render: () => {
    return (
      <AppMenu>
        <AppMenuHeader
          environment="production"
          linkLabel={'go to the dashboard'}
          linkHref="/"
        />
        <AppMenuNavContent>
          <Nav title="Essentials">
            <NavItem
              key="title"
              href="/"
              prefix={({ isCurrent }) => (
                <Icon
                  src={isCurrent ? 'DashboardFilled' : 'DashboardOutlined'}
                  size={20}
                  color="inherit"
                  alt="Dashboard"
                />
              )}
            >
              Dashboard
            </NavItem>
          </Nav>
          <Nav title="Daily">
            {Array.from({ length: 70 }).map((_, id) => {
              return (
                <NavItem
                  key={id}
                  href={`/${id}`}
                  prefix={({ isCurrent }) => (
                    <Icon
                      src={isCurrent ? 'CalendarFilled' : 'CalendarOutlined'}
                      size={20}
                      color="inherit"
                      alt="Dashboard"
                    />
                  )}
                >
                  Link {id}
                </NavItem>
              )
            })}
          </Nav>
        </AppMenuNavContent>
        <AppMenuFooter
          title="Acme Inc"
          description="10 employees"
          badgeLabel="Admin"
          menuTriggerDescription="Press this button to open the profile menu."
        >
          <MenuItem
            prefix={<Icon src="GearSimpleOutlined" size={20} />}
            onAction={() => {
              console.log('settings')
            }}
          >
            Settings
          </MenuItem>
          <MenuSeparator />
          <MenuItem
            prefix={<Icon src="SignOutOutlined" size={20} />}
            onAction={() => {
              console.log('logout')
            }}
          >
            Logout
          </MenuItem>
        </AppMenuFooter>
      </AppMenu>
    )
  },
}
export const WithScrollableContentAndComponents: Story = {
  render: () => {
    return (
      <AppMenu>
        <AppMenuHeader
          environment="production"
          linkLabel={'go to the dashboard'}
          linkHref="/"
          notificationsComponent={
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
          }
          searchComponent={
            <TextField className="uy:w-full">
              <Input
                placeholder="Search..."
                className="uy:w-full uy:border uy:border-border-form-enabled uy:rounded-50"
              />
            </TextField>
          }
        />
        <AppMenuNavContent>
          <Nav title="Essentials">
            <NavItem
              key="title"
              href="/"
              prefix={({ isCurrent }) => (
                <Icon
                  src={isCurrent ? 'DashboardFilled' : 'DashboardOutlined'}
                  size={20}
                  color="inherit"
                  alt="Dashboard"
                />
              )}
            >
              Dashboard
            </NavItem>
          </Nav>
          <Nav title="Daily">
            {Array.from({ length: 70 }).map((_, id) => {
              return (
                <NavItem
                  key={id}
                  href={`/${id}`}
                  prefix={({ isCurrent }) => (
                    <Icon
                      src={isCurrent ? 'CalendarFilled' : 'CalendarOutlined'}
                      size={20}
                      color="inherit"
                      alt="Dashboard"
                    />
                  )}
                >
                  Link {id}
                </NavItem>
              )
            })}
          </Nav>
        </AppMenuNavContent>
        <AppMenuFooter
          title="Acme Inc"
          description="10 employees"
          badgeLabel="Admin"
          menuTriggerDescription="Press this button to open the profile menu."
          computeSlot={<Text variant="body">company is computing</Text>}
        >
          <MenuItem
            prefix={<Icon src="SignOutOutlined" size={20} />}
            onAction={() => {
              console.log('logout')
            }}
          >
            Logout
          </MenuItem>
        </AppMenuFooter>
      </AppMenu>
    )
  },
}
