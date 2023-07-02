import { option } from 'pastel';
import zod from 'zod';

export const options = zod.object({
  types: zod.boolean().default(true).describe('Separated types file'),
  styles: zod.boolean().describe(
    option({
      description: 'Style files',
      alias: 's',
    }),
  ),
  fixture: zod.boolean().default(true).describe('Fixtures object file'),
  singleFixture: zod.boolean().describe(
    option({
      description: 'Single fixture file',
      alias: 'f',
    }),
  ),
  decorator: zod.boolean().describe(
    option({
      description: 'Cosmos decorator',
      alias: 'd',
    }),
  ),
  exactPath: zod.boolean().describe(
    option({
      description: 'Create exact folder',
      alias: 'e',
    }),
  ),
  sourceDir: zod
    .string()
    .default('src')
    .describe('Source directory to put component folders in'),
  yes: zod.boolean().describe(
    option({
      description: 'Create component immediatelly without using interface',
      alias: 'y',
    }),
  ),
});

export type Options = zod.infer<typeof options>;

export type Key = keyof Options;
