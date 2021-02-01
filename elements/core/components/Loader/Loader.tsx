import React, { ReactNode } from 'react';
import { Loader, LoaderElement } from './Loader.styles';

interface LoaderProps {
  children?: ReactNode,
  isLoading: boolean,
  width?: string,
  height?: string
}

const LoaderComponent = ({
  children,
  isLoading,
  width,
  height,
} : LoaderProps) => {
  if (!isLoading && children) return <>{children}</>;

  return (
    <Loader
      width={width}
      height={height}
    >
      <LoaderElement />
      <LoaderElement />
      <LoaderElement />
      <LoaderElement />
    </Loader>
  );
};

export default LoaderComponent;
