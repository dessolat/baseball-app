import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PlaysRunningField from './PlaysRunningField';
import PlaysRunningInfo from './PlaysRunningInfo';
import { setCurrentCard, setCurrentMoment, setPlaybackMode } from 'redux/gameReducer';

const PlaysRunning = () => {
  const [runningMode, setRunningMode] = useState('Field');

  const currentMoment = useSelector(state => state.game.currentMoment);
  const mobileWidth = useSelector(state => state.shared.mobileWidth);
	const currentCard = useSelector(state => state.game.currentCard);
  const playbackMode = useSelector(state => state.game.playbackMode);
  const filteredCards = useSelector(state => state.game.filteredCards);
  const isLastMomentMode = useSelector(state => state.game.isLastMomentMode);

	const dispatch = useDispatch()

	const playRef = useRef();

  useEffect(() => () => clearTimeout(playRef.current), []);

  useEffect(() => {
    if (playbackMode === 'pause') return;

		clearTimeout(playRef.current);

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
        // dispatch(setPlaybackMode('pause'));
        return;
      }
      if (momentIndex >= currentCard.moments.length - 1) {
        dispatch(setCurrentCard({ ...filteredCards[cardIndex + 1], toFirstMoment: !isLastMomentMode, manualMoment: true }));
        return;
      }
      dispatch(setCurrentMoment(newMoments[momentIndex + 1]));
    }, 2000);
    // eslint-disable-next-line
  }, [currentMoment, isLastMomentMode]);

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
        // dispatch(setPlaybackMode('pause'));
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
  return (
    <>
      {(mobileWidth > 1000 || runningMode === 'Field') && (
        <PlaysRunningField hit={currentMoment.metering?.hit} field={currentMoment.metering?.field} setRunningMode={setRunningMode} />
      )}
      {(mobileWidth > 1000 || runningMode === 'Info') && <PlaysRunningInfo setRunningMode={setRunningMode} />}
    </>
  );
};

export default PlaysRunning;
