import React, { useState } from 'react';
import { Box, Text } from 'ink';
import { MultiSelect } from '@inkjs/ui';
import type { Options, Key } from '../options.js';
import type { Pack } from '../getOptionPacks.js';

type GetOptions = (options: Options) => void;

type Props = {
  options: Options;
  pack: Pack;
  onChange: GetOptions;
  onDone: GetOptions;
};

export function Settings({ options, pack, onChange, onDone }: Props) {
  const { booleanOptions, selectOptions, defaultOptions } = pack;
  const [submited, setSubmited] = useState(false);
  const convertOptions = (values: Key[]): Options => {
    const responseOptions: any = { ...options, ...booleanOptions };
    values.forEach((value) => {
      responseOptions[value] = true;
    });
    return responseOptions;
  };
  return (
    <>
      <Text>
        ⌨️{'  '}Press <Text italic>Space</Text> to toggle options,{' '}
        <Text italic>Enter</Text> to create component
      </Text>
      <Box marginY={1}>
        <MultiSelect
          options={selectOptions}
          defaultValue={defaultOptions}
          onChange={(values) => {
            onChange(convertOptions(values as Key[]));
          }}
          onSubmit={(values) => {
            if (submited) return;
            setSubmited(true);
            onDone(convertOptions(values as Key[]));
          }}
        />
      </Box>
    </>
  );
}
