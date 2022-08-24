import React from 'react';
import cl from './ErrorLoader.module.scss';

const ErrorLoader = ({ error, styles = null }) => (
  <p className={cl.error} style={styles}>
    {error}
  </p>
);

export default ErrorLoader;
