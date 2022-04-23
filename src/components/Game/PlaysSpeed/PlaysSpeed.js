import Arrow from 'components/UI/buttons/Arrow/Arrow';
import React, { useState, useLayoutEffect, useRef } from 'react';
// import Chart from 'react-google-charts';
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
    if (Object.keys(currentCard).length === 0 || !currentCard.moments[0]?.metering?.pitch?.init_speed_x) {
      setChartData([]);
      return;
    }

    const testData = [];
    let dotIndex = 0;

    innings.forEach(inning => {
      inning['top/guests']
        // .filter(card =>   card.moments.some(moment => moment.pitcher.pitches_name === currentCard.moments[0].pitcher.pitches_name)  )
        // card.moments[0].pitcher.pitches_name === currentCard.moments[0].pitcher.pitches_name)
        .forEach(card =>
          card.moments.forEach(moment => {
            if (moment.inner.id === currentMoment?.inner?.id) dotIndex = testData.length;
            moment.pitcher?.pitches_name === currentMoment?.pitcher?.pitches_name &&
              testData.push(moment.metering.pitch.init_speed_x);
          })
        );
      inning['bottom/owners']
        // ?.filter(card =>
        //   card.moments.some(
        //     moment => moment.pitcher.pitches_name === currentCard.moments[0].pitcher.pitches_name
        //   )
        // )
        // card.moments[0].pitcher.pitches_name === currentCard.moments[0].pitcher.pitches_name)
        ?.forEach(card =>
          card.moments.forEach(moment => {
            if (moment.inner.id === currentMoment?.inner?.id) dotIndex = testData.length;
            moment.pitcher?.pitches_name === currentMoment?.pitcher?.pitches_name &&
              testData.push(moment.metering.pitch.init_speed_x);
          })
        );
    });
    setChartData(testData);
    setCurrentDotIndex(dotIndex);
    // console.log(testData);
    // const newChartData = currentCard.moments.reduce(
    //   (sum, moment) => {
    //     // (sum, moment, i) => {
    //     sum.push(moment.metering.pitch.init_speed_x);
    //     // sum.push([i, moment.metering.pitch.init_speed_x]);
    //     return sum;
    //   },
    //   []
    //   // [['', 'speed']]
    // );
    // setChartData(newChartData);
  }, [currentCard, innings, currentMoment]);

  // const options = {
  //   height: chartHeight,
  //   width: chartWidth,
  //   chartArea: { left: 44, top: 10, width: '85%', height: '74%' },
  //   lineWidth: 1,
  //   pointSize: 1,
  //   dataOpacity: 0.6,
  //   // visible: false,
  //   // crosshair: { orientation: 'vertical', trigger: 'both' },
  //   explorer: { keepInBounds: true, zoomDelta: 1.1 },
  //   hAxis: {
  //     textStyle: {
  //       bold: false,
  //       fontSize: 14,
  //       fontName: 'Athiti'
  //     },
  //     baseline: {
  //       lineWidth: 0
  //     },
  //     gridlines: {
  //       multiple: 1,
  //       count: 0,
  //       interval: 0
  //     },
  //     viewWindowMode: 'maximized'
  //   },
  //   vAxis: {
  //     textStyle: {
  //       fontSize: 14,
  //       fontName: 'Athiti'
  //     },
  //     gridlines: {
  //       color: '#E3E1E1',
  //       count: 4
  //       // multiple: 10
  //     },
  //     viewWindow: {
  //       // min: 20
  //     }
  //   },
  //   colors: ['#1A4C96'],
  //   legend: { position: 'none' }
  // };

  return (
    <div ref={ref} className={pitchState !== 'Field' ? cl.speed : cl.speed + ' ' + cl.dnone}>
      {chartData.length !== 0 && (
        <>
          <p className={cl.subHeader}>Release speed</p>
          <PlaysSpeedChart dataArr={chartData} currentDot={currentDotIndex} />
        </>

        // <div ref={ref} className={cl.speed}>
        //   {chartData.length !== 0 && (
        //     <>
        //       <p className={cl.subHeader}>Release speed</p>

        //       <Chart
        //         chartType='LineChart'
        //         data={chartData}
        // 		chartEvents={[
        //   {
        //     eventName: 'ready',
        //     callback: ({ chartWrapper }) => {
        // 			alert(123)
        //       const chart = chartWrapper.getChart()
        //       const selection = chart.getSelection()

        //       if (selection.length === 1) {
        //         const [selectedItem] = selection
        //         const dataTable = chartWrapper.getDataTable()
        //         const { row, column } = selectedItem
        //         alert(
        //           'You selected : ' +
        //             JSON.stringify({
        //               row,
        //               column,
        //               value: dataTable.getValue(row, column),
        //             }),
        //           null,
        //           2,
        //         )
        //       }
        //     },
        //   },
        // ]}
        // options={options}
        //   />
        // </>
      )}
      <div className={cl.arrowWrapper}>
        <Arrow onClick={() => dispatch(setPitchState('Field'))} />
      </div>
    </div>
  );
};

export default PlaysSpeed;
