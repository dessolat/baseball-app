import React, { useState } from 'react';
import './SimpleToggler.module.scss';

const SimpleToggler = props => {
  const [isChecked, setIsChecked] = useState(false);

  const handleClick = () => setIsChecked(prev => !prev);
  return (
    <label>
      <input type='checkbox' checked={isChecked} onChange={handleClick} {...props} />
    </label>
  );
};

export default SimpleToggler;
