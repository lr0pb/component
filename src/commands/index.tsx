import React, { useEffect, useState } from 'react';
import { argument } from 'pastel';
import { Box, Text, useApp } from 'ink';
import { Spinner, StatusMessage } from '@inkjs/ui';
import zod from 'zod';
import { fileURLToPath } from 'node:url';
import process from 'node:process';
import path from 'node:path';
import fs from 'node:fs/promises';
import { createComponent } from '../createComponent.js';
export { options } from '../options.js';
import type { Options } from '../options.js';
import { Settings } from '../settings.js';

export const args = zod.tuple([
  zod.string().describe(
    argument({
      name: 'PathToComponent',
      description: 'Path to component relative to source dir',
    }),
  ),
]);

type Props = {
  args: zod.infer<typeof args>;
  options: Options;
};

type States = 'loading' | 'exists' | 'ready' | 'creating' | 'success' | 'error';

export default function Index({ args, options }: Props) {
  const { exit } = useApp();
  const [status, setStatus] = useState<States>('loading');
  const [error, setError] = useState('');
  const name = args[0].match(/(?<=\/)\w+$/)?.[0] as string;
  const commandDir = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    '../',
  );
  const resolveDir = (actualOptions: Options) => {
    return path.resolve(
      process.cwd(),
      actualOptions.sourceDir,
      args[0].replace(/^[\/]+/, '').replace(name, ''),
      actualOptions.exactPath ? '' : 'components',
      name,
    );
  };
  const [dir, setDir] = useState(resolveDir(options));
  useEffect(() => {
    fs.stat(dir)
      .then(() => {
        setStatus('exists');
      })
      .catch(() => {
        setStatus('ready');
      });
  }, [dir]);
  const onDone = (actualOptions: Options) => {
    setStatus('creating');
    createComponent(commandDir, dir, name, actualOptions)
      .then(() => {
        setStatus('success');
        exit();
      })
      .catch((err) => {
        setStatus('error');
        setError(String(err));
        exit();
      });
  };
  if (status === 'loading') return <Spinner label='Loading' />;
  return (
    <Box flexDirection='column'>
      <Text>
        ⚡ Creating <Text bold>{name}</Text> component
      </Text>
      <Text>
        📦 Destination: <Text bold>{dir}</Text>
      </Text>
      {status === 'exists' ? (
        <Box marginTop={1}>
          <StatusMessage variant='error'>
            Component with this name already exists
          </StatusMessage>
        </Box>
      ) : (
        <Settings
          options={options}
          onChange={(actualOptions) => {
            setDir(resolveDir(actualOptions));
          }}
          onDone={onDone}
        />
      )}
      {status === 'creating' ? (
        <Spinner label='Creating component...' />
      ) : status === 'success' ? (
        <StatusMessage variant='success'>
          Component was created! Opening...
        </StatusMessage>
      ) : status === 'error' ? (
        <Box flexDirection='column'>
          <Text color='red'>😶 Something went wrong!</Text>
          <Text>{error}</Text>
        </Box>
      ) : null}
    </Box>
  );
}
