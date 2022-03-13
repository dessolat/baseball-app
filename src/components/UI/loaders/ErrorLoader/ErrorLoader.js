import React from 'react';
import cl from './ErrorLoader.module.scss';

const ErrorLoader = ({ error, styles = null }) => {
  console.log(error);
  return (
    <p className={cl.error} style={styles}>
      {error}
    </p>
  );
};

export default ErrorLoader;
