#!/usr/bin/env node
/**
 * Fix ESM relative imports by appending .js to extensionless specifiers in compiled JS output.
 * Usage: node tools/fix-esm-extensions.mjs <distDir>
 */
import fs from 'node:fs';
import path from 'node:path';

const distRoot = process.argv[2];
if (!distRoot) {
  console.error('Usage: node tools/fix-esm-extensions.mjs <distDir>');
  process.exit(1);
}

const JS_EXTENSIONS = new Set(['.js', '.mjs', '.cjs']);
const NON_CODE_EXTENSIONS = new Set(['.json', '.node']);

/**
 * Returns true if specifier is relative (starts with ./ or ../)
 */
function isRelative(spec) {
  return spec.startsWith('./') || spec.startsWith('../');
}

/**
 * Returns true if specifier already has an extension we should not touch.
 */
function hasKnownExtension(spec) {
  const ext = path.extname(spec);
  if (!ext) return false;
  return JS_EXTENSIONS.has(ext) || NON_CODE_EXTENSIONS.has(ext);
}

/**
 * Append .js to specifier if it has no extension and is relative.
 */
function addJsExtensionIfNeeded(spec) {
  if (!isRelative(spec)) return spec;
  if (hasKnownExtension(spec)) return spec;
  // Preserve any trailing query/hash (unlikely in Node ESM, but safe)
  const match = spec.match(/^(.*?)([?#].*)?$/);
  const base = match ? match[1] : spec;
  const suffix = match && match[2] ? match[2] : '';
  return `${base}.js${suffix}`;
}

// Regexes to capture import/export specifiers in multiple forms.
// Supported examples:
// - import x from './foo'
// - import { x } from './foo'
// - import * as ns from './foo'
// - export { x } from './foo'
// - export * from './foo'
// - import './side-effect'
// - import('./foo')
const reImportFrom = /\bimport\s+[^'"\n;]*?from\s*(["'])([^"']+)\1/g;
const reExportFrom = /\bexport\s+[^'"\n;]*?from\s*(["'])([^"']+)\1/g;
const reSideEffectImport = /\bimport\s*(["'])([^"']+)\1\s*;?/g;
const reDynamicImport = /\bimport\s*\(\s*(["'])([^"']+)\1\s*\)/g;

function replaceAll(content, regex, groupIndex = 2) {
  return content.replace(regex, (m, q, spec) => {
    const fixed = addJsExtensionIfNeeded(spec);
    if (fixed === spec) return m;
    return m.replace(`${q}${spec}${q}`, `${q}${fixed}${q}`);
  });
}

function processJs(content) {
  let out = content;
  out = replaceAll(out, reImportFrom);
  out = replaceAll(out, reExportFrom);
  out = replaceAll(out, reSideEffectImport);
  out = replaceAll(out, reDynamicImport);
  return out;
}

function walk(dir, onFile) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, onFile);
    } else if (entry.isFile()) {
      onFile(full);
    }
  }
}

let changedFiles = 0;

function processFile(file) {
  const ext = path.extname(file);
  if (ext !== '.js' && ext !== '.mjs' && ext !== '.cjs') return;
  const original = fs.readFileSync(file, 'utf8');
  const fixed = processJs(original);
  if (fixed !== original) {
    fs.writeFileSync(file, fixed, 'utf8');
    changedFiles++;
  }
}

if (!fs.existsSync(distRoot)) {
  console.error(`Directory not found: ${distRoot}`);
  process.exit(2);
}

walk(distRoot, processFile);
console.log(`fix-esm-extensions: updated ${changedFiles} file(s).`);
