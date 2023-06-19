import { nameProps } from './name.types';

export function name({
  children,
}: nameProps) {
  return (
    <div>
      {children}
    </div>
  );
}
