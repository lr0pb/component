import type { Options } from './options.js';
import path from 'node:path';
import fs from 'node:fs/promises';
import open from 'open';
import { getBooleanOptions } from './getBooleanOptions.js';

type Replacer = (fileContent: string) => string;

export async function createComponent(
  commandDir: string,
  dir: string,
  name: string,
  options: Options,
) {
  const splittedName = name.split('');
  splittedName[0] = splittedName[0]?.toLowerCase()!;
  const smallName = splittedName.join('');
  await fs.mkdir(dir, {
    recursive: true,
  });
  const booleanOptions = getBooleanOptions(options, true);
  delete booleanOptions['exactPath'];
  delete booleanOptions['yes'];
  const sequense = ['common', ...Object.keys(booleanOptions), 'styles-types'];
  booleanOptions['common'] = true;
  for (const key of sequense) {
    if (key.includes('-')) {
      const keys = key.split('-');
      let allTrue = true;
      for (const oneKey of keys) {
        if (!booleanOptions[oneKey]) allTrue = false;
      }
      if (!allTrue) continue;
    } else if (!booleanOptions[key]) {
      continue;
    }
    await copyFolder(
      path.join(commandDir, 'templates', key),
      dir,
      (fileContent) => {
        return fileContent
          .replaceAll('name', name)
          .replaceAll('smallName', smallName);
      },
    );
  }
  const file = path.join(dir, name + '.tsx');
  await open(file);
}

async function copyFolder(
  inFolder: string,
  outFolder: string,
  replacer: Replacer,
) {
  const files = await fs.readdir(inFolder);
  for (const name of files) {
    const source = await fs.readFile(path.join(inFolder, name), 'utf8');
    const outPath = path.join(outFolder, replacer(name));
    await fs.writeFile(outPath, replacer(source));
  }
}
