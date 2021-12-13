import React, { useState, useEffect, useRef } from 'react';
import Chart from 'react-google-charts';
import { useSelector } from 'react-redux';
import cl from './PlaysSpeed.module.scss';

const PlaysSpeed = () => {
  const [chartWidth, setChartWidth] = useState(0);
  const [chartHeight, setChartHeight] = useState(0);
  const [chartData, setChartData] = useState([]);
  const ref = useRef(null);
	const currentCard = useSelector(state => state.game.currentCard)

  useEffect(() => {
    let clientWidth = ref.current.clientWidth;
    let clientHeight = ref.current.clientHeight;

    setChartWidth(clientWidth - 5);
    setChartHeight(clientHeight - 40);

    const resizeHandler = () => {
      clientWidth = ref.current.clientWidth;
      clientHeight = ref.current.clientHeight;

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

	useEffect(() => {
		if (Object.keys(currentCard).length === 0 || !currentCard.moments[0]?.metering?.init_speed_x) {
			setChartData([])
			return
		}

		const newChartData = currentCard.moments.reduce((sum, moment, i) => [...sum, [i, moment.metering.init_speed_x]], [['', 'speed']])
		setChartData(newChartData)
	}, [currentCard])

  const options = {
    height: chartHeight,
    width: chartWidth,
    chartArea: { left: 44, top: 10, width: '85%', height: '74%' },
    lineWidth: 1,
    pointSize: 1,
    dataOpacity: 0.6,
    // visible: false,
    // crosshair: { orientation: 'vertical', trigger: 'both' },
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
      {chartData.length !== 0 && (
        <>
          <p className={cl.subHeader}>Release speed</p>

          <Chart
            chartType='LineChart'
            data={chartData}
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
            options={options}
          />
        </>
      )}
    </div>
  );
};

export default PlaysSpeed;
