import type { Meta, StoryObj } from '@storybook/react';

import { Nav } from './Nav';
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
import { StoryContext } from '@storybook/react-vite';
import { QueryClient } from '@tanstack/react-query';
import { NavItem } from './parts/NavItem';
import { MdDashboard, MdOutlineDashboard } from 'react-icons/md';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { FaCheckCircle, FaRegUser, FaUser } from 'react-icons/fa';
import { IoBackspaceOutline, IoBackspaceSharp } from 'react-icons/io5';
import { NavGroup } from './parts/NavGroup';
import { FaGear } from 'react-icons/fa6';
import { GoGear } from 'react-icons/go';
import { PiSignOutBold, PiSignOutThin } from 'react-icons/pi';

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
 * Meta data for the `Nav` component.
 * This comment will show up as the main opening paragraph in Storybook's Autodocs.
 */
const meta: Meta<typeof Nav> = {
  component: Nav,
  title: 'Navigation/Nav',
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="uy:w-[375px] uy:min-h-[20vh]">
        <Story />
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

type Story = StoryObj<typeof Nav>;

/**
 * The `Nav` component is a container for navigation elements with Unity's built-in styles for navigation patterns. Under the hood, it renders a `<nav>` landmark element, and wraps children under a `<ul>` element.
 */
export const Primary: Story = {
  args: {
    title: 'Navigation menu',
    children: [
      <NavItem
        key="title"
        href="/dashboard"
        prefix={({ isCurrent }) =>
          isCurrent ? <MdDashboard /> : <MdOutlineDashboard />
        }
      >
        Dashboard
      </NavItem>,
      <NavItem
        key="1"
        onPress={() => {
          //@ts-expect-error I don't know why
          alert('hello!');
        }}
        prefix={({ isCurrent }) => (isCurrent ? <FaUser /> : <FaRegUser />)}
      >
        Collaborators
      </NavItem>,
      <NavItem
        key="2"
        href="/onboarding"
        prefix={({ isCurrent }) =>
          isCurrent ? <IoBackspaceSharp /> : <IoBackspaceOutline />
        }
        suffix={<FaCheckCircle />}
      >
        Onboarding
      </NavItem>,
      <NavGroup
        key="3"
        label="Settings"
        prefix={({ isExpanded }) => (isExpanded ? <FaGear /> : <GoGear />)}
      >
        <NavItem key="3.1">Sub-item 1</NavItem>
        <NavItem key="3.2">Sub-item 2</NavItem>
        <NavItem key="3.3">Sub-item 3</NavItem>
        <NavItem key="3.4" href="/settings/sub-item-4">
          Sub-item 4
        </NavItem>
      </NavGroup>,
      <NavItem
        key="4"
        href="/exit"
        prefix={({ isCurrent }) =>
          isCurrent ? <PiSignOutBold /> : <PiSignOutThin />
        }
      >
        Exit
      </NavItem>,
    ],
  },
  parameters: {
    router: {
      routes: ['/', '/dashboard', '/onboarding', '/exit'],
    },
  },
};

/**
 * The component supports children in any combination of `NavItem`, and `NavGroup` components. Make sure to always include the `title`prop too, so that the navigation region is properly labelled. The child component types can be used to create a variety of navigation patterns.
 */
export const OnlyLinkNavItems: Story = {
  ...Primary,
  args: {
    title: 'Link Navigation',
    children: [
      <NavItem
        key="1"
        href="#"
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
      </NavItem>,
      <NavItem
        key="2"
        href="#"
        prefix={({ isCurrent }) => (
          <Icon
            src={isCurrent ? 'UserGreetingFilled' : 'UserGreetingOutlined'}
            size={20}
            color="inherit"
            alt="User Greeting"
          />
        )}
      >
        Profile
      </NavItem>,
      <NavItem
        key="3"
        href="#"
        prefix={({ isCurrent }) => (
          <Icon
            src={isCurrent ? 'GearSimpleFilled' : 'GearSimpleOutlined'}
            size={20}
            color="inherit"
            alt="Settings"
          />
        )}
      >
        Settings
      </NavItem>,
    ],
  },
};

/**
 * `<NavItem>` components will pick the right underlying HTML element depending on their properties.
 */
export const LinksAndButtons: Story = {
  ...Primary,
  args: {
    title: 'Mixed Navigation',
    children: [
      <NavItem
        key="1"
        href="#"
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
      </NavItem>,
      <NavItem
        key="2"
        href="#"
        prefix={({ isCurrent }) => (
          <Icon
            src={isCurrent ? 'SpaFilled' : 'SpaOutlined'}
            size={20}
            color="inherit"
            alt="Spa"
          />
        )}
      >
        Onboarding
      </NavItem>,
      <NavItem
        key="3"
        onPress={() => {
          console.log('Logout clicked');
        }}
        prefix={({ isCurrent }) => (
          <Icon
            src={isCurrent ? 'SignOutFilled' : 'SignOutOutlined'}
            size={20}
            color="inherit"
            alt="Sign Out"
          />
        )}
      >
        Logout
      </NavItem>,
    ],
  },
};

/**
 * Use the `<NavGroup>` component can be used to group navigation items together.
 */
export const WithGroupedItems: Story = {
  ...Primary,
  args: {
    title: 'Grouped Navigation',
    children: [
      <NavItem
        key="1"
        href="#"
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
      </NavItem>,
      <NavGroup
        key="2"
        label="Settings"
        prefix={({ isExpanded }) => (
          <Icon
            src={isExpanded ? 'GearSimpleFilled' : 'GearSimpleOutlined'}
            size={20}
            color="inherit"
            alt="Settings"
          />
        )}
      >
        <NavItem key="2.1">Account</NavItem>
        <NavItem key="2.2">Privacy</NavItem>
      </NavGroup>,
      <NavItem
        key="3"
        href="#"
        prefix={({ isCurrent }) => (
          <Icon
            src={isCurrent ? 'QuestionFilled' : 'QuestionOutlined'}
            size={20}
            color="inherit"
            alt="Help"
          />
        )}
      >
        Help
      </NavItem>,
    ],
  },
};

/**
 * You can use as many navigation groups as needed inside a single `<Nav>` component.
 */
export const WithMultipleGroups: Story = {
  ...Primary,
  args: {
    title: 'Multiple Groups Navigation',
    children: [
      <NavItem
        key="1"
        href="#"
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
      </NavItem>,
      <NavGroup
        key="2"
        label="User"
        prefix={({ isExpanded }) => (
          <Icon
            src={isExpanded ? 'UserGreetingFilled' : 'UserGreetingOutlined'}
            size={20}
            color="inherit"
            alt="User"
          />
        )}
      >
        <NavItem key="2.1">Profile</NavItem>
        <NavItem key="2.2">Preferences</NavItem>
      </NavGroup>,
      <NavGroup
        key="3"
        label="Settings"
        prefix={({ isExpanded }) => (
          <Icon
            src={isExpanded ? 'GearSimpleFilled' : 'GearSimpleOutlined'}
            size={20}
            color="inherit"
            alt="Settings"
          />
        )}
      >
        <NavItem key="3.1">Privacy</NavItem>
        <NavItem key="3.2">Accessibility</NavItem>
      </NavGroup>,
      <NavItem
        key="4"
        href="#"
        prefix={({ isCurrent }) => (
          <Icon
            src={isCurrent ? 'SignOutFilled' : 'SignOutOutlined'}
            size={20}
            color="inherit"
            alt="Sign Out"
          />
        )}
      >
        Logout
      </NavItem>,
    ],
  },
};

/**
 * NavGroups are uncontrolled by default. You can change them to control mode to allow for multiple interaction patterns, like having only one group opened at a given time.
 */
export const AccordionLikeGroups: Story = {
  ...Primary,
  args: {
    title: 'Accordion Groups Navigation',
  },
  render(args) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [expandedGroup, setExpandedGroup] = useState<string | null>(null);

    const toggleNavGroup = (groupKey: string) => {
      setExpandedGroup(expandedGroup === groupKey ? null : groupKey);
    };

    return (
      <Nav {...args}>
        <NavItem
          href="#"
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
        <NavGroup
          label="User"
          prefix={({ isExpanded }) => (
            <Icon
              src={isExpanded ? 'UserGreetingFilled' : 'UserGreetingOutlined'}
              size={20}
              color="inherit"
              alt="User"
            />
          )}
          isExpanded={expandedGroup === 'group-1'}
          onToggle={() => {
            toggleNavGroup('group-1');
          }}
        >
          <NavItem>Profile</NavItem>
          <NavItem>Preferences</NavItem>
        </NavGroup>
        <NavGroup
          label="Absences"
          prefix={({ isExpanded }) => (
            <Icon
              src={isExpanded ? 'CalendarEventFilled' : 'CalendarEventOutlined'}
              size={20}
              color="inherit"
              alt="Calendar"
            />
          )}
          isExpanded={expandedGroup === 'group-2'}
          onToggle={() => {
            toggleNavGroup('group-2');
          }}
        >
          <NavItem>Calendar</NavItem>
          <NavItem>My absences</NavItem>
          <NavItem>Time-off budget</NavItem>
        </NavGroup>
        <NavGroup
          label="Settings"
          prefix={({ isExpanded }) => (
            <Icon
              src={isExpanded ? 'GearSimpleFilled' : 'GearSimpleOutlined'}
              size={20}
              color="inherit"
              alt="Settings"
            />
          )}
          isExpanded={expandedGroup === 'group-3'}
          onToggle={() => {
            toggleNavGroup('group-3');
          }}
        >
          <NavItem>Privacy</NavItem>
          <NavItem>Accessibility</NavItem>
        </NavGroup>
        <NavItem
          key="4"
          href="#"
          prefix={({ isCurrent }) => (
            <Icon
              src={isCurrent ? 'SignOutFilled' : 'SignOutOutlined'}
              size={20}
              color="inherit"
              alt="Sign Out"
            />
          )}
        >
          Logout
        </NavItem>
      </Nav>
    );
  },
};

