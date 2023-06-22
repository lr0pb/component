import { type Option } from '@inkjs/ui';
import { options as zodOptions, type Options, type Key } from './options.js';
import { getBooleanOptions } from './getBooleanOptions.js';

export type Pack = {
  booleanOptions: Record<string, boolean>;
  selectOptions: Option[];
  defaultOptions: Key[];
};

export function getOptionPacks(options: Options): Pack {
  const booleanOptions = getBooleanOptions(options);
  const selectOptions: Option[] = [];
  const defaultOptions: Key[] = [];
  for (const k in booleanOptions) {
    const key = k as Key;
    const label = zodOptions.shape[key].description as string;
    const match = label.match(/\{[\w\s":,]+\}/);
    const cleaned = match ? JSON.parse(match[0]).description : label;
    selectOptions.push({
      label: cleaned,
      value: key,
    });
    if (options[key] === true) {
      defaultOptions.push(key);
    }
  }
  return { booleanOptions, selectOptions, defaultOptions };
}
