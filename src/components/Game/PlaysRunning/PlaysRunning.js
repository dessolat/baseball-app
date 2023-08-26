import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import PlaysRunningField from './PlaysRunningField';
import PlaysRunningInfo from './PlaysRunningInfo';
import { setCurrentCard, setCurrentMoment } from 'redux/gameReducer';

const PlaysRunning = () => {
  const currentMoment = useSelector(s => s.game.currentMoment, shallowEqual);
  const currentCard = useSelector(s => s.game.currentCard, shallowEqual);
  const preferredVideoState = useSelector(s => s.game.preferredVideoState);
  const videoLengthMode = useSelector(s => s.game.videoLengthMode);
  const preview = useSelector(s => s.game.preview);
  const filteredCards = useSelector(s => s.game.filteredCards, shallowEqual);
  const isLastMomentMode = useSelector(s => s.game.isLastMomentMode);
  const playbackMode = useSelector(s => s.game.playbackMode);

  const dispatch = useDispatch();

  const nextMomentTimeoutRef = useRef();
  const intervalRef = useRef(null);
  const videoHandlingTimeoutRef = useRef();
  const modeRef = useRef('play');

  useEffect(
    () => () => {
      clearTimeout(nextMomentTimeoutRef.current);
      clearTimeout(videoHandlingTimeoutRef.current);
      clearInterval(intervalRef.current);
    },
    []
  );

  useEffect(() => {
    clearTimeout(videoHandlingTimeoutRef.current);
    clearInterval(intervalRef.current);

    videoHandlingTimeoutRef.current = setTimeout(
      () => {
        videoHandling();
      },
      videoLengthMode === 'Super Short' ? 1500 : 30
    );
  }, [currentMoment]);

  useEffect(() => {
    (currentMoment.manualClick || currentCard.manualClick) && clearTimeout(nextMomentTimeoutRef.current);
  }, [currentMoment, currentCard]);

  useEffect(() => {
    modeRef.current = playbackMode;

    if (playbackMode === 'pause') {
      clearTimeout(nextMomentTimeoutRef.current);
      return;
    }

    playbackMode === 'play' && toNextMomentOrCard();
    // eslint-disable-next-line
  }, [playbackMode]);

  function toNextMomentOrCard() {
    const momentIndex = currentCard.moments.findIndex(moment => moment.inner.id === currentMoment.inner?.id);

    if (momentIndex < currentCard.moments.length - 1) {
      const nextMoment = currentCard.moments[momentIndex + 1];

      dispatch(setCurrentMoment(nextMoment));

      if (!nextMoment.video || nextMoment?.inner?.id >= preview.camera_info.broadcast_link_add_moment_from)
        return;
    } else {
      let cardIndex = filteredCards.findIndex(
        card => card.moments[0].inner.id === currentCard.moments[0].inner.id
      );

      cardIndex++;

      if (cardIndex < filteredCards.length) {
        dispatch(
          setCurrentCard({
            ...filteredCards[cardIndex],
            toFirstMoment: !isLastMomentMode,
            manualClick: false
          })
        );

        return;
      }
    }
  }

  const videoHandling = () => {
    clearInterval(intervalRef.current);

    if (modeRef.current !== 'pause') {
      nextMomentTimeoutRef.current = setTimeout(toNextMomentOrCard, 3000);
    }

    if (currentCard.moments.length === 0 || !currentCard.moments[0].video) {
      return;
    }
  };

  // !Previous version of moments handling

  // const currentMoment = useSelector(state => state.game.currentMoment, shallowEqual);
  // const currentCard = useSelector(state => state.game.currentCard, shallowEqual);
  // const playbackMode = useSelector(state => state.game.playbackMode);
  // const filteredCards = useSelector(state => state.game.filteredCards, shallowEqual);
  // const isLastMomentMode = useSelector(state => state.game.isLastMomentMode);

  // const dispatch = useDispatch();

  // const playRef = useRef();

  // useEffect(() => () => clearTimeout(playRef.current), []);

  // useEffect(() => {
  //   if (playbackMode === 'pause') return;

  //   clearTimeout(playRef.current);

  //   const newMoments = [];
  //   currentCard.type !== 'Replacement'
  //     ? currentCard.moments?.forEach(moment => moment.icons && newMoments.push(moment))
  //     : newMoments.push(currentCard.moments[0]);

  //   const momentIndex = newMoments?.findIndex(moment => moment.inner?.id === currentMoment?.inner?.id);
  //   const cardIndex = filteredCards.findIndex(
  //     card => card.moments[0].inner.id === currentCard.moments[0].inner.id
  //   );

  //   playRef.current = setTimeout(() => {
  //     if (
  //       (momentIndex >= currentCard.moments.length - 1 && cardIndex >= filteredCards.length - 1) ||
  //       momentIndex === -1
  //     ) {
  //       // dispatch(setPlaybackMode('pause'));
  //       return;
  //     }
  //     if (momentIndex >= currentCard.moments.length - 1) {
  //       dispatch(
  //         setCurrentCard({
  //           ...filteredCards[cardIndex + 1],
  //           toFirstMoment: !isLastMomentMode,
  //           manualMoment: true
  //         })
  //       );
  //       return;
  //     }
  //     dispatch(setCurrentMoment(newMoments[momentIndex + 1]));
  //   }, 2000);
  //   // eslint-disable-next-line
  // }, [currentMoment, isLastMomentMode]);

  // useEffect(() => {
  //   if (playbackMode === 'pause') {
  //     clearTimeout(playRef.current);
  //     return;
  //   }

  //   const newMoments = [];
  //   currentCard.type !== 'Replacement'
  //     ? currentCard.moments?.forEach(moment => moment.icons && newMoments.push(moment))
  //     : newMoments.push(currentCard.moments[0]);

  //   const momentIndex = newMoments?.findIndex(moment => moment.inner?.id === currentMoment?.inner?.id);
  //   const cardIndex = filteredCards.findIndex(
  //     card => card.moments[0].inner.id === currentCard.moments[0].inner.id
  //   );

  //   playRef.current = setTimeout(() => {
  //     if (
  //       (momentIndex >= currentCard.moments.length - 1 && cardIndex >= filteredCards.length - 1) ||
  //       momentIndex === -1
  //     ) {
  //       // dispatch(setPlaybackMode('pause'));
  //       return;
  //     }
  //     if (momentIndex >= currentCard.moments.length - 1) {
  //       dispatch(setCurrentCard({ ...filteredCards[cardIndex + 1], manualMoment: true }));
  //       return;
  //     }
  //     dispatch(setCurrentMoment(newMoments[momentIndex + 1]));
  //   }, 2000);
  //   // eslint-disable-next-line
  // }, [playbackMode]);
  return (
    <>
      <PlaysRunningField hit={currentMoment.metering?.hit} field={currentMoment.metering?.field} />
      <PlaysRunningInfo />
      {/* {(mobileWidth > 1000 || runningMode === 'Info') && <PlaysRunningInfo setRunningMode={setRunningMode} />} */}
    </>
  );
};

export default PlaysRunning;
