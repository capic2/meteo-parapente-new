import {
  formatFiles,
  generateFiles,
  names,
  readProjectConfiguration,
  Tree,
} from '@nx/devkit';
import * as path from 'path';
import type { DesignSystemComponentGeneratorSchema } from './schema';
import { registerComponent } from './lib/registerComponent';

function normalizeOptions(options: DesignSystemComponentGeneratorSchema) {
  const nameInput = options.name.trim();
  const componentNames = names(nameInput);

  return {
    ...options,
    directoryName: componentNames.fileName,
    componentName: componentNames.className,
    componentVariantName: componentNames.propertyName,
  };
}

export async function designSystemComponentGenerator(
  tree: Tree,
  options: DesignSystemComponentGeneratorSchema
) {
  const {
    directoryName,
    componentName,
    componentVariantName,
    componentPartOf,
  } = normalizeOptions(options);

  const projectConfiguration = readProjectConfiguration(
    tree,
    '@meteo-parapente-new/design-system'
  );

  if (componentPartOf) {
    const componentRoot = `${projectConfiguration.sourceRoot}/components/${componentPartOf}`;
    if (!tree.exists(componentRoot)) {
      throw new Error('Parent component directory not found.');
    }

    // generate the part component files
    generateFiles(
      tree,
      path.join(import.meta.dirname, 'files'),
      `${componentRoot}/parts`,
      {
        directoryName: `${componentPartOf}/parts`,
        componentName,
        componentVariantName,
      }
    );

    // insert component export in index.ts file
    registerComponent(tree, `${componentPartOf}/parts/${componentName}`);
  } else {
    const componentRoot = `${projectConfiguration.sourceRoot}/components/${directoryName}`;
    // generate the main component files
    generateFiles(
      tree,
      path.join(import.meta.dirname, 'files'),
      componentRoot,
      {
        directoryName,
        componentName,
        componentVariantName,
      }
    );

    // insert component export in index.ts file
    registerComponent(tree, `${directoryName}/${componentName}`);
  }

  await formatFiles(tree);
}

export default designSystemComponentGenerator;
