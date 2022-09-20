import React from 'react';
import cl from './SwitchArrow.module.scss';
import SwitchArrowIcon from 'icons/switch_arrow.svg'

const SwitchArrow = () => {
  return (
    <div className={cl.arrowWrapper}>
      <img src={SwitchArrowIcon} alt='switch-arrow' />
    </div>
  );
};

export default SwitchArrow;
