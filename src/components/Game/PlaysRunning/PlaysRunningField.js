import Arrow from 'components/UI/buttons/Arrow/Arrow';
import React, { useEffect, useRef, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentCard, setCurrentMoment, setPlaybackMode } from 'redux/gameReducer';
import cl from './PlaysRunning.module.scss';

const BallPaths = ({ field }) => {
  const ballPaths = field.reduce((sum, { data_2d: data2d }) => {
    let ballPath = '';
    ballPath += `M${data2d[0][0]} ${data2d[0][1]}`;
    data2d.slice(1).forEach(coord => (ballPath += `L${coord[0]} ${coord[1]}`));
    sum.push(ballPath);

    return sum;
  }, []);

  return (
    <>
      {ballPaths.map((path, i) => (
        <path
          key={i}
          d={path}
          stroke='red'
          strokeWidth='25'
          strokeLinejoin='round'
          strokeLinecap='round'
          strokeDasharray='1 35'
        />
      ))}
    </>
  );
};

const PlaysRunningField = ({ field, setRunningMode }) => {
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

  const isBallPaths = field?.length > 0;
  return (
    <div className={cl.fieldWrapper}>
      <svg className={cl.field} viewBox='0 0 2560 2560' fill='none' preserveAspectRatio='none'>
        {isBallPaths && <BallPaths field={field} />}
      </svg>
      <div className={cl.rightArrowWrapper}>
        <Arrow direction='right' onClick={() => setRunningMode('Info')} />
      </div>
    </div>
  );
};

export default memo(PlaysRunningField);
