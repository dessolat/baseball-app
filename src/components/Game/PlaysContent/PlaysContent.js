import React from 'react';
import PlaysHitting from '../PlaysHitting/PlaysHitting';
import PlaysPitch from '../PlaysPitch/PlaysPitch';
import PlaysRunning from '../PlaysRunning/PlaysRunning';

const PlaysContent = ({ footerTab, currentMoment }) => {
  const renderComponent =
    footerTab === 'pitch' ? (
      <PlaysPitch currentMoment={currentMoment} />
    ) : footerTab === 'hitting' ? (
      <PlaysHitting currentMoment={currentMoment} />
    ) : (
      <PlaysRunning currentMoment={currentMoment} />
    );

  return <>{renderComponent}</>;
};
export default PlaysContent;
