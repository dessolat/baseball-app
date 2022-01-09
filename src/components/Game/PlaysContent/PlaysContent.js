import React from 'react';
import PlaysHitting from '../PlaysHitting/PlaysHitting';
import PlaysPitch from '../PlaysPitch/PlaysPitch';
import PlaysRunning from '../PlaysRunning/PlaysRunning';

const PlaysContent = ({ currentMoment, currentTab }) => {
  const renderComponent =
	currentTab === 'hitting' ? (
      <PlaysHitting currentMoment={currentMoment} />
    ) : currentTab === 'running' ? (
      <PlaysRunning currentMoment={currentMoment} />
    ) : (
      <PlaysPitch currentMoment={currentMoment} />
    );

  return <>{renderComponent}</>;
};
export default PlaysContent;
