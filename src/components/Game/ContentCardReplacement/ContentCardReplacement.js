import React from 'react';
import cl from './ContentCardReplacement.module.scss';
import PortraitImg from 'images/portrait.png';

const ContentCardReplacement = ({ text = '' }) => {
  return (
    <div className={cl.replace}>
      <div className={cl.portrait}>
          <img
						className={cl.default}
            src={PortraitImg}
            alt='Portrait'
          />
        </div>
      <p className={cl.text}>{text + '.'}</p>
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
