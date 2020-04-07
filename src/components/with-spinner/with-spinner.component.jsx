import React from 'react';
import { SpinnerOverlay } from './with-spinner.styles';

const WithSpinner = (WrappedComponet) => {
  const Spinner = ({ isLoading, ...otherProps }) => {
    return isLoading ? (
      <SpinnerOverlay>
        <SpinnerOverlay />
      </SpinnerOverlay>
    ) : (
      <WrappedComponet {...otherProps} />
    );
  };
  return Spinner;
};

export default WithSpinner;
