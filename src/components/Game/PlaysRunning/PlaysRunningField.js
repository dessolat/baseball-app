import React, { useEffect, useRef, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentCard, setCurrentMoment, setPlaybackMode } from 'redux/gameReducer';
import cl from './PlaysRunning.module.scss';

const PlaysRunningField = ({ field }) => {
  const currentCard = useSelector(state => state.game.currentCard);
  const currentMoment = useSelector(state => state.game.currentMoment);
  const playbackMode = useSelector(state => state.game.playbackMode);
  const filteredCards = useSelector(state => state.game.filteredCards);
  const dispatch = useDispatch();

  const playRef = useRef();

  useEffect(() => () => clearTimeout(playRef.current), []);

  useEffect(() => {
    if (playbackMode === 'pause') return;

    const newMoments = [];
    currentCard.type !== 'Replacement'
      ? currentCard.moments?.forEach(moment => moment.icons && newMoments.push(moment))
      : newMoments.push(currentCard.moments[0]);

    const momentIndex = newMoments?.findIndex(moment => moment.inner?.id === currentMoment?.inner?.id);
    const cardIndex = filteredCards.findIndex(
      card => card.moments[0].inner.id === currentCard.moments[0].inner.id
    );

    playRef.current = setTimeout(() => {
      if (
        (momentIndex >= currentCard.moments.length - 1 && cardIndex >= filteredCards.length - 1) ||
        momentIndex === -1
      ) {
        dispatch(setPlaybackMode('pause'));
        return;
      }
      if (momentIndex >= currentCard.moments.length - 1) {
        dispatch(setCurrentCard({ ...filteredCards[cardIndex + 1], manualMoment: true }));
        return;
      }
      dispatch(setCurrentMoment(newMoments[momentIndex + 1]));
    }, 2000);
		// eslint-disable-next-line
  }, [currentMoment]);

  useEffect(() => {
    if (playbackMode === 'pause') {
      clearTimeout(playRef.current);
      return;
    }

		const newMoments = [];
    currentCard.type !== 'Replacement'
      ? currentCard.moments?.forEach(moment => moment.icons && newMoments.push(moment))
      : newMoments.push(currentCard.moments[0]);

    const momentIndex = newMoments?.findIndex(moment => moment.inner?.id === currentMoment?.inner?.id);
    const cardIndex = filteredCards.findIndex(
      card => card.moments[0].inner.id === currentCard.moments[0].inner.id
    );

    playRef.current = setTimeout(() => {
      if (
        (momentIndex >= currentCard.moments.length - 1 && cardIndex >= filteredCards.length - 1) ||
        momentIndex === -1
      ) {
        dispatch(setPlaybackMode('pause'));
        return;
      }
      if (momentIndex >= currentCard.moments.length - 1) {
        dispatch(setCurrentCard({ ...filteredCards[cardIndex + 1], manualMoment: true }));
        return;
      }
      dispatch(setCurrentMoment(newMoments[momentIndex + 1]));
    }, 2000);
		// eslint-disable-next-line
  }, [playbackMode]);

  let ballPath = '';

  field
    ?.filter(coords => coords.length > 0)
    .forEach(coords => {
      ballPath += `M${coords[0][0]} ${coords[0][1]}`;
      coords.slice(1).forEach(coord => (ballPath += `L${coord[0]} ${coord[1]}`));
    });

  return (
    <svg
      className={cl.field}
      width='100%'
      height='100%'
      viewBox='0 0 2560 2560'
      fill='none'
      preserveAspectRatio='none'>
      <path
        d={ballPath}
        stroke='red'
        strokeWidth='25'
        strokeLinejoin='round'
        strokeLinecap='round'
        strokeDasharray='1 35'></path>
    </svg>
  );
};

export default memo(PlaysRunningField);
