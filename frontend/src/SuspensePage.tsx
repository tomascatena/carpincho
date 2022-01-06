import React, { FC, Suspense, createElement } from 'react';

interface Props {
  component: FC;
}

export const SuspensePage: FC<Props> = ({ component }) => {
  return (
    <Suspense fallback='Loading Page ...'>{createElement(component)}</Suspense>
  );
};