/**
 * The `Nav` component can be integrated with React Router and other routing utilities (such as `next/link`) to provide a seamless navigation experience in your application. Use the `asChild` prop from `NavItem to achieve this.
 */
export const ReactRouterIntegration: Story = {
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <UnityReactRouterV5Provider>
          <Story />
        </UnityReactRouterV5Provider>
      </MemoryRouter>
    ),
  ],
  render() {
    return (
      <div className="uy:grid uy:grid-cols-[1fr_3fr] uy:gap-200 uy:h-[80vh]">
        <section className="uy:flex uy:flex-col uy:gap-150">
          <Link href="/">
            <PayFitBrand width={102} />
          </Link>
          <Nav title="Navigation title">
            <NavItem
              href="/dashboard"
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
            <NavItem
              href="/users"
              prefix={({ isCurrent }) => (
                <Icon
                  src={
                    isCurrent ? 'UserGreetingFilled' : 'UserGreetingOutlined'
                  }
                  size={20}
                  color="inherit"
                  alt="User Greeting"
                />
              )}
            >
              Users
            </NavItem>
          </Nav>
        </section>
        <main
          className="uy:p-300 uy:bg-surface-neutral uy:rounded-100 uy:shadow-soaring"
          aria-live="polite"
        >
          <Switch>
            <Route path="/dashboard">Dashboard Page</Route>
            <Route path="/users">Users Page</Route>
            <Route path="/" exact>
              <h2>Welcome to PayFit</h2>
              <span>← Select a page</span>
            </Route>
            <Route path="*">← Select a page</Route>
          </Switch>
        </main>
      </div>
    );
  },
};
/**
 * The `Nav` component is accessible by default. It uses the `aria-labelledby` attribute to associate the navigation region with a title. The component also uses the correct semantic elements for each navigation item, and all of them are keyboard-focusable.
 */
