import React, { useState, useEffect, useRef } from 'react';
import Chart from 'react-google-charts';
import cl from './PlaysSpeed.module.scss';

const PlaysSpeed = () => {
  const [chartWidth, setChartWidth] = useState(0);
  const [chartHeight, setChartHeight] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    let clientWidth = ref.current.clientWidth;
    let clientHeight = ref.current.clientHeight;

    setChartWidth(clientWidth - 5);
    setChartHeight(clientHeight - 40);

    const resizeHandler = () => {
      clientWidth = ref.current.clientWidth;
			clientHeight = ref.current.clientHeight

      if (clientWidth < 1277) {
        setChartWidth(clientWidth - 5);
        setChartHeight(clientHeight - 40);
      }
    };

    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  const data = [
    ['', 'speed'],
    [1, 65],
    [2, 74],
    [3, 78],
    [4, 85],
    [5, 82],
    [6, 76],
    [7, 85],
    [8, 73.7]
  ];

  const options = {
    height: chartHeight,
    width: chartWidth,
    chartArea: { left: 44, top: 10, width: '85%', height: '74%' },
    lineWidth: 1,
    explorer: { keepInBounds: true, zoomDelta: 1.1 },
    hAxis: {
      textStyle: {
        bold: false,
        fontSize: 14,
        fontName: 'Athiti'
      },
      baseline: {
        lineWidth: 0
      },
      gridlines: {
        multiple: 1,
        count: 0,
        interval: 0
      },
      viewWindowMode: 'maximized'
    },
    vAxis: {
      textStyle: {
        fontSize: 14,
        fontName: 'Athiti'
      },
      gridlines: {
        color: '#E3E1E1',
        count: 4
        // multiple: 10
      },
      viewWindow: {
        // min: 20
      }
    },
    colors: ['#1A4C96'],
    legend: { position: 'none' }
  };

  return (
    <div ref={ref} className={cl.speed}>
      <p className={cl.subHeader}>Release speed</p>

      <Chart chartType='LineChart' data={data} options={options} />
    </div>
  );
};

export default PlaysSpeed;
