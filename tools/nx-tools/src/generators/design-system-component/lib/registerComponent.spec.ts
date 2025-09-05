import type { Tree } from '@nx/devkit'

import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { registerComponent } from './registerComponent'

describe('registerComponent', () => {
  let tree: Tree
  const originalCwd = process.cwd
  beforeEach(async () => {
    tree = createTreeWithEmptyWorkspace()

    tree.write(
      '/lib/design-system/project.json',
      `
     {
        "name": "design-system",
        "$schema": "../../node_modules/nx/schemas/nx-schema.json",
        "projectType": "library",
        "sourceRoot": "lib/design-system/src",
        "tags": []
        }
    `,
    )

    tree.write(
      '/lib/design-system/src/index.ts',
      `
    export * from './test/Test'
    `,
    )
  })

  afterEach(() => {
    process.cwd = originalCwd
  })

  it('should update the exported plugins', () => {
    registerComponent(tree, 'my-component/MyComponent')

    const indexFileContent = tree.read(
      '/lib/design-system/src/index.ts',
      'utf-8',
    )

    expect(indexFileContent).toMatchInlineSnapshot(`
      "
          export * from './test/Test'

      export * from './my-component/MyComponent'"
    `)
  })
})
