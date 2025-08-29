import * as path from 'node:path'

import type { Tree } from '@nx/devkit'

import { readProjectConfiguration } from '@nx/devkit'

export function registerComponent(tree: Tree, componentPath: string) {
  const exportStatement = `export * from './${componentPath}'`
  const designSystemConfig = readProjectConfiguration(
    tree,
    '@meteo-parapente-new/design-system'
  )

  if (!designSystemConfig.sourceRoot) {
    throw new Error('design-system package is missing a sourceRoot')
  }

  const indexFilePath = path.join(designSystemConfig.sourceRoot, 'index.ts')
  let indexContent = tree.read(indexFilePath, 'utf-8')
  if (!indexContent) {
    throw new Error('Unable to locate lib/design-system/src/index.ts')
  }

  indexContent = `${indexContent}\n${exportStatement}`

  tree.write(indexFilePath, indexContent)
}
