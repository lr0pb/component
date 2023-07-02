import { Component } from '@/shared/components/Component';

type Props = {
  children?: React.ReactNode;
};

export function name({ children }: Props) {
  return (
    <Component size='contain'>
      {children}
    </Component>
  );
}
