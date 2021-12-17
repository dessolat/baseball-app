import React from 'react';
import cl from './PlaysBat.module.scss';
import PlaysBatFooter from './PlaysBatFooter';
import PlaysBatHeader from './PlaysBatHeader';
import PlaysBatMedia from './PlaysBatMedia';

const PlaysBat = ({ currentDot, handleDotClick, currentMoment }) => {
  return (
    <div className={cl.bat}>
      <PlaysBatHeader />
      <PlaysBatMedia currentMoment={currentMoment}/>
      <PlaysBatFooter currentDot={currentDot} handleDotClick={handleDotClick} />
    </div>
  );
};

export default PlaysBat;
