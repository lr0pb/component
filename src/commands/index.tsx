import React, { useEffect, useState } from 'react';
import { option, argument } from 'pastel';
import { Text } from 'ink';
import { Spinner, StatusMessage } from '@inkjs/ui';
import zod from 'zod';
import { fileURLToPath } from 'node:url';
import process from 'node:process';
import path from 'node:path';
import fs from 'node:fs/promises';
import { createComponent } from '../createComponent.js';

export const options = zod.object({
  css: zod.boolean().describe(
    option({
      description: 'Style files for the component',
      alias: 'c',
    }),
  ),
  decorator: zod.boolean().describe(
    option({
      description: 'Cosmos decorator for the component',
      alias: 'd',
    }),
  ),
  fixture: zod
    .boolean()
    .default(true)
    .describe('Fixture file for the component'),
  exactPath: zod.boolean().describe(
    option({
      description: 'Create exact folder for the component in source dir',
      alias: 'e',
    }),
  ),
  sourceDir: zod
    .string()
    .default('src')
    .describe('Source directory to put component folders in'),
});

export const args = zod.tuple([
  zod.string().describe(
    argument({
      name: 'PathToComponent',
      description:
        'Path to component, without `src` in begin and `components` before component name folders',
    }),
  ),
]);

type Props = {
  args: zod.infer<typeof args>;
  options: zod.infer<typeof options>;
};

type States = 'loading' | 'success' | 'fail';

export default function Index({ args, options }: Props) {
  const [status, setStatus] = useState<States>('loading');
  // const [flags, setFlags] = useState<Partial<Props['options']>>({
  //   sourceDir: 'src',
  // });
  const name = args[0].match(/(?<=\/)\w+$/)?.[0] as string;
  const commandDir = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    '../',
  );
  const dir = path.resolve(
    process.cwd(),
    options.sourceDir,
    args[0].replace(name, ''),
    options.exactPath ? '' : 'components',
    name,
  );
  // useEffect(() => {
  //   const file = path.join(commandDir, 'settings.json');
  //   fs.readFile(file, 'utf8')
  //     .then((text) => {
  //       const actualFlags = { ...flags };
  //       const flagText = JSON.parse(text) as Array<keyof Props['options']>;
  //       for (const value of flagText) {
  //         actualFlags[value] = true as unknown as undefined;
  //       }
  //       setFlags(actualFlags);
  //     })
  //     .catch(async () => {
  //       const actualFlags = { ...flags, fixture: true };
  //       setFlags(actualFlags);
  //     });
  // }, []);
  useEffect(() => {
    fs.stat(dir)
      .then(() => {
        setStatus('fail');
      })
      .catch(() => {
        createComponent(commandDir, dir, name, options).then(() => {
          setStatus('success');
        });
      });
  }, []);
  if (status === 'loading') return <Spinner label='Creating component' />;
  if (status === 'fail')
    return (
      <StatusMessage variant='error'>
        Component with this name already exists
      </StatusMessage>
    );
  if (status === 'success')
    return (
      <StatusMessage variant='success'>
        Component was created! Opening...
      </StatusMessage>
    );
  return <Text color='red'>Something went wrong!</Text>;
}
