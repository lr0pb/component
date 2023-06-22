import {
  type ZodAnyDef,
  type ZodDefaultDef,
  ZodFirstPartyTypeKind,
  type ZodType,
} from 'zod';
import { options as zodOptions, type Key, type Options } from './options.js';

function zodType(key: Key): ZodType {
  return zodOptions.shape[key];
}

function t(zodTypeInfo: ZodType, type: keyof typeof ZodFirstPartyTypeKind) {
  return (
    (zodTypeInfo._def as ZodAnyDef).typeName === ZodFirstPartyTypeKind[type]
  );
}

function isBooleanType(key: Key) {
  if (t(zodType(key), 'ZodDefault')) {
    const innerType = (zodType(key)._def as ZodDefaultDef).innerType;
    if (!t(innerType, 'ZodBoolean')) {
      return false;
    }
  } else if (!t(zodType(key), 'ZodBoolean')) {
    return false;
  }
  return true;
}

export function getBooleanOptions(options: Options, preserveValues?: boolean) {
  const booleanOptions: Record<string, boolean> = {};
  Object.keys(options).forEach((key) => {
    if (!isBooleanType(key as Key)) return;
    booleanOptions[key] = preserveValues
      ? (options[key as Key] as boolean)
      : false;
  });
  return booleanOptions;
}
