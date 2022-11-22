import classNames from 'classnames';
import React, { useState, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import cl from './PlaysSpin.module.scss';
import PlaysSpinChart from './PlaysSpinChart';
// import PlaysSpinInfo from './PlaysSpinInfo';

const PlaysSpin = ({ pitch }) => {
  const [chartData, setChartData] = useState([]);
  const [currentDot, setCurrentDot] = useState({ type: null, offsetX: null, offsetY: null });

  const pitchState = useSelector(state => state.game.pitchState);
  const currentCard = useSelector(state => state.game.currentCard);
  const innings = useSelector(state => state.game.innings);
  const currentMoment = useSelector(state => state.game.currentMoment);

  useLayoutEffect(() => {
    if (Object.keys(currentCard).length === 0) {
      setChartData([]);
      return;
    }

    const testData = [];

    const { metering } = currentMoment;

    let currentDotParams = {
			type: metering?.pitch?.pitch_type,
      offsetX: metering?.pitch?.offset_x,
      offsetY: metering?.pitch?.offset_y
    };
    innings.forEach(inning => {
      inning['top/guests'].forEach(card =>
        card.moments.forEach(moment => {
          const pitchType = moment.metering.pitch?.pitch_type;

          // if (
          //   moment.inner.id === currentMoment?.inner?.id &&
          //   moment.pitcher?.pitches_name === currentMoment?.pitcher?.pitches_name &&
          //   moment.metering.pitch
          // ) {
          //   currentDotParams.type = pitchType;
          //   currentDotParams.offsetX = moment.metering.pitch.offset_x;
          //   currentDotParams.offsetY = moment.metering.pitch.offset_y;
          //   currentDotParams.index = testData.length;
          // }

          if (
            moment.pitcher?.pitches_name === currentMoment?.pitcher?.pitches_name &&
            moment.metering.pitch
          ) {
            testData.push({
              pitchType,
              offsetX: moment.metering.pitch.offset_x,
              offsetY: moment.metering.pitch.offset_y
            });
          }
        })
      );
      inning['bottom/owners']?.forEach(card =>
        card.moments.forEach(moment => {
          const pitchType = moment.metering.pitch?.pitch_type;
          // if (
          //   moment.inner.id === currentMoment?.inner?.id &&
          //   moment.pitcher?.pitches_name === currentMoment?.pitcher?.pitches_name &&
          //   moment.metering.pitch
          // ) {
          //   currentDotParams.type = pitchType;
          //   currentDotParams.offsetX = moment.metering.pitch.offset_x;
          //   currentDotParams.offsetY = moment.metering.pitch.offset_y;
          //   currentDotParams.index = testData.length;
          // }

          if (
            moment.pitcher?.pitches_name === currentMoment?.pitcher?.pitches_name &&
            moment.metering.pitch
          ) {
            testData.push({
              pitchType,
              offsetX: moment.metering.pitch.offset_x,
              offsetY: moment.metering.pitch.offset_y
            });
          }
        })
      );
    });

    setChartData(testData);
    setCurrentDot(currentDotParams);
  }, [currentCard, innings, currentMoment]);

  const wrapperClasses = classNames(cl.spin, {
    [cl.dnone]: pitchState === 'Field'
  });
  return (
    <div className={wrapperClasses}>
      <PlaysSpinChart chartData={chartData} currentDot={currentDot} />
      {/* <PlaysSpinInfo pitch={pitch} /> */}
    </div>
  );
};

export default PlaysSpin;
