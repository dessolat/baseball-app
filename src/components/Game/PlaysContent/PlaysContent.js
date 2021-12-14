import React from 'react';
import PlaysHitting from '../PlaysHitting/PlaysHitting';
import PlaysPitch from '../PlaysPitch/PlaysPitch';

const PlaysContent = ({ footerTab, currentMoment }) => {
  const renderComponent =
    footerTab === 'pitch' ? <PlaysPitch currentMoment={currentMoment} /> : <PlaysHitting />;

  return <>{renderComponent}</>;
};
export default PlaysContent;
