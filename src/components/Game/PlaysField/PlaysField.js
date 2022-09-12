import React, { useState, useEffect, useRef } from 'react';
import cl from './PlaysField.module.scss';
import gridImg from 'images/grid.png';
import PlaysFieldBalls from './PlaysFieldBalls';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentCard, setCurrentMoment, setPitchState, setPlaybackMode } from 'redux/gameReducer';
import Arrow from 'components/UI/buttons/Arrow/Arrow';
import PlaysFieldDistanceValues from './PlaysFieldValues/PlaysFieldDistanceValues';
import PlaysFieldSpeedValues from './PlaysFieldValues/PlaysFieldSpeedValues';

const PlaysField = ({ currentMoment }) => {
  const [coords, setCoords] = useState([]);
  const [count, setCount] = useState(1);
  const [coeff, setCoeff] = useState({ x: 1, y: 1, yScale: 1 });
  const currentCard = useSelector(state => state.game.currentCard);
  const playbackMode = useSelector(state => state.game.playbackMode);
  const filteredCards = useSelector(state => state.game.filteredCards);
  const pitchState = useSelector(state => state.game.pitchState);
  const dispatch = useDispatch();

  const parent = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const resizeHandler = () => {
      timeoutRef.current !== null && clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        const yScale = parent.current.clientHeight / 330;
        setCoeff({
          x: parent.current.clientWidth / 1920,
          y: (parent.current.clientHeight + 90 * yScale) / 1080,
          yScale
        });
        timeoutRef.current = null;
      }, 100);
    };

    const timeout = setTimeout(() => setCount(prev => prev + 1), 150);
    const yScale = parent.current.clientHeight / 330;
    setCoeff({
      x: parent.current.clientWidth / 1920,
      y: (parent.current.clientHeight + 90 * yScale) / 1080,
      yScale
    });
    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (count === 1) return;

    let graphTimeout;
    if (count < coords.length) {
      graphTimeout = setTimeout(() => setCount(prev => prev + 1), 40);
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

    let playTimeout;
    if (playbackMode !== 'pause') {
      playTimeout = setTimeout(() => {
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
    }

    return () => {
      clearTimeout(graphTimeout);
      clearTimeout(playTimeout);
    };
    // eslint-disable-next-line
  }, [count, playbackMode]);

  useEffect(() => {
    setCount(1);
    const timeout = setTimeout(() => setCount(prev => prev + 1), 150);
    setCoords(currentMoment?.metering?.pitch?.data_2d || []);

    return () => {
      clearTimeout(timeout);
    };
  }, [currentMoment]);

  const handleArrowClick = () => dispatch(setPitchState('Stats'));
  return (
    <div className={pitchState === 'Field' ? cl.field : cl.dnone} ref={parent}>
      <img className={cl.grid} src={gridImg} alt='grid' />
      <PlaysFieldBalls coords={coords} count={count} coeff={coeff} />
      <div className={cl.top}>
        <PlaysFieldSpeedValues currentMoment={currentMoment} cl={cl} />
        <PlaysFieldDistanceValues currentMoment={currentMoment} cl={cl} />
      </div>
      <Arrow
        direction='right'
        onClick={handleArrowClick}
        style={{ position: 'absolute', transform: 'scale(2.4)', top: '50%', right: '20px', opacity: 0.5 }}
      />
    </div>
  );
};

export default PlaysField;
