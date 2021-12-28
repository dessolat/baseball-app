import React, { useState } from 'react';
import cl from './PlaysBat.module.scss';
import PlaysBatFooter from './PlaysBatFooter';
import PlaysBatHeader from './PlaysBatHeader';
import PlaysBatMedia from './PlaysBatMedia';

const PlaysBat = ({ currentMoment }) => {
  const [currentDot, setCurrentDot] = useState('');

  const handleDotClick = str => () => setCurrentDot(str);

  return (
    <div className={cl.bat}>
      <PlaysBatHeader />
      <PlaysBatMedia currentMoment={currentMoment} />
      <PlaysBatFooter currentDot={currentDot} currentMoment={currentMoment} handleDotClick={handleDotClick} />
    </div>
  );
};

export default PlaysBat;
