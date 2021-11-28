import useCurrentEvents from 'hooks/useCurrentEvents';
import React from 'react';
import cl from './VideoEventsList.module.scss';
import VideoEventsListItem from './VideoEventsListItem';

const VideoEventsList = () => {
	const moments = useCurrentEvents()

  return (
    <>
      {moments.length !== 0 && (
        <ul className={cl.events}>
          {moments.map((moment, i) => (
            <VideoEventsListItem key={i} moment={moment} />
          ))}
        </ul>
      )}
    </>
  );
};

export default VideoEventsList;
