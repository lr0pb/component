import React from 'react';
import { Box, Text } from 'ink';
import type { Key } from '../options.js';
import type { Pack } from '../getOptionPacks.js';

type Props = {
  pack: Pack;
};

export function OptionsList({ pack }: Props) {
  const { selectOptions, defaultOptions } = pack;
  return (
    <>
      <Text>🗃️{'  '}Using next options:</Text>
      <Box
        flexDirection='column'
        marginY={1}
      >
        {selectOptions.map((option) => {
          const selected = defaultOptions.includes(option.value as Key);
          return (
            <Text
              color={selected ? 'green' : 'white'}
              key={option.value}
            >
              {'   '}
              {option.label} {selected ? '✔' : null}
            </Text>
          );
        })}
      </Box>
    </>
  );
}
