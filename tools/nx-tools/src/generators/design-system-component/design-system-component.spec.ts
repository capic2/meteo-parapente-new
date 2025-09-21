import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree } from '@nx/devkit';

import { designSystemComponentGenerator } from './design-system-component';
import type { DesignSystemComponentGeneratorSchema } from './schema';

const createProject = () => {
  const tree = createTreeWithEmptyWorkspace();
  tree.write(
    '/lib/design-system/project.json',
    `
     {
        "name": "@meteo-parapente-new/design-system",
        "$schema": "../../node_modules/nx/schemas/nx-schema.json",
        "projectType": "library",
        "sourceRoot": "lib/design-system/src",
        "tags": []
        }
    `
  );
  tree.write(
    `/lib/design-system/src/index.ts`,
    `
      export * from './components/existing-component'
      `
  );

  return tree;
};

const createProjectWithComponent = () => {
  const tree = createProject();
  tree.write(
    '/lib/design-system/src/components/my-component/MyComponent.tsx',
    ''
  );
  tree.write(
    '/lib/design-system/src/components/my-component/MyComponent.stories.tsx',
    ''
  );

  return tree;
};

describe('design-system generator', () => {
  let tree: Tree;
  describe('Component', () => {
    const options: DesignSystemComponentGeneratorSchema = {
      name: 'My component',
    };

    beforeEach(() => {
      tree = createProject();
    });

    it('should run successfully', async () => {
      await designSystemComponentGenerator(tree, options);

      // check if the component files were generated
      expect(
        tree.exists(
          `/lib/design-system/src/components/my-component/MyComponent.tsx`
        )
      ).toBeTruthy();
      expect(
        tree.exists(
          `/lib/design-system/src/components/my-component/MyComponent.stories.tsx`
        )
      ).toBeTruthy();

      const componentFile = tree.read(
        `/lib/design-system/src/components/my-component/MyComponent.tsx`,
        'utf-8'
      );
      expect(componentFile).toMatchInlineSnapshot(`
        "import { forwardRef } from 'react';

        import type { PropsWithChildren } from 'react';
        import type { VariantProps } from 'tailwind-variants';

        import { tv } from 'tailwind-variants';

        export const myComponent = tv({
          // add the component styles
          base: '',
        });

        export interface MyComponentProps
          extends PropsWithChildren<VariantProps<typeof myComponent>> {
          // add the component props here
        }

        const MyComponent = forwardRef<HTMLDivElement, MyComponentProps>(
          ({ children, ...props }, ref) => {
            return (
              <div ref={ref} className={myComponent()} {...props}>
                {children}
              </div>
            );
          }
        );

        MyComponent.displayName = 'MyComponent';

        export { MyComponent };
        "
      `);

      const storyFile = tree.read(
        `/lib/design-system/src/components/my-component/MyComponent.stories.tsx`,
        'utf-8'
      );

      expect(storyFile).toMatchInlineSnapshot(`
        "import type { Meta, StoryObj } from '@storybook/react';

        import { MyComponent } from './MyComponent';

        /**
         * Meta data for the \`MyComponent\` component.
         * This comment will show up as the main opening paragraph in Storybook's Autodocs.
         */
        const meta: Meta<typeof MyComponent> = {
          component: MyComponent,
          title: 'MyComponent',
          parameters: {
            layout: 'centered',
          },
          tags: ['autodocs'],
        };

        export default meta;

        type Story = StoryObj<typeof MyComponent>;

        /**
         * Default story for the \`MyComponent\` component.
         * This comment will show up as the story's description in Storybook's Autodocs.
         */
        export const Default: Story = {
          parameters: {
            actions: { disable: true },
            chromatic: { disableSnapshot: true },
          },
          args: {
            // complete the args!
          },
        };
        "
      `);

      // extract the index.ts file from tree
      const indexFile = tree.read(
        `/lib/design-system/components/src/index.ts`,
        'utf-8'
      );
      expect(indexFile).toMatchInlineSnapshot(`null`);
    });
  });
  describe('Component part', () => {
    const options: DesignSystemComponentGeneratorSchema = {
      name: 'My part 1',
      componentPartOf: 'my-component',
    };

    beforeEach(() => {
      tree = createProjectWithComponent();
    });

    it('runs successfully', async () => {
      await designSystemComponentGenerator(tree, options);

      // check if the component files were generated
      expect(
        tree.exists(
          `/lib/design-system/src/components/my-component/parts/MyPart1.tsx`
        )
      ).toBeTruthy();
      expect(
        tree.exists(
          `/lib/design-system/src/components/my-component/parts/MyPart1.stories.tsx`
        )
      ).toBeTruthy();
    });

    it('has the correct content', async () => {
      await designSystemComponentGenerator(tree, options);

      const componentFile = tree.read(
        `/lib/design-system/src/components/my-component/parts/MyPart1.tsx`,
        'utf-8'
      );
      expect(componentFile).toMatchInlineSnapshot(`
        "import { forwardRef } from 'react';

        import type { PropsWithChildren } from 'react';
        import type { VariantProps } from 'tailwind-variants';

        import { tv } from 'tailwind-variants';

        export const myPart1 = tv({
          // add the component styles
          base: '',
        });

        export interface MyPart1Props
          extends PropsWithChildren<VariantProps<typeof myPart1>> {
          // add the component props here
        }

        const MyPart1 = forwardRef<HTMLDivElement, MyPart1Props>(
          ({ children, ...props }, ref) => {
            return (
              <div ref={ref} className={myPart1()} {...props}>
                {children}
              </div>
            );
          }
        );

        MyPart1.displayName = 'MyPart1';

        export { MyPart1 };
        "
      `);

      const storyFile = tree.read(
        `/lib/design-system/src/components/my-component/parts/MyPart1.stories.tsx`,
        'utf-8'
      );

      expect(storyFile).toMatchInlineSnapshot(`
        "import type { Meta, StoryObj } from '@storybook/react';

        import { MyPart1 } from './MyPart1';

        /**
         * Meta data for the \`MyPart1\` component.
         * This comment will show up as the main opening paragraph in Storybook's Autodocs.
         */
        const meta: Meta<typeof MyPart1> = {
          component: MyPart1,
          title: 'MyPart1',
          parameters: {
            layout: 'centered',
          },
          tags: ['autodocs'],
        };

        export default meta;

        type Story = StoryObj<typeof MyPart1>;

        /**
         * Default story for the \`MyPart1\` component.
         * This comment will show up as the story's description in Storybook's Autodocs.
         */
        export const Default: Story = {
          parameters: {
            actions: { disable: true },
            chromatic: { disableSnapshot: true },
          },
          args: {
            // complete the args!
          },
        };
        "
      `);

      // extract the index.ts file from tree
      const indexFile = tree.read(
        `/lib/design-system/components/src/index.ts`,
        'utf-8'
      );
      expect(indexFile).toMatchInlineSnapshot(`null`);
    });
  });
});
