import classNames from 'classnames';
import Arrow from 'components/UI/buttons/Arrow/Arrow';
import React, { useState, useLayoutEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPitchState } from 'redux/gameReducer';
import Legend from './Legend/Legend';
import cl from './PlaysSpeed.module.scss';
import PlaysSpeedChart from './PlaysSpeedChart';

const PlaysSpeed = ({ currentMoment }) => {
  const [chartData, setChartData] = useState([]);
  const [currentDot, setCurrentDot] = useState({ type: null, speed: null });
  const ref = useRef(null);
  const currentCard = useSelector(state => state.game.currentCard);
  const innings = useSelector(state => state.game.innings);
  const pitchState = useSelector(state => state.game.pitchState);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    if (Object.keys(currentCard).length === 0) {
    // if (Object.keys(currentCard).length === 0 || !currentCard.moments[0]?.metering?.pitch?.start_speed) {
      setChartData([]);
      return;
    }

    const testData = [];

    let currentDotParams = {};

    innings.forEach(inning => {
      inning['top/guests'].forEach(card =>
        card.moments.forEach(moment => {
          const pitchType = moment.metering.pitch?.pitch_type;
          if (
            moment.inner.id === currentMoment?.inner?.id &&
            moment.pitcher?.pitches_name === currentMoment?.pitcher?.pitches_name &&
            moment.metering.pitch
          ) {
            currentDotParams.type = pitchType;
            currentDotParams.speed = moment.metering.pitch.start_speed;
            currentDotParams.index = testData.length;
          }
          if (
            moment.pitcher?.pitches_name === currentMoment?.pitcher?.pitches_name &&
            moment.metering.pitch
          ) {
            testData.push([pitchType, moment.metering.pitch.start_speed]);
          }
        })
      );
      inning['bottom/owners']?.forEach(card =>
        card.moments.forEach(moment => {
          const pitchType = moment.metering.pitch?.pitch_type;
          if (
            moment.inner.id === currentMoment?.inner?.id &&
            moment.pitcher?.pitches_name === currentMoment?.pitcher?.pitches_name &&
            moment.metering.pitch
          ) {
            currentDotParams.type = pitchType;
            currentDotParams.speed = moment.metering.pitch.start_speed;
            currentDotParams.index = testData.length;
          }
          if (
            moment.pitcher?.pitches_name === currentMoment?.pitcher?.pitches_name &&
            moment.metering.pitch
          ) {
            testData.push([pitchType, moment.metering.pitch.start_speed]);
          }
        })
      );
    });

    setChartData(testData);
    setCurrentDot(currentDotParams);
  }, [currentCard, innings, currentMoment]);

  const handleArrowClick = () => dispatch(setPitchState('Field'));

  const wrapperClasses = classNames(cl.speed, {
    [cl.dnone]: pitchState === 'Field'
  });

	const legendArr = [
    { title: 'Fastball (Fa)', fill: '#1A4C96' },
    { title: 'Slider (Sl)', fill: '#FEAB01' },
    { title: 'Curveball (Cu)', fill: '#BFE2C1' },
    { title: 'Changeup (Ch)', fill: '#E2001C' }
  ];
  return (
    <div ref={ref} className={wrapperClasses}>
      {Object.keys(chartData).length !== 0 && (
        <>
          <p className={cl.subHeader}>Release speed</p>
          <PlaysSpeedChart chartData={chartData} currentDot={currentDot} />
					<Legend legendData={legendArr} />
        </>
      )}
      <div className={cl.arrowWrapper}>
        <Arrow onClick={handleArrowClick} />
      </div>
    </div>
  );
};

export default PlaysSpeed;
