import React from 'react';
import cl from './ContentCardReplacement.module.scss';
import PortraitImg from 'images/portrait.png';

const ContentCardReplacement = ({ text = '' }) => {
  return (
    <div className={cl.replace}>
      <img className={cl.portrait} src={PortraitImg} alt='Portrait' />
      <p className={cl.text}>{text + '.'}</p>
      <img className={cl.portrait} src={PortraitImg} alt='Portrait' />
    </div>
  );
};

export default ContentCardReplacement;
