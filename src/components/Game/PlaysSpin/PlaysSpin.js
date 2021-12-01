import React from 'react';
import cl from './PlaysSpin.module.scss';
// import Chart from 'react-google-charts';

const PlaysSpin = () => {
  // const options = {
  //   height: 100,
  //   width: 100,
  //   chartArea: { left: 10, top: 10, width: '100%', height: '80%' },
  //   lineWidth: 1,
  //   explorer: { keepInBounds: true, zoomDelta: 1.1 },
  //   hAxis: {
  //     baseline: {
  //       lineWidth: 1
  //     },
  //     gridlines: {
  //       multiple: 1,
  //       count: 1,
  //       interval: 1
  //     }
  //     // viewWindowMode: 'maximized'
  //   },
  //   vAxis: {
  //     gridlines: {
  //       multiple: 1,
  //       count: 1,
  //       interval: 1
  //     },
  //     viewWindow: {
  //       // min: 20
  //     }
  //   },
  //   colors: ['#1A4C96'],
  //   legend: { position: 'none' }
  // };

  return (
    <div className={cl.spin}>
      <svg width='100' height='100' viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <line x1='49.5' y1='100' x2='49.5' stroke='#ACACAC' />
        <line y1='49.5' x2='100' y2='49.5' stroke='#ACACAC' />
        <circle cx='68.5' cy='22.5' r='7.5' fill='#2B9D6A' />
      </svg>

      {/* <Chart
        chartType='ScatterChart'
        data={[
          ['', 'speed'],
          [40, 45]
        ]}
        options={options}
      /> */}
      <div>
        <p className={cl.subHeader}>True spin</p>
        <p className={cl.regularValue}>1952.1 rpm</p>
        <p className={cl.subHeader}>Vertical break</p>
        <p className={cl.breakValue}>52.0 cm</p>
        <p className={cl.subHeader}>Horizontal break</p>
        <p className={cl.breakValue}>24.7 cm</p>
      </div>
    </div>
  );
};

export default PlaysSpin;
