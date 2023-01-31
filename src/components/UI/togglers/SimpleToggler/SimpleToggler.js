import React from 'react';
import cl from './SimpleToggler.module.scss';

const SimpleToggler = props => (
  <label className={cl.togglerLabel}>
    <input type='checkbox' {...props} />
  </label>
);
export default SimpleToggler;
