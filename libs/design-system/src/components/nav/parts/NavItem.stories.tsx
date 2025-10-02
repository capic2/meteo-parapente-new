import type { Meta, StoryObj } from '@storybook/react';
import { StoryContext } from '@storybook/react-vite';
import { NavItem } from './NavItem';
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
import { Nav } from '../Nav';
import { MdDashboard, MdOutlineDashboard } from 'react-icons/md';
import { FaCaretDown, FaCheckCircle } from 'react-icons/fa';
import { expect, fn, userEvent, within } from 'storybook/test';

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
 * Meta data for the `NavItem` component.
 * This comment will show up as the main opening paragraph in Storybook's Autodocs.
 */
const meta: Meta<typeof NavItem> = {
  component: NavItem,
  title: 'Navigation/ Nav/NavItem',
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="uy:w-[375px]">
        <Nav title="Navigation items">
          <Story />
        </Nav>
      </div>
    ),
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

type Story = StoryObj<typeof NavItem>;

const Prefix = ({ isCurrent }: { isCurrent: boolean }) =>
  isCurrent ? <MdDashboard /> : <MdOutlineDashboard />;

const Suffix = () => (
  <>
    <FaCheckCircle />
    <FaCaretDown />
  </>
);

export const LinkPrimary: Story = {
  args: {
    children: 'Dashboard',
    href: '/dashboard',
  },
};

export const ButtonPrimary: Story = {
  args: {
    children: 'Dashboard',
    onPress: () => {
      //@ts-expect-error I don't know why
      alert('Clicked!');
    },
  },
};

/**
 * The `NavItem` component can display a prefix element before the label. This is useful for displaying the icon of the navigation item. This is a render prop that receives a boolean indicating if the item is active or not.
 */
export const LinkWithPrefix: Story = {
  ...LinkPrimary,
  args: {
    children: 'Users',
    prefix: Prefix,
    href: '/users',
  },
  parameters: {
    router: {
      routes: ['/', '/users'],
    },
  },
  render(args) {
    return <NavItem {...args} />;
  },
};

export const ButtonWithPrefix: Story = {
  ...ButtonPrimary,
  args: {
    children: 'Users',
    prefix: Prefix,
  },
  render(args) {
    return <NavItem {...args} />;
  },
};

/**
 * The `NavItem` component can display a suffix element after the label. This is useful for displaying additional information or actions related to the navigation item. This is a regular React element that can render anything.
 */
export const LinkWithSuffix: Story = {
  ...LinkPrimary,
  args: {
    children: 'Settings',
    suffix: <Suffix />,
    href: '/settings',
  },
  parameters: {
    router: {
      routes: ['/', '/settings'],
    },
  },
};

export const ButtonWithSuffix: Story = {
  ...ButtonPrimary,
  args: {
    children: 'Settings',
    suffix: <Suffix />,
  },
};

/**
 * You can mark the current navigation item as active by setting the `isCurrent` prop to `true`. This will add the `aria-current="page"` attribute to the element, making it easier for screen readers to identify the current page.
 */
export const LinkActive: Story = {
  ...LinkPrimary,
  args: {
    children: 'Active Item',
    href: '/active',
    prefix: Prefix,
  },
  parameters: {
    router: {
      initialIndex: 1,
      initialEntries: ['/', '/active'],
      routes: ['/', '/active'],
    },
  },
};

export const ButtonActive: Story = {
  ...LinkPrimary,
  args: {
    prefix: Prefix,
    isCurrent: true,
    children: 'Active Item',
  },
};

export const LinkDisabled: Story = {
  ...LinkPrimary,
  args: {
    children: 'Disabled Item',
    isDisabled: true,
    href: '/disabled',
  },
  parameters: {
    router: {
      routes: ['/', '/disabled'],
    },
  },
};

export const ButtonDisabled: Story = {
  ...ButtonPrimary,
  args: {
    children: 'Disabled Item',
    isDisabled: true,
  },
};

