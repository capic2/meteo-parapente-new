import type { Meta, StoryObj } from '@storybook/react-vite';

import { expect, fn, userEvent, within } from 'storybook/test';
import { Link } from './Link';

const meta: Meta<typeof Link> = {
  component: Link,
  title: 'Navigation/Link',
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

type Story = StoryObj<typeof Link>;

/**
 * Use the `Link` component to navigate to another page or website, another place on the same page, to open a link in a new tab, or to trigger for downloads.
 */
export const Default = {
  args: {
    href: '#',
    children: 'This is a link',
    variant: 'standalone' as const,
  },
  parameters: {
    actions: { disable: false },
  },
};

/**
 * `Link` has a default color of `primary` to clearly differentiate it from other elements
 */
export const ColorPrimary: Story = {
  args: {
    ...Default.args,
    color: 'primary',
  },
};

/**
 * Use the `color="secondary"` option to render a link that has less prominence or priority.
 */
export const ColorSecondary: Story = {
  args: {
    ...Default.args,
    color: 'secondary',
  },
};

/**
 * Use the `isDisabled` prop to mark a link as disabled. Disabled links do not trigger a navigation event.
 */
export const Disabled: Story = {
  args: {
    ...Default.args,
    isDisabled: true,
  },
};

/**
 * Use the `isExternal` prop to indicate the current link will navigate to an external page (outside the application's domain). This prop will set the link's target to `_blank` and display an indicator icon to user.
 *
 * ### Security considerations
 *
 * When you use `isExternal` links, the `rel` attribute is set to `noopener noreferrer`, as it is [recommended](https://developers.google.com/web/tools/lighthouse/audits/noopener), when linking to third party content.
 *
 * - `rel="noopener"` prevents the new page from being able to access the `window.opener` property and ensures it runs in a separate process. Without this, the target page can potentially redirect your page to a malicious URL.
 * - `rel="noreferrer"` has the same effect, but also prevents the Referer header from being sent to the new page. ⚠️ Removing the referrer header will affect analytics.
 *
 * #### Accessibility considerations
 *
 * Given that `isExternal` links open a new window or browser tab, remember to *add an `aria-label` or `aria-description` attribute* to inform screen reader users that the link will open a new browsing context — for example, "To learn more, visit the About page which opens in a new window."
 */
export const isExternal: Story = {
  args: {
    ...Default.args,
    href: 'https://www.google.com/search?q=kittens',
    isExternal: true,
    children: 'Show me cute kittens',
    'aria-label': 'Search for kitten images in google.com (new tab)',
  },
  render: (args) => (
    <div>
      <Link {...args} variant="standalone">
        Standalone
      </Link>
      Text with a{' '}
      <Link {...args} variant="inline">
        inline
      </Link>{' '}
      link
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getAllByRole('link');
    await expect(link[0]).toHaveAttribute('target', '_blank');
    await expect(link[0]).toHaveAttribute('rel', 'noopener noreferrer');
  },
};

export const WithTruncation: Story = {
  args: {
    href: '#',
    children: 'Link with truncation',
    maxCharactersTruncation: 10,
  },
  decorators: [
    (Story) => (
      <div className="uy:flex">
        <Story />
      </div>
    ),
  ],
};

/**
 * The `Link` component automatically infers whether a link is internal or external based on the value of the `to` attribute. This inference is based on the URL's origin and path. You can override this behavior by setting the `isExternal` prop explicitly.
 */
export const AutomaticExternalDetection: Story = {
  args: {
    variant: 'standalone',
    color: 'primary',
  },
  parameters: {
    controls: { disable: true },
  },
  render: (args) => (
    <div className="uy:flex uy:gap-300">
      <section>
        <h3 className="uy:text-125 uy:font-medium uy:leading-[1.50]">
          Infer internal
        </h3>
        <Link {...args} href="#">
          Fragment link
        </Link>
        <Link {...args} href="/about">
          Absolute path
        </Link>
        <Link {...args} href="./contact">
          Relative path
        </Link>
        <Link {...args} href="../docs">
          Parent relative path
        </Link>
      </section>
      <section>
        <h3 className="uy:text-125 uy:font-medium uy:leading-[1.50]">
          Infer external
        </h3>
        <Link {...args} href="https://example.com">
          External domain
        </Link>
        <Link {...args} href="http://another-site.com">
          External HTTP
        </Link>
        <Link {...args} href="https://subdomain.current-site.com">
          Different subdomain
        </Link>
      </section>
      <section>
        <h3 className="uy:text-125 uy:font-medium uy:leading-[1.50]">
          Manual override
        </h3>
        <Link {...args} href="https://external-site.com" isExternal={false}>
          External forced as internal
        </Link>
        <Link {...args} href="/internal-path" isExternal={true}>
          Internal forced as external
        </Link>
      </section>
    </div>
  ),
};

/**
 * You can embed `Link` components alongside text with the `variant="inline"` prop (which is its default value). These links will inherit the text styles from the containing text element. You can still override the color, disabled state, and external status of the link
 */
export const VariantInline: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div className="uy:w-[30dvw]">
      <p>
        This is a <Link href="#">link</Link> in a paragraph. Links can be
        standalone or inline with a body of text. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Sed vehicula tellus nec ultricies
        tincidunt.{' '}
        <Link href="#" isExternal>
          Aenean varius sodales
        </Link>{' '}
        est vulputate elementum. Curabitur fringilla, mi at aliquam hendrerit,
        odio quam volutpat justo,{' '}
        <Link href="#" color="secondary">
          sed sodales
        </Link>{' '}
        odio risus eget diam.
      </p>
    </div>
  ),
};

