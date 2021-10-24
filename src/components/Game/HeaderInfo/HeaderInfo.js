import React from 'react';
import cl from './HeaderInfo.module.scss';

const HeaderInfo = ({data}) => {
  return (
    <div className={cl.info}>
      <div>
        <span>R</span>
        <span>{data.attack.r}</span>
        <span>{data.defence.r}</span>
      </div>
      <div>
        <span>H</span>
        <span>{data.attack.h}</span>
        <span>{data.defence.h}</span>
      </div>
      <div>
        <span>E</span>
        <span>{data.attack.e}</span>
        <span>{data.defence.e}</span>
      </div>
    </div>
  );
};

export default HeaderInfo;
