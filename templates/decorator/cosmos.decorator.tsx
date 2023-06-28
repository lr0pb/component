import type { ReactDecorator } from 'react-cosmos-core';

const decorator: ReactDecorator = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  );
};

// eslint-disable-next-line
export default decorator;
