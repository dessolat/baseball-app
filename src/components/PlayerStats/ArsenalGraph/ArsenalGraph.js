import { Fragment } from 'react';
import cl from './ArsenalGraph.module.scss';
import BottomMarks from './BottomMarks';

const PARAMS = {
  HORIZONTAL_GRID_LINES_NUMBER: 5,
  HORIZONTAL_GRID_LINES_WIDTH: 1120,
  HORIZONTAL_GRID_LINES_LEFT: 45,
  HORIZONTAL_GRID_LINES_TOP: 65,
  GRAPH_LINES_HEIGHT: 322,
  LEFT_PADDING: 12,
  TOP_PADDING: 30
};

const ArsenalGraph = ({ filteredData, currentTimeInterval, currentPitchTypes }) => {
  console.log(filteredData);

  function getBottomMarks() {
    if (currentTimeInterval === 'Season') {
      const datesSet = filteredData.reduce((sum, { pitch_info: pitchInfo }) => {
        sum.add(pitchInfo.date.slice(0, 4));

        return sum;
      }, new Set());

      return Array.from(datesSet).sort((a, b) => (a > b ? 1 : -1));
    }
    if (currentTimeInterval === 'Month') {
      const datesSet = filteredData.reduce((sum, { pitch_info: pitchInfo }) => {
        sum.add(pitchInfo.date.slice(0, 7));

        return sum;
      }, new Set());

      return Array.from(datesSet).sort((a, b) => (a > b ? 1 : -1));
    }
    if (currentTimeInterval === 'Game') {
      const datesSet = filteredData.reduce((sum, { pitch_info: pitchInfo }) => {
        sum.add(pitchInfo.date);

        return sum;
      }, new Set());

      return Array.from(datesSet).sort((a, b) => (a > b ? 1 : -1));
    }

    return [];
  }

  const bottomMarks = getBottomMarks();

  PARAMS.HORIZONTAL_GRID_LINES_STEP = PARAMS.GRAPH_LINES_HEIGHT / PARAMS.HORIZONTAL_GRID_LINES_NUMBER;
  PARAMS.ZERO_COORDS = {
    X: PARAMS.HORIZONTAL_GRID_LINES_LEFT,
    Y: PARAMS.HORIZONTAL_GRID_LINES_TOP + PARAMS.GRAPH_LINES_HEIGHT
  };

  const getYCoord = () => Math.random() * 50;

  const dimensionsArr = [
    {
      title: 'Yellow',
      coords: [
        [0, getYCoord()],
        [10, getYCoord()],
        [20, getYCoord()],
        [30, getYCoord()],
        [40, getYCoord()],
        [50, getYCoord()],
        [60, getYCoord()],
        [70, getYCoord()],
        [80, getYCoord()],
        [90, getYCoord()],
        [100, getYCoord()]
      ],
      color: 'yellow'
    },
    {
      title: 'Blue',
      coords: [
        [0, getYCoord()],
        [10, getYCoord()],
        [20, getYCoord()],
        [30, getYCoord()],
        [40, getYCoord()],
        [50, getYCoord()],
        [60, getYCoord()],
        [70, getYCoord()],
        [80, getYCoord()],
        [90, getYCoord()],
        [100, getYCoord()]
      ],
      color: 'blue'
    },
    {
      title: 'Olive',
      coords: [
        [0, getYCoord()],
        [10, getYCoord()],
        [20, getYCoord()],
        [30, getYCoord()],
        [40, getYCoord()],
        [50, getYCoord()],
        [60, getYCoord()],
        [70, getYCoord()],
        [80, getYCoord()],
        [90, getYCoord()],
        [100, getYCoord()]
      ],
      color: 'olive'
    },
    {
      title: 'Red',
      coords: [
        [0, getYCoord()],
        [10, getYCoord()],
        [20, getYCoord()],
        [30, getYCoord()],
        [40, getYCoord()],
        [50, getYCoord()],
        [60, getYCoord()],
        [70, getYCoord()],
        [80, getYCoord()],
        [90, getYCoord()],
        [100, getYCoord()]
      ],
      color: 'red'
    }
  ];

  const minHorizontalValue = 0;
  const maxHorizontalValue = 100;
  const minVerticalValue = 0;
  const maxVerticalValue = 50;

  const leftNumbers = [];
  for (let i = 1; i <= PARAMS.HORIZONTAL_GRID_LINES_NUMBER; i++) {
    leftNumbers.push(
      Math.floor(((maxVerticalValue - minVerticalValue) / PARAMS.HORIZONTAL_GRID_LINES_NUMBER) * i)
    );
  }

  const xScaleMultiplier = PARAMS.HORIZONTAL_GRID_LINES_WIDTH / (maxHorizontalValue - minHorizontalValue);
  const yScaleMultiplier = PARAMS.GRAPH_LINES_HEIGHT / (maxVerticalValue - minVerticalValue);
  const colorsArr = dimensionsArr.reduce((sum, dimension) => {
    sum.push(dimension.color);
    return sum;
  }, []);

  return (
    <svg
      viewBox='0 0 1192 500'
      xmlns='http://www.w3.org/2000/svg'
      className={cl.graph}
      // preserveAspectRatio='none'
    >
      {/* Main layout rendering */}
      {/* Top-left title */}
      <text x={PARAMS.LEFT_PADDING} y={PARAMS.TOP_PADDING} className={cl.sideTitle}>
        Pitches
      </text>

      {/* Horizontal lines + left numbers rendering */}
      {leftNumbers.map((number, i) => (
        <Fragment key={i}>
          {/* Horizontal lines */}
          <line
            x1={PARAMS.ZERO_COORDS.X}
            y1={PARAMS.ZERO_COORDS.Y - PARAMS.HORIZONTAL_GRID_LINES_STEP * (i + 1)}
            x2={PARAMS.ZERO_COORDS.X + PARAMS.HORIZONTAL_GRID_LINES_WIDTH}
            y2={PARAMS.ZERO_COORDS.Y - PARAMS.HORIZONTAL_GRID_LINES_STEP * (i + 1)}
            stroke='#E3E1E1'
            strokeDasharray='4 2'
          />
          {/* Left numbers */}
          <text
            x={PARAMS.LEFT_PADDING}
            y={PARAMS.ZERO_COORDS.Y - PARAMS.HORIZONTAL_GRID_LINES_STEP * (i + 1) + 5}
            className={cl.leftNumber}>
            {number}
          </text>
        </Fragment>
      ))}
      {/* Horizontal center grid line */}
      <line
        x1={PARAMS.ZERO_COORDS.X}
        y1={PARAMS.ZERO_COORDS.Y}
        x2={PARAMS.ZERO_COORDS.X + PARAMS.HORIZONTAL_GRID_LINES_WIDTH}
        y2={PARAMS.ZERO_COORDS.Y}
        stroke='#ACACAC'
      />

      {/* Horizontal marks + numbers*/}
      {/* Marks */}
      <BottomMarks PARAMS={PARAMS} bottomMarks={bottomMarks} currentTimeInterval={currentTimeInterval} />
      {/* Graph lines rendering */}
      {dimensionsArr.map((dimension, i) => {
        const { coords, color } = dimension;
        let linePath = `M${PARAMS.ZERO_COORDS.X + coords[0][0] * xScaleMultiplier} ${
          PARAMS.ZERO_COORDS.Y - coords[0][1] * yScaleMultiplier
        }`;
        coords
          .slice(1)
          .forEach(
            coord =>
              (linePath += `L${PARAMS.ZERO_COORDS.X + coord[0] * xScaleMultiplier} ${
                PARAMS.ZERO_COORDS.Y - coord[1] * yScaleMultiplier
              }`)
          );
        return <path key={i} d={linePath} stroke={color} fill='none' style={{ transition: 'all .3s' }} />;
      })}
    </svg>
  );
};

export default ArsenalGraph;
