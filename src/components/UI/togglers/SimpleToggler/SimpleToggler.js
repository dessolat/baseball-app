import React from 'react';
import './SimpleToggler.module.scss';

const SimpleToggler = props => (
  <label>
    <input type='checkbox' {...props} />
  </label>
);
export default SimpleToggler;