/**
 * The `standalone` variant instructs a link to display as a block element instead of as an inline element. Use it when the link is not displayed inside a body of text, and is instead an independent element.
 */
export const VariantStandalone: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div>
      <Link href="#" variant="standalone">
        Standalone primary
      </Link>
      <Link href="#" variant="standalone" isExternal>
        Standalone primary external
      </Link>
      <Link href="#" variant="standalone" color="secondary">
        Standalone secondary
      </Link>
      <Link href="#" variant="standalone" color="secondary" isExternal>
        Standalone secondary external
      </Link>
    </div>
  ),
};

export const WithSize: Story = {
  args: {
    ...Default.args,
    children: 'Contextual link',
    isExternal: true,
  },
  render: (args) => (
    <div className="uy:flex uy:gap-300 uy:flex-col">
      <Link {...args} size="default">
        Default
      </Link>
      <Link {...args} size="large">
        Large
      </Link>
      <Link {...args} size="small">
        Small
      </Link>
      <p className="uy:typography-h1">
        <Link {...args} size="inherit">
          Inherit
        </Link>
      </p>
    </div>
  ),
};

/**
 * The `Link` component is accessible by default, and allows for mouse/touch interactions, keyboard navigation, and keyboard activation with the <kbd>Enter</kbd> and <kbd>Space</kbd> keys.
 *
 * #### Should I use a link or a button?
 * This decision depends on the nature of the action you want to implement. The basic rule of thumb is:
 *
 * - If the action *triggers a navigation or a URL change* (internal or external), **use links**. Links **must always have** a valid `href` attribute.
 * - Otherwise, if the action *does not have a meaningful `href`, or it triggers a programmatic event (such as opening a dialog or triggering a notification), **use a button**.
 */
export const AccessibilityTest: Story = {
  name: '[Test] Accessibility',
  args: {
    ...Default.args,
    href: '',
    children: 'Click me',
    onPress: fn(),
  },
  parameters: {
    controls: { disable: true },
    docs: { codePanel: false },
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link', { name: 'Click me' });

    // We can't assert the navigation since it's prevented in Storybook, but we can verify the link is clickable and calls onPress
    await step('Test mouse interaction', async () => {
      link.click();
      await expect(link).not.toBeDisabled();
      await expect(args.onPress).toHaveBeenCalled();
    });

    await step('Test keyboard navigation', async () => {
      link.blur();
      await userEvent.tab();
      await expect(document.activeElement).toBe(link);
      await userEvent.tab();
      await expect(document.activeElement).not.toBe(link);
    });

    await step('Test keyboard activation: [Enter]', async () => {
      link.focus();
      await userEvent.keyboard('[Enter]');
      await expect(args.onPress).toHaveBeenCalled();
      link.blur();
    });

    await step('Test keyboard activation: [Space]', async () => {
      link.focus();
      await userEvent.keyboard('[Space]');
      await expect(args.onPress).toHaveBeenCalled();
      link.blur();
    });
  },
};
