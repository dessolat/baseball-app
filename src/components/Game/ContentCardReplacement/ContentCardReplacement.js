import React from 'react';
import cl from './ContentCardReplacement.module.scss';
import PortraitImg from 'images/portrait.png';

const ContentCardReplacement = ({ text = '' }) => {
  return (
    <div className={cl.replace}>
      {/* <img className={cl.portrait} src={require('images/portrait.png').default} alt='Portrait' /> */}
      <div className={cl.portrait}>
          <img
						className={cl.default}
            src={PortraitImg}
            alt='Portrait'
          />
        </div>
      <p className={cl.text}>{text + '.'}</p>
      {/* <img className={cl.portrait} src={PortraitImg} alt='Portrait' /> */}
			<div className={cl.portrait}>
          <img
						className={cl.default}
            src={PortraitImg}
            alt='Portrait'
          />
        </div>
    </div>
  );
};

export default ContentCardReplacement;
