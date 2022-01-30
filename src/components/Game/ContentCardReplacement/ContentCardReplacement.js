import React, { useLayoutEffect, useRef } from 'react';
import cl from './ContentCardReplacement.module.scss';
import PortraitImg from 'images/portrait.png';

const ContentCardReplacement = ({ events }) => {
  const ref = useRef(null);

  useLayoutEffect(() => {
		if (ref.current === null) return 

    ref.current.innerHTML = text + '.';
  }, [text]);

  return (
    <div className={cl.replace}>
      <div className={cl.portrait}>
        <img className={cl.default} src={PortraitImg} alt='Portrait' />
      </div>
      <p className={cl.text} ref={ref}>
        {text + '.'}
      </p>
      <div className={cl.portrait}>
        <img className={cl.default} src={PortraitImg} alt='Portrait' />
      </div>
    </div>
  );
};

export default ContentCardReplacement;
