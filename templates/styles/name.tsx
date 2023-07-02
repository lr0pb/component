import * as styles from './name.module.scss';
import { Component } from '@/shared/components/Component';

type Props = {
  children?: React.ReactNode;
};

export function name({ children }: Props) {
  return (
    <Component
      size='contain'
      className={styles.smallName}
    >
      {children}
    </Component>
  );
}
