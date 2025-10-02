import type { Meta, StoryObj } from '@storybook/react';
import { FaCheckCircle } from 'react-icons/fa';
import { GoGear } from 'react-icons/go';
import { FaGear } from "react-icons/fa6";
import { NavGroup } from './NavGroup';
import { NavItem } from './NavItem';
import { userEvent, waitFor, within, expect, fn } from 'storybook/test';
import { useState } from 'react';
import { Button } from 'react-aria-components';
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  ErrorComponent,
  Outlet,
  RouterProvider,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { QueryClient } from '@tanstack/react-query';
import { StoryContext } from '@storybook/react-vite';

interface RouterDecoratorContext extends StoryContext {
  parameters: {
    router?: {
      initialEntries?: string[];
      initialIndex?: number;
      routes?: string[];
    };
  };
}

const queryClient = new QueryClient();

/**
 * Meta data for the `NavGroup` component.
 * This comment will show up as the main opening paragraph in Storybook's Autodocs.
 */
const meta: Meta<typeof NavGroup> = {
  component: NavGroup,
  title: 'Navigation/Nav/NavGroup',
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story, { parameters }: RouterDecoratorContext) => {
      const {
        initialEntries = ['/'],
        initialIndex = 0,
        routes = ['/'],
      } = parameters?.router || {};
      const rootRoute = createRootRoute({
        errorComponent: ErrorComponent,
        component: () => (
          <>
            <Outlet />
            <TanStackRouterDevtools />
          </>
        ),
      });
      rootRoute.addChildren(
        routes.map((path) =>
          createRoute({
            path,
            getParentRoute: () => rootRoute,
            component: Story,
          })
        )
      );

      const router = createRouter({
        history: createMemoryHistory({ initialEntries, initialIndex }),
        routeTree: rootRoute,
        context: {
          queryClient,
        },
      });

      return <RouterProvider router={router} />;
    },
  ],
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof NavGroup>;

const Prefix = ({ isExpanded }: { isExpanded: boolean }) =>
  isExpanded ? <FaGear /> : <GoGear />;

/**
 * Groups can have prefix and suffix elements, following the same constraints of the `<NavItem>` component.
 */
export const WithPrefixAndSuffix: Story = {
  args: {
    label: 'Advanced Settings',
    prefix: Prefix,
    suffix: <FaCheckCircle />,
    children: [
      <NavItem key="1">System</NavItem>,
      <NavItem key="2">Network</NavItem>,
    ],
  },
};

/**
 * Groups can be expanded by default using the `defaultExpanded` prop. This only has effect in uncontrolled mode.
 */
export const ExpandedByDefault: Story = {
  args: {
    label: 'Expanded Group',
    defaultExpanded: true,
    prefix: Prefix,
    children: [
      <NavItem key="1">Item 1</NavItem>,
      <NavItem key="2">Item 2</NavItem>,
    ],
  },
  async play({ canvasElement }) {
    const canvas = within(canvasElement);
    const groupButton = canvas.getByRole('button', {
      name: 'Expanded Group',
    });
    const subItems = canvas.getAllByRole('button', { name: /Item \d/ });

    // Check initial state
    await expect(groupButton).toHaveAttribute('aria-expanded', 'true');
    await waitFor(() => expect(subItems[0]).toBeVisible());
    await waitFor(() => expect(subItems[1]).toBeVisible());
  },
};

/**
 * Groups can be controlled using the `isExpanded` and `onToggle` props. This allows the parent component to control the expanded state of the group.
 */
export const Controlled: Story = {
  parameters: {
    actions: { argTypesRegex: null },
  },
  render: function Render() {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
      <div className="flex flex-col gap-10">
        <NavGroup
          label="Controlled Group"
          prefix={Prefix}
          isExpanded={isExpanded}
          onToggle={(expanded) => {
            setIsExpanded(expanded);
          }}
        >
          <NavItem>Controlled Item 1</NavItem>
          <NavItem>Controlled Item 2</NavItem>
        </NavGroup>
        <div className="flex gap-2 justify-between">
          <Button
            //variant="primary"
            onPress={() => {
              setIsExpanded(true);
            }}
          >
            Open group
          </Button>
          <Button
            //variant="primary"
            onPress={() => {
              setIsExpanded(false);
            }}
          >
            Close group
          </Button>
        </div>
      </div>
    );
  },
  async play({ canvasElement, step }) {
    const canvas = within(canvasElement);

    // Get the NavGroup button and control buttons
    const groupButton = canvas.getByRole('button', {
      name: 'Controlled Group',
    });
    const openButton = canvas.getByRole('button', { name: 'Open group' });
    const closeButton = canvas.getByRole('button', { name: 'Close group' });

    // query for sub-items
    const item1 = canvas.getByText('Controlled Item 1');
    const item2 = canvas.getByText('Controlled Item 2');

    // Check initial state (group is closed)
    await step('Initial state', async () => {
      await expect(groupButton).toHaveAttribute('aria-expanded', 'false');
    });

    await step('Expand group', async () => {
      // Expand the group
      await userEvent.click(openButton);

      await expect(groupButton).toHaveAttribute('aria-expanded', 'true');
      await waitFor(() => expect(item1).toBeVisible());
      await waitFor(() => expect(item2).toBeVisible());
    });

    // Collapse the group
    await step('Collapse group', async () => {
      // Close the group using the close button
      await userEvent.click(closeButton);
      await expect(groupButton).toHaveAttribute('aria-expanded', 'false');
      await waitFor(() => expect(item1).not.toBeVisible());
      await waitFor(() => expect(item2).not.toBeVisible());
    });
  },
};

