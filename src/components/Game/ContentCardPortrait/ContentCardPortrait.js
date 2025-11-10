import React, { useState } from 'react';
import PortraitImg from 'images/portrait.png';
import { getDomen } from 'utils';

const ContentCardPortrait = ({ playerId, cl, ...props }) => {
  const [isLoaded, setLoaded] = useState(false);

  const pHolderStyles = isLoaded ? { display: 'none' } : {};
  const imgStyles = !isLoaded ? { display: 'none' } : {};

  return (
    <div className={cl.portrait} {...props}>
      <img className={cl.default} src={PortraitImg} style={pHolderStyles} alt='Portrait' />
      <img
        src={`${getDomen()}/logo/${playerId}`}
        onLoad={() => setLoaded(true)}
        style={imgStyles}
        alt='Portrait'
      />
    </div>
  );
};

export default ContentCardPortrait;
