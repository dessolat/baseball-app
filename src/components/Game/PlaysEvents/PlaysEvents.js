import React from 'react';
import { useSelector } from 'react-redux';
import useGameFocus from 'hooks/useGameFocus';
import cl from './PlaysEvents.module.scss';
import PlaysEventsList from './PlaysEventsList';
// import PlaysEventsTotal from './PlaysEventsTotal';
import ContentPitcher from '../ContentPitcher/ContentPitcher';
import classNames from 'classnames';

const PlaysEvents = () => {
  const moments = useSelector(state => state.game.moments);
  const isVideo = useSelector(state => state.game.isVideo);

	const eventsClasses = classNames(cl.events, {
		[cl.noVideo]: !isVideo
	})
  return (
    <div className={eventsClasses} onClick={useGameFocus('list')}>
      <PlaysEventsList moments={moments} />
      {!isVideo && (
        <div className={cl.pitcherWrapper}>
          <ContentPitcher />
        </div>
      )}
      {/* <PlaysEventsTotal moments={moments} /> */}
    </div>
  );
};

export default PlaysEvents;
