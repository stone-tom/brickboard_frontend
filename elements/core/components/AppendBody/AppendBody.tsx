import React from 'react';
import { useStoreState } from '../../../../context/custom_store';

const AppendBody = (() => {
  const { component } = useStoreState();

  return (
    <>
      {component}
    </>
  );
});

export default AppendBody;
