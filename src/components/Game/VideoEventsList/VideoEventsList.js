import React, { useState, useEffect } from 'react';
import useCurrentEvents from 'hooks/useCurrentEvents';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setCurrentMoment, setPlaybackMode } from 'redux/gameReducer';
import cl from './VideoEventsList.module.scss';
import VideoEventsListItem from './VideoEventsListItem';

const VideoEventsList = () => {
  const [classes, setClasses] = useState([]);
  const activeCardList = useSelector(state => state.game.activeCardList);
  const dispatch = useDispatch();
  const moments = useCurrentEvents();

  useEffect(() => {
    if (classes.length === 0) {
      const newClasses =
        activeCardList === 'events' ? [cl.events, cl.blueTopLoad, cl.beforeBlue] : [cl.events, cl.beforeBlue];
      setClasses(newClasses);
      return;
    }

    const newClasses = [cl.events, cl.beforeBlue];
    newClasses.push(activeCardList === 'events' ? cl.wider : cl.taller);
    setClasses(newClasses);
    // eslint-disable-next-line
  }, [activeCardList]);

  const handleMomentClick = moment => () => {
    dispatch(setPlaybackMode('pause'));
    dispatch(setCurrentMoment(moment));
  };
  return (
    <>
      {moments.length !== 0 && (
        <ul className={classes.join(' ')}>
          {moments.map((moment, i) => (
            <VideoEventsListItem key={i} moment={moment} handleClick={handleMomentClick} />
          ))}
        </ul>
      )}
    </>
  );
};

export default VideoEventsList;
