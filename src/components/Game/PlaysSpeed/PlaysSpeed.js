import Arrow from 'components/UI/buttons/Arrow/Arrow';
import React, { useState, useLayoutEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPitchState } from 'redux/gameReducer';
import cl from './PlaysSpeed.module.scss';
import PlaysSpeedChart from './PlaysSpeedChart';

const PlaysSpeed = ({ currentMoment }) => {
  const [chartData, setChartData] = useState([]);
  const [currentDotIndex, setCurrentDotIndex] = useState(0);
  const ref = useRef(null);
  const currentCard = useSelector(state => state.game.currentCard);
  const innings = useSelector(state => state.game.innings);
  const pitchState = useSelector(state => state.game.pitchState);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    if (Object.keys(currentCard).length === 0 || !currentCard.moments[0]?.metering?.pitch?.start_speed) {
      setChartData([]);
      return;
    }

    const testData = [];
    let dotIndex = 0;

    innings.forEach(inning => {
      inning['top/guests'].forEach(card =>
        card.moments.forEach(moment => {
          if (moment.inner.id === currentMoment?.inner?.id) dotIndex = testData.length;
          moment.pitcher?.pitches_name === currentMoment?.pitcher?.pitches_name &&
					moment.metering.pitch && testData.push(moment.metering.pitch.start_speed);
        })
      );
      inning['bottom/owners']?.forEach(card =>
        card.moments.forEach(moment => {
          if (moment.inner.id === currentMoment?.inner?.id) dotIndex = testData.length;
          moment.pitcher?.pitches_name === currentMoment?.pitcher?.pitches_name &&
					moment.metering.pitch && testData.push(moment.metering.pitch.start_speed);
        })
      );
    });

    setChartData(testData);
    setCurrentDotIndex(dotIndex);
  }, [currentCard, innings, currentMoment]);

  const handleArrowClick = () => dispatch(setPitchState('Field'));

  return (
    <div ref={ref} className={pitchState !== 'Field' ? cl.speed : cl.speed + ' ' + cl.dnone}>
      {chartData.length !== 0 && (
        <>
          <p className={cl.subHeader}>Release speed</p>
          <PlaysSpeedChart dataArr={chartData} currentDot={currentDotIndex} />
        </>
      )}
      <div className={cl.arrowWrapper}>
        <Arrow onClick={handleArrowClick} />
      </div>
    </div>
  );
};

export default PlaysSpeed;
