import React from 'react';
import cl from './PlaysBat.module.scss';
import BatterImg from 'images/batter.jpg';

const PlaysBatMedia = () => {
  return (
    <div className={cl.batter}>
      <img src={BatterImg} alt='batter' />
    </div>
  );
};

export default PlaysBatMedia;
