import * as styles from './name.module.scss';
import { nameProps } from './name.types';

export function name({
  children,
}: nameProps) {
  return (
    <div className={styles.smallName}>
      {children}
    </div>
  );
}
