import SimpleToggler from 'components/UI/togglers/SimpleToggler/SimpleToggler';
import React from 'react';
import cl from './VideoOptions.module.scss';

const Effects = () => {
  return (
    <div className={cl.effectsWrapper}>
      Effects
      <SimpleToggler />
    </div>
  );
};

export default Effects;
