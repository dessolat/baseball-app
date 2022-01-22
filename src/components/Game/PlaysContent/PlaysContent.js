import React from 'react';
import PlaysHitting from '../PlaysHitting/PlaysHitting';
import PlaysPitch from '../PlaysPitch/PlaysPitch';
import PlaysRunning from '../PlaysRunning/PlaysRunning';

const PlaysContent = ({ currentTab }) => {
  const renderComponent =
	currentTab === 'hitting' ? (
      <PlaysHitting />
    ) : currentTab === 'running' ? (
      <PlaysRunning />
    ) : (
      <PlaysPitch />
    );

  return <>{renderComponent}</>;
};
export default PlaysContent;
