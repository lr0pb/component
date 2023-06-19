import { options } from './commands/index.js';
import zod from 'zod';
import path from 'node:path';
import fs from 'node:fs/promises';
import open from 'open';

type Options = Partial<zod.infer<typeof options>>;
type Replacer = (fileContent: string) => string;

export async function createComponent(
  commandDir: string,
  dir: string,
  name: string,
  options: Options,
) {
  await fs.mkdir(dir, {
    recursive: true,
  });
  const j = (templatePath: string) => {
    return path.join(commandDir, 'templates', templatePath);
  };
  const r: Replacer = (fileContent) => {
    return fileContent.replaceAll('name', name);
  };
  await copyFolder(j('common'), dir, r);
  if (options.fixture) {
    await copyFolder(j('fixture'), dir, r);
  }
  if (options.css) {
    await copyFolder(j('styles'), dir, (fileContent) => {
      return r(fileContent).replaceAll('smallName', name.toLowerCase());
    });
  }
  if (options.decorator) {
    await copyFolder(j('decorator'), dir, r);
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
