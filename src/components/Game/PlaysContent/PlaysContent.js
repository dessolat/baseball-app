import React from 'react';
import PlaysHitting from '../PlaysHitting/PlaysHitting';
import PlaysPitch from '../PlaysPitch/PlaysPitch';

const PlaysContent = ({ footerTab, currentMoment }) => (
  <>{footerTab === 'pitch' ? <PlaysPitch currentMoment={currentMoment} /> : <PlaysHitting />}</>
);
export default PlaysContent;
