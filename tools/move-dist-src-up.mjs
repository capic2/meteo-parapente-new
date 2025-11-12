import fs from 'node:fs';
import path from 'node:path';

const distRoot = process.argv[2];
if (!distRoot) {
  console.log('move-dist-src-up: dist path is missing');
  process.exit(0);
}

const srcDir = path.join(distRoot, 'src');

const ensureDir = (dir) => {
  fs.mkdirSync(dir, { recursive: true });
};

const moveContentsUp = (fromDir, toDir) => {
  if (!fs.existsSync(fromDir)) return 0;
  let moved = 0;
  for (const entry of fs.readdirSync(fromDir, { withFileTypes: true })) {
    const from = path.join(fromDir, entry.name);
    const to = path.join(toDir, entry.name);
    if (entry.isDirectory()) {
      ensureDir(to);
      moved += moveContentsUp(from, to);
    } else if (entry.isFile()) {
      ensureDir(path.dirname(to));
      fs.renameSync(from, to);
      moved++;
    }
  }
  return moved;
};

const rmDirRecursive = (dir) => {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) rmDirRecursive(p);
    else fs.unlinkSync(p);
  }
  fs.rmdirSync(dir);
};

const adjustDistPackageJson = (root) => {
  const pkgPath = path.join(root, 'package.json');
  if (!fs.existsSync(pkgPath)) return false;
  const json = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  const fields = ['main', 'module', 'types', 'typings'];
  let changed = false;
  for (const f of fields) {
    if (typeof json[f] === 'string') {
      const v = json[f];
      if (v.startsWith('./src/')) {
        json[f] = './' + v.slice('./src/'.length);
        changed = true;
      }
    }
  }
  if (changed) fs.writeFileSync(pkgPath, JSON.stringify(json, null, 2));
  return changed;
};

if (!fs.existsSync(distRoot)) {
  console.log(`move-dist-src-up: nothing to move (dist not found: ${distRoot}).`);
  process.exit(0);
}

if (!fs.existsSync(srcDir)) {
  console.log('move-dist-src-up: nothing to move (no src folder).');
  process.exit(0);
}

const moved = moveContentsUp(srcDir, distRoot);
rmDirRecursive(srcDir);
const pkgChanged = adjustDistPackageJson(distRoot);
console.log(`move-dist-src-up: moved ${moved} file(s). package.json adjusted: ${pkgChanged}`);