/**
 * Groups can have an `onToggle` handler that is called when the group is expanded or collapsed, and it will trigger regardless of the mode (controlled or uncontrolled).
 */
export const WithOnToggleHandler: Story = {
  args: {
    label: 'Toggleable Group',
    onToggle: fn(),
    prefix: Prefix,
    children: [
      <NavItem key="1">Subitem 1</NavItem>,
      <NavItem key="2">Subitem 2</NavItem>,
    ],
  },
  parameters: {
    actions: { argTypesRegex: null },
  },
  async play({ canvasElement, args }) {
    const canvas = within(canvasElement);
    const toggleButton = canvas.getByRole('button', {
      name: 'Toggleable Group',
    });

    // Check initial state
    await expect(toggleButton).toHaveAttribute('aria-expanded', 'false');

    // Expand the group
    await userEvent.click(toggleButton);
    await expect(args.onToggle).toHaveBeenCalledWith(true);

    // Collapse the group
    await userEvent.click(toggleButton);
    await expect(args.onToggle).toHaveBeenCalledWith(false);
  },
};

/**
 * Groups can be expanded or collapse either with mouse or keyboard interactions.
 */
export const ExpandCollapseTest: Story = {
  name: '[Test] Expand collapse',
  args: {
    label: 'Interaction Test Group',
    prefix: Prefix,
    children: [
      <NavItem key="1">Test Item 1</NavItem>,
      <NavItem key="2">Test Item 2</NavItem>,
    ],
  },
  parameters: {
    actions: { argTypesRegex: null },
    chromatic: { disableSnapshot: true },
    docs: { codePanel: false },
  },
  tags: ['!autodocs'],
  async play({ canvasElement, step }) {
    const canvas = within(canvasElement);
    const toggleButton = canvas.getByRole('button', {
      name: 'Interaction Test Group',
    });

    await step('Initial state', async () => {
      await expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
    });

    await step('Expand group', async () => {
      // Expand the group
      await userEvent.click(toggleButton);
      await expect(toggleButton).toHaveAttribute('aria-expanded', 'true');

      // query for sub-items
      // Check if subitems are now visible and focusable
      await waitFor(() => {
        const item1 = canvas.getByRole('button', {
          name: 'Test Item 1',
        });
        return expect(item1).toBeVisible();
      });
      await waitFor(() => {
        const item2 = canvas.getByRole('button', {
          name: 'Test Item 2',
        });
        return expect(item2).toBeVisible();
      });
    });

    // Collapse the group
    await step('Collapse group', async () => {
      // Collapse the group
      await userEvent.click(toggleButton);
      await expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
      const item1 = canvas.getByRole('button', {
        name: 'Test Item 1',
        hidden: true,
      });
      const item2 = canvas.getByRole('button', {
        name: 'Test Item 2',
        hidden: true,
      });
      // Check if subitems are hidden
      await waitFor(() => expect(item1).not.toBeVisible());
      await waitFor(() => expect(item2).not.toBeVisible());
    });
  },
};

/**
 * Groups use the `aria-expanded`, `aria-controls`, `aria-labelledby` and `aria-hidden` attributes to provide accessibility information to assistive technologies depending on the current state of the component.
 */
export const AccessibilityTest: Story = {
  name: '[Test] Accessibility',
  args: {
    label: 'Accessibility Group',
    prefix: Prefix,
    children: [
      <NavItem key="1">Access Item 1</NavItem>,
      <NavItem key="2">Access Item 2</NavItem>,
    ],
  },
  parameters: {
    actions: { argTypesRegex: null },
    chromatic: { disableSnapshot: true },
  },
  tags: ['!autodocs'],
  async play({ canvasElement, step }) {
    const canvas = within(canvasElement);
    const toggleButton = canvas.getByRole('button', {
      name: 'Accessibility Group',
    });
    const contentId = toggleButton.getAttribute('aria-controls');
    const content = canvasElement.querySelector(`[id="${contentId}"]`);

    await step('Initial state', async () => {
      // Check initial ARIA attributes
      await expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
      await expect(toggleButton).toHaveAttribute('aria-controls');
      await expect(contentId).toBeTruthy();
      await expect(content).toBeTruthy();
      await expect(content).toHaveAttribute('aria-labelledby', toggleButton.id);
      await expect(content).toHaveAttribute('aria-hidden', 'true');
    });

    await step('Expand group', async () => {
      // Expand the group
      await userEvent.click(toggleButton);

      // Wait for expanded state
      await waitFor(() =>
        expect(toggleButton).toHaveAttribute('aria-expanded', 'true')
      );
      await waitFor(() =>
        expect(content).toHaveAttribute('aria-hidden', 'false')
      );
      // Check visibility and interactivity of subitems
      const subItems = within(content).getAllByRole('button', { hidden: true });
      await waitFor(() => expect(subItems[0]).toBeVisible());
      await waitFor(() => expect(subItems[1]).toBeVisible());

      // Check keyboard navigation
      await userEvent.tab();
      await expect(subItems[0]).toHaveFocus();
      await userEvent.tab();
      await expect(subItems[1]).toHaveFocus();
    });

    // Collapse the group
    await step('Collapse group', async () => {
      await userEvent.click(toggleButton);

      // Wait for collapsed state
      await waitFor(() =>
        expect(toggleButton).toHaveAttribute('aria-expanded', 'false')
      );
      await waitFor(() =>
        expect(content).toHaveAttribute('aria-hidden', 'true')
      );

      // Check that subitems are not visible when collapsed
      const subItems = within(content as HTMLElement).getAllByRole('button', {
        hidden: true,
      });
      await waitFor(() => expect(subItems[0]).not.toBeVisible());
      await waitFor(() => expect(subItems[1]).not.toBeVisible());
    });
  },
};
