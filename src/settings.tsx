import React, { useEffect, useState } from 'react';
import { Box, Text, useApp } from 'ink';
import { MultiSelect } from '@inkjs/ui';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs/promises';

const options = [
  {
    label: 'Add styles',
    value: 'css',
  },
  {
    label: 'Add fixture',
    value: 'fixture',
  },
  {
    label: 'Add decorator',
    value: 'decorator',
  },
  {
    label: 'Save as exact path',
    value: 'exactPath',
  },
];

export const args = null;

export default function Settings() {
  const [value, setValue] = useState<string[]>([]);
  const commandDir = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    '../',
  );
  const file = path.join(commandDir, 'settings.json');
  useEffect(() => {
    fs.readFile(file, 'utf8')
      .then((text) => {
        setValue(JSON.parse(text));
      })
      .catch(async () => {
        const actualValue = ['fixture'];
        setValue(actualValue);
        await fs.writeFile(file, JSON.stringify(actualValue));
      });
  }, []);
  return (
    <Box
      flexDirection='column'
      gap={1}
    >
      <Box flexDirection='column'>
        <Text>⚡ Select your default settings for creating new components</Text>
        <Text>
          Press <Text italic>Space</Text> to toggle options,{' '}
          <Text italic>Enter</Text> to save
        </Text>
      </Box>
      {value.length > 0 && (
        <SettingsSelect
          value={value}
          file={file}
        />
      )}
    </Box>
  );
}

type SettingsSelectProps = {
  value: string[];
  file: string;
};

function SettingsSelect({ value, file }: SettingsSelectProps) {
  const { exit } = useApp();
  return (
    <MultiSelect
      options={options}
      defaultValue={value}
      onChange={async (newValue) => {
        await fs.writeFile(file, JSON.stringify(newValue));
      }}
      onSubmit={() => {
        exit();
      }}
    />
  );
}
