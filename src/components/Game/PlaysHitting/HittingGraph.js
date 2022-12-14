import React, { Fragment } from 'react';
import cl from './PlaysHitting.module.scss';
import GraphImage from 'images/hit_graph_thumb.png';

const Header = ({ maxSpeed, angle }) => {
  const maxSpeedValue = maxSpeed !== undefined ? `${maxSpeed} mph` : '—';
  const angleValue = angle !== undefined ? `${angle} degrees` : '—';

  return (
    <div className={cl.headerWrapper}>
      <div className={cl.leftSide}>
        <div className={cl.row}>
          <span className={cl.title}>Attack Angle</span>
          <span className={cl.value}>{angleValue}</span>
        </div>
      </div>
      <div className={cl.rightSide}>
        <div className={cl.row}>
          <span className={cl.title}>Max speed</span>
          <span className={cl.value}>{maxSpeedValue}</span>
        </div>
      </div>
    </div>
  );
};

const Graph = () => {
  const VIEWBOX_WIDTH = 327;
  const VIEWBOX_HEIGHT = 84;
  const GRAPH_START_X = 27;
  const GRAPH_START_Y = 5;
  const GRAPH_WIDTH = 300;
  const GRAPH_HEIGHT = 60;
  const GRAPH_BOTTOM_PADDING = 58;

  const leftTitles = [80, 70, 60];
  const bottomTitles = [0.3, 0.6, 0.9, 1.2];

  const minXValue = 0;
  const maxXValue = bottomTitles.slice(-1)[0] + bottomTitles[0];
  const minYValue = leftTitles.slice(-1)[0];
  const maxYValue = leftTitles[0];

  const xCoef = GRAPH_WIDTH / maxXValue;
  const yCoef = 42 / (maxYValue - minYValue);

  const curveCoordsSource = [
    [0.02, 66],
    [0.17, 73],
    [0.45, 81],
    [0.675, 81],
    [0.9, 76],
    [1.4, 64]
  ];

  const curveCoords = curveCoordsSource.map(coords => [
    coords[0] * xCoef + GRAPH_START_X,
    GRAPH_BOTTOM_PADDING - (coords[1] - minYValue) * yCoef
    // coords[1] * yCoef + GRAPH_START_Y
  ]);

  let curvePath = `M${curveCoords[0][0]} ${curveCoords[0][1]}`;
  curveCoords.shift();
  curveCoords.forEach(coords => {
    curvePath += `L${coords[0]} ${coords[1]}`
  });

  return (
    <div className={cl.graphWrapper}>
      <p className={cl.title}>Bat speed (mph)</p>
      {/* <img src={GraphImage} alt='graph' width='100%' /> */}
      <svg viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`} width='95%'>
        {/* Horizontal lines */}
        {leftTitles.map((title, i) => (
          <Fragment key={i}>
            <line
              x1={GRAPH_START_X}
              y1={GRAPH_START_Y + 11 + 21 * i}
              x2={GRAPH_START_X + GRAPH_WIDTH}
              y2={GRAPH_START_Y + 11 + 21 * i}
              stroke='#E3E1E1'
              stroke-dasharray='4 2'
            />
            <text
              x={GRAPH_START_X - 10}
              y={GRAPH_START_Y + 12 + 21 * i}
              className={cl.sideTitle}
              textAnchor='end'>
              {title}
            </text>
          </Fragment>
        ))}

        {/* Vertical lines */}
        {bottomTitles.map((title, i) => (
          <Fragment key={i}>
            <line
              key={i}
              x1={GRAPH_START_X + 60 + 60 * i}
              y1={GRAPH_START_Y}
              x2={GRAPH_START_X + 60 + 60 * i}
              y2={GRAPH_START_Y + GRAPH_HEIGHT}
              stroke='#E3E1E1'
              stroke-dasharray='4 2'
            />
            <text
              x={GRAPH_START_X + 60 + 60 * i}
              y={GRAPH_START_Y + GRAPH_HEIGHT + 12}
              className={cl.sideTitle}
              textAnchor='middle'>
              {title}
            </text>
          </Fragment>
        ))}
				
				{/* Curve */}
				<path d={curvePath} stroke="#1A4C96" fill='none'/>
      </svg>
    </div>
  );
};

const HittingGraph = ({ bat }) => {
  const { max_speed: maxSpeed, angle } = bat || {};

  return (
    <div className={cl.graph}>
      <Header maxSpeed={maxSpeed} angle={angle} />
      <Graph />
    </div>
  );
};

export default HittingGraph;
