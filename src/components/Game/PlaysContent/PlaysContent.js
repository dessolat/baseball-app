import React from 'react';
import { StringParam, useQueryParam } from 'use-query-params';
import PlaysHitting from '../PlaysHitting/PlaysHitting';
import PlaysPitch from '../PlaysPitch/PlaysPitch';
import PlaysRunning from '../PlaysRunning/PlaysRunning';

const PlaysContent = ({ currentMoment }) => {
  const [tab] = useQueryParam('ptab', StringParam);

  const renderComponent =
	tab === 'hitting' ? (
      <PlaysHitting currentMoment={currentMoment} />
    ) : tab === 'running' ? (
      <PlaysRunning currentMoment={currentMoment} />
    ) : (
      <PlaysPitch currentMoment={currentMoment} />
    );

  return <>{renderComponent}</>;
};
export default PlaysContent;
