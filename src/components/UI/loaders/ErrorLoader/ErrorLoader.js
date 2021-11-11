import React from 'react';
import cl from './ErrorLoader.module.scss';

const ErrorLoader = ({ error }) => {
	console.log(error)
  return <p className={cl.error}>{error}</p>;
};

export default ErrorLoader;
