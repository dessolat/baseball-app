import React from 'react';
import cl from './ContentCardReplacement.module.scss';
import PortraitImg from 'images/portrait.png';

const ContentCardReplacementItem = ({ event }) => {
  return (
    <div className={cl.replace}>
      <div className={cl.portrait}>
        <img className={cl.default} src={PortraitImg} alt='Portrait' />
      </div>
      <p className={cl.text}>{event.description}</p>
      <div className={cl.portrait}>
        <img className={cl.default} src={PortraitImg} alt='Portrait' />
      </div>
    </div>
  );
};

export default ContentCardReplacementItem;
