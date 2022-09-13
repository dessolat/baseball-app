import useCurrentEvents from 'hooks/useCurrentEvents';
import React from 'react';
import PlaysEvents from '../PlaysEvents/PlaysEvents';
import Video from '../Video/Video';
import cl from './Videos.module.scss';

const Videos = () => {
  return (
    <>
      <div className={cl.wrapper}>
        <Video videoId={videoId1} />
      </div>
      <div className={cl.eventsWrapper}>
        <PlaysEvents moments={useCurrentEvents()} />
      </div>
    </>
  );
};

export default Videos;
