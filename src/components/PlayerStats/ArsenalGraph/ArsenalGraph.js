import React, { Fragment } from 'react';
import cl from './ArsenalGraph.module.scss';
import DownArrow from '../../../icons/down_arrow.png';

const ArsenalGraph = () => {
  const PARAMS = {
    HORIZONTAL_GRID_LINES_NUMBER: 5,
    HORIZONTAL_GRID_LINES_WIDTH: 1147,
    HORIZONTAL_GRID_LINES_LEFT: 45,
    HORIZONTAL_GRID_LINES_TOP: 65
  };

  PARAMS.HORIZONTAL_GRID_LINES_STEP = 322 / PARAMS.HORIZONTAL_GRID_LINES_NUMBER;
  PARAMS.ZERO_COORDS = {
    X: PARAMS.HORIZONTAL_GRID_LINES_LEFT,
    Y: PARAMS.HORIZONTAL_GRID_LINES_TOP + 322
  };

  const dimensionsArr = [
    {
      title: 'Yellow',
      coords: [
        [0, 20],
        [10, 15],
        [20, 30],
        [30, 25],
        [40, 33],
        [50, 45],
        [60, 20],
        [70, 35],
        [80, 48],
        [90, 20],
        [100, 27]
      ],
      color: 'yellow'
    },
    {
      title: 'Blue',
      coords: [
        [0, 45],
        [10, 10],
        [20, 25],
        [30, 40],
        [40, 25],
        [50, 7],
        [60, 16],
        [70, 34],
        [80, 47],
        [90, 8],
        [100, 11]
      ],
      color: 'blue'
    },
    {
      title: 'Olive',
      coords: [
        [0, 25],
        [10, 30],
        [20, 45],
        [30, 35],
        [40, 20],
        [50, 27],
        [60, 35],
        [70, 50],
        [80, 11],
        [90, 29],
        [100, 15]
      ],
      color: 'olive'
    },
    {
      title: 'Red',
      coords: [
        [0, 10],
        [10, 7],
        [20, 15],
        [30, 40],
        [40, 20],
        [50, 25],
        [60, 22],
        [70, 10],
        [80, 44],
        [90, 30],
        [100, 38]
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
  return (
    <svg
      viewBox='0 0 1192 426'
      xmlns='http://www.w3.org/2000/svg'
      className={cl.graph}
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
      <line
        x1={PARAMS.ZERO_COORDS.X + 1057}
        y1={PARAMS.ZERO_COORDS.Y + 1}
        x2={PARAMS.ZERO_COORDS.X + 1057}
        y2={PARAMS.ZERO_COORDS.Y + 6}
        stroke='#ACACAC'
      />
      {/* Numbers */}
      <text
        x={PARAMS.ZERO_COORDS.X + 1057}
        y={PARAMS.ZERO_COORDS.Y + 25}
        textAnchor='middle'
        className={cl.bottomNumber}>
        2022
      </text>
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
        return <path key={i} d={linePath} stroke={color} fill='none' />;
      })}
    </svg>
  );
};

export default ArsenalGraph;
