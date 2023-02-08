import { Fragment } from 'react';
import cl from './ArsenalGraph.module.scss';
import DownArrow from '../../../icons/down_arrow.png';

const PARAMS = {
  HORIZONTAL_GRID_LINES_NUMBER: 5,
  HORIZONTAL_GRID_LINES_WIDTH: 1147,
  HORIZONTAL_GRID_LINES_LEFT: 45,
  HORIZONTAL_GRID_LINES_TOP: 65
};

const Marks = ({ years }) => {
  const marksInterval = PARAMS.HORIZONTAL_GRID_LINES_WIDTH / (years.length + 1);
  const yCoords = [PARAMS.ZERO_COORDS.Y + 1, PARAMS.ZERO_COORDS.Y + 6];

  return (
    <>
      {years.map((year, i) => {
        const xCoord = PARAMS.ZERO_COORDS.X + marksInterval * (i + 1);

        return (
          <Fragment key={'mark-' + i}>
            <line x1={xCoord} y1={yCoords[0]} x2={xCoord} y2={yCoords[1]} stroke='#ACACAC' />
            <text x={xCoord} y={PARAMS.ZERO_COORDS.Y + 25} className={cl.bottomNumber}>
              {year}
            </text>
          </Fragment>
        );
      })}
    </>
  );
};

const ArsenalGraph = props => {
  PARAMS.HORIZONTAL_GRID_LINES_STEP = 322 / PARAMS.HORIZONTAL_GRID_LINES_NUMBER;
  PARAMS.ZERO_COORDS = {
    X: PARAMS.HORIZONTAL_GRID_LINES_LEFT,
    Y: PARAMS.HORIZONTAL_GRID_LINES_TOP + 322
  };

	const getYCoord = () => Math.random() * 50

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
  const yScaleMultiplier = 322 / (maxVerticalValue - minVerticalValue);
  const colorsArr = dimensionsArr.reduce((sum, dimension) => {
    sum.push(dimension.color);
    return sum;
  }, []);
  const years = [2020, 2021, 2022, 2023];
  return (
    <svg
      viewBox='0 0 1192 426'
      xmlns='http://www.w3.org/2000/svg'
      className={cl.graph}
      {...props}
      // preserveAspectRatio='none'
    >
      {/* Main layout rendering */}
      {/* Top-left title */}
      <text x='14' y='23' className={cl.sideTitle}>
        Pitching arsenal
      </text>
      {/* Top-left selector */}
      <text x='200' y='23' className={cl.selectorText}>
        Pitch %{' '}
      </text>
      <image x='250' y='17' href={DownArrow} height='5' width='7' />
      {/* Types legend */}
      {colorsArr.map((curColor, i) => (
        <Fragment key={i}>
          <circle cx={310 + 105 * i} cy='18' r='3.75' fill={curColor} stroke='black' strokeWidth='0.5' />
          <text x={325 + 105 * i} y='22' className={cl.typeText}>
            Type
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
            x={PARAMS.ZERO_COORDS.X - 31}
            y={PARAMS.ZERO_COORDS.Y - PARAMS.HORIZONTAL_GRID_LINES_STEP * (i + 1) + 5}
            className={cl.bottomNumber}>
            {number}
          </text>
        </Fragment>
      ))}
      {/* Horizontal marks + numbers*/}
      {/* Marks */}
      <Marks years={years} />
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
        return <path key={i} d={linePath} stroke={color} fill='none' style={{transition: 'all .3s'}}/>;
      })}
    </svg>
  );
};

export default ArsenalGraph;