export const AccessibilityTest: Story = {
  ...Primary,
  name: '[Test] Accessibility',
  args: {
    title: 'Accessibility Nav',
    children: [
      <NavItem
        key="1"
        href="#"
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
      </NavItem>,
      <NavGroup
        key="2"
        label="Settings"
        prefix={({ isExpanded }) => (
          <Icon
            src={isExpanded ? 'GearSimpleFilled' : 'GearSimpleOutlined'}
            size={20}
            color="inherit"
            alt="Settings"
          />
        )}
      >
        <NavItem key="2.1">Account</NavItem>
        <NavItem key="2.2">Privacy</NavItem>
      </NavGroup>,
      <NavItem
        key="3"
        prefix={({ isCurrent }) => (
          <Icon
            src={isCurrent ? 'QuestionFilled' : 'QuestionOutlined'}
            size={20}
            color="inherit"
            alt="Help"
          />
        )}
      >
        Help
      </NavItem>,
    ],
  },
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: { codePanel: false },
  },
  async play({ canvasElement }) {
    const canvas = within(canvasElement);

    // Check if nav element exists and has correct aria-labelledby
    const nav = canvas.getByRole('navigation');
    await expect(nav).toBeInTheDocument();
    await expect(nav).toHaveAttribute('aria-labelledby');

    // Check if NavTitle is rendered correctly
    const title = canvas.getByText('Accessibility Nav');
    await expect(title).toBeInTheDocument();
    await expect(title.id).toBe(nav.getAttribute('aria-labelledby'));

    // Check if NavItems are rendered correctly
    const homeLink = canvas.getByRole('link', { name: /Dashboard/i });
    await expect(homeLink).toBeInTheDocument();

    // Check if NavGroup is rendered and can be expanded
    const settingsButton = canvas.getByRole('button', { name: /Settings/i });
    await expect(settingsButton).toBeInTheDocument();
    await userEvent.click(settingsButton);

    // Check if NavGroup items are now visible
    await waitFor(() => expect(canvas.getByText('Account')).toBeVisible());
    await waitFor(() => expect(canvas.getByText('Privacy')).toBeVisible());

    // Check if button NavItem works
    const helpButton = canvas.getByRole('button', { name: /Help/i });
    await expect(helpButton).toBeInTheDocument();
    await userEvent.click(helpButton);
  },
};