/**
 * The `NavItem` component can be nested inside `NavGroup` component to create a hierarchical navigation structure. You can control the nesting level by setting the `level` prop to a number greater than 0.
 */
export const LinkLevelOne: Story = {
  ...LinkPrimary,
  args: {
    children: 'Level 1 item',
    level: 1,
    href: '/nested',
  },
  parameters: {
    router: {
      routes: ['/', '/nested'],
    },
  },
  render: (args) => (
    <>
      <NavItem href="#" prefix={() => <MdOutlineDashboard />}>
        Level 0 item
      </NavItem>
      <NavItem {...args} />
    </>
  ),
};

export const ButtonLevelOne: Story = {
  ...ButtonPrimary,
  args: {
    children: 'Level 1 item',
    level: 1,
  },
  render(args) {
    return (
      <>
        <NavItem prefix={() => <MdOutlineDashboard />}>Level 0 item</NavItem>
        <NavItem {...args} />
      </>
    );
  },
};

/**
 * The `NavItem` component can render a long text that will wrap the text when it overflows the container.
 */
export const LinkLongText: Story = {
  ...LinkPrimary,
  args: {
    prefix: Prefix,
    children:
      'This is an unnecessarily long navigation title that should wrap the text',
    href: '/long-text',
  },
  parameters: {
    router: {
      routes: ['/', '/long-text'],
    },
  },
};

export const ButtonLongText: Story = {
  ...ButtonPrimary,
  args: {
    children:
      'This is an unnecessarily long navigation title that should wrap the text',
  },
};

export const LinkAccessibilityTest: Story = {
  name: '[Test] Link accessibility',
  args: {
    children: 'Accessibility Item',
    href: '/accessibility',
  },
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: { codePanel: false },
    router: {
      initialEntries: ['/', '/accessibility'],
      initialIndex: 1,
      routes: ['/', '/accessibility'],
    },
  },
  tags: ['!autodocs'],
  async play({ canvasElement }) {
    const canvas = within(canvasElement);
    const item = canvas.getByRole('link');

    await expect(item).toBeInTheDocument();
    await expect(item).toHaveTextContent('Accessibility Item');
    await expect(item).toHaveAttribute('aria-current', 'page');
    await userEvent.tab();
    await expect(item).toHaveFocus();
  },
  decorators: [],
};

export const ButtonAccessibilityTest: Story = {
  ...LinkPrimary,
  name: '[Test] Button accessibility',
  args: {
    children: 'Button Item',
    onPress: fn(),
  },
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: { codePanel: false },
  },
  tags: ['!autodocs'],
  async play({ canvasElement, args }) {
    const canvas = within(canvasElement);
    const item = canvas.getByRole('button');

    await expect(item).toBeInTheDocument();
    await expect(item).toHaveTextContent('Button Item');
    await expect(item).not.toHaveAttribute('href');
    await expect(item).not.toHaveAttribute('aria-current');
    await userEvent.tab();
    await expect(item).toHaveFocus();
    await userEvent.click(item);
    await expect(args.onPress).toHaveBeenCalled();
  },
};

export const DisabledInteractionTest: Story = {
  ...LinkPrimary,
  name: '[Test] Disabled interaction',
  args: {
    children: 'Disabled Button',
    isDisabled: true,
    onPress: fn(),
  },
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: { codePanel: false },
  },
  tags: ['!autodocs'],
  async play({ canvasElement }) {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    await expect(button).toBeDisabled();
    await userEvent.tab();
    await expect(button).not.toHaveFocus();
  },
};

export const LevelAttributeTest: Story = {
  ...LinkPrimary,
  name: '[Test] It renders the correct level',
  args: {
    children: 'Nested Item',
    level: 1,
    href: '#nested',
  },
  tags: ['!autodocs'],
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: { codePanel: false },
  },
  async play({ canvasElement }) {
    const canvas = within(canvasElement);
    const item = canvas.getByRole('link');

    await expect(item).toHaveAttribute('data-level', '1');
  },
};
