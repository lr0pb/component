import React from 'react';
import { Box, Text } from 'ink';
import { Spinner, StatusMessage } from '@inkjs/ui';

export type State =
  | 'loading'
  | 'exists'
  | 'ready'
  | 'creating'
  | 'success'
  | 'error';

type Props = {
  status: State;
  error: string;
};

export function ResultStatus({ status, error }: Props) {
  return status === 'creating' ? (
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
  ) : null;
}
