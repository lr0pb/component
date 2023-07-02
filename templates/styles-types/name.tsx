import * as styles from './name.module.scss';
import type { nameProps } from './name.types';
import { Component } from '@/shared/components/Component';

export function name({
  children,
}: nameProps) {
  return (
    <Component
      size='contain'
      className={styles.smallName}
    >
      {children}
    </Component>
  );
}
