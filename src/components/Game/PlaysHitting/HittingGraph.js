import React, { Fragment, useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { getFixedNumber } from 'utils';
import cl from './PlaysHitting.module.scss';

const Header = ({ maxSpeed, angle }) => {
  const maxSpeedValue = maxSpeed !== undefined ? `${getFixedNumber(maxSpeed, 1)} mph` : '—';
  const angleValue = angle !== undefined ? `${getFixedNumber(angle, 2)}°` : '—';

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

const Graph = ({ speeds, video, impactTime }) => {
  const [curveIndex, setCurveIndex] = useState(0);
  const videoCurrentTime = useSelector(state => state.game.videoCurrentTime);

  const curveTimeoutRef = useRef();

  const VIEWBOX_WIDTH = 327;
  const VIEWBOX_HEIGHT = 84;
  const GRAPH_START_X = 33;
  const GRAPH_START_Y = 5;
  const GRAPH_WIDTH = 294;
  const GRAPH_HEIGHT = 60;

  const minSpeed = speeds.slice(1).reduce((min, cur) => (cur[0] < min ? cur[0] : min), speeds[0][0]);
  const maxSpeed = speeds.slice(1).reduce((max, cur) => (cur[0] > max ? cur[0] : max), speeds[0][0]);

  const maxSpeedRounded = Math.ceil(maxSpeed);
  const minSpeedRounded = Math.floor(minSpeed);

  const leftTitles = [
    maxSpeedRounded,
    maxSpeedRounded - (maxSpeedRounded - minSpeedRounded) / 2,
    minSpeedRounded
  ];

  const verticalGraphPart = (speeds[speeds.length - 1][1] - speeds[0][1]) / 5;
  // const verticalGraphPart = speeds[speeds.length - 1][1] / 5;

  const bottomTitles = [
    verticalGraphPart.toFixed(2),
    (verticalGraphPart * 2).toFixed(2),
    (verticalGraphPart * 3).toFixed(2),
    (verticalGraphPart * 4).toFixed(2)
  ];

  const maxXValue = +bottomTitles.slice(-1)[0] + verticalGraphPart;

  const xCoef = GRAPH_WIDTH / maxXValue;
  const yCoef = 42 / (maxSpeedRounded - minSpeedRounded);

  const impactDotCoords = { x: 0, y: 0 };

  const curveCoords = speeds.map((coords, _, arr) => {
    const newXCoord = (coords[1] - arr[0][1]) * xCoef + GRAPH_START_X;
    const newYCoord = GRAPH_START_Y + 11 + 42 - (coords[0] - minSpeedRounded) * yCoef;

    if (impactTime >= coords[1]) {
      impactDotCoords.x = newXCoord;
      impactDotCoords.y = newYCoord;
    }
    return [newXCoord, newYCoord];
  });

  useLayoutEffect(() => {
    clearTimeout(curveTimeoutRef.current);

    setCurveIndex(0);
    if (curveCoords.length === 0) return;
    setTimeout(() => {
      setCurveIndex(1);
    }, 150);
  }, [speeds]);

  useEffect(() => {
    if (curveIndex === 0) return;

    curveTimeoutRef.current = setTimeout(
      () => {
        setCurveIndex(prev => (prev < curveCoords.length ? prev + 1 : prev));
      },
      curveIndex === 0 ? 500 : 30
    );
  }, [curveIndex]);

  let curvePath = `M${curveCoords[0][0]} ${curveCoords[0][1]}`;
  curveCoords.shift();
  curveCoords.slice(0, curveIndex).forEach(coords => {
    curvePath += `L${coords[0]} ${coords[1]}`;
  });

  const curTimeCorr = videoCurrentTime;

  const totalHitTime = speeds[speeds.length - 1][1] - speeds[0][1];

  const swingTimeStart = speeds[0][1];

  const elapsedTime =
    curTimeCorr < swingTimeStart ||
    // curTimeCorr < timeStart ||
    videoCurrentTime > video.full_seconds_to ||
    videoCurrentTime < video.full_seconds_from
      ? 0
      : curTimeCorr - swingTimeStart;
  // : curTimeCorr - timeStart;

  const coef = GRAPH_WIDTH / totalHitTime;
  const redLineXCoord = GRAPH_START_X + elapsedTime * coef;
  const isRedLine = elapsedTime < totalHitTime && elapsedTime > 0;

  // const redLineXCoord = GRAPH_START_X + GRAPH_WIDTH / 4;
  return (
    <div className={cl.graphWrapper}>
      <p className={cl.title}>Bat speed (mph)</p>
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
        {bottomTitles.map((title, i) => {
          const verticalPart = GRAPH_WIDTH / 5;
          return (
            <Fragment key={i}>
              <line
                key={i}
                x1={GRAPH_START_X + verticalPart + verticalPart * i}
                y1={GRAPH_START_Y}
                x2={GRAPH_START_X + verticalPart + verticalPart * i}
                y2={GRAPH_START_Y + GRAPH_HEIGHT}
                stroke='#E3E1E1'
                stroke-dasharray='4 2'
              />
              <text
                x={GRAPH_START_X + verticalPart + verticalPart * i}
                y={GRAPH_START_Y + GRAPH_HEIGHT + 12}
                className={cl.sideTitle}
                textAnchor='middle'>
                {title}
              </text>
            </Fragment>
          );
        })}

        {/* Vertical red line */}
        {isRedLine && (
          <line
            x1={redLineXCoord}
            y1={GRAPH_START_Y}
            x2={redLineXCoord}
            y2={GRAPH_START_Y + GRAPH_HEIGHT}
            stroke='red'
            strokeWidth='.5'
          />
        )}

        {/* Curve */}
        <path d={curvePath} stroke='#1A4C96' fill='none' />

        {/* Impact dot */}
        <circle
          className={cl.impactDot}
          r={curveCoords.length > curveIndex ? 0 : 3}
          fill='red'
          cx={impactDotCoords.x}
          cy={impactDotCoords.y}
          style={curveCoords.length > curveIndex ? { opacity: 0 } : null}
        />

        {/* Impact dot projection */}
        <line
          x1={impactDotCoords.x}
          y1={impactDotCoords.y}
          x2={impactDotCoords.x}
          y2={impactDotCoords.y + GRAPH_HEIGHT - impactDotCoords.y + 4}
          stroke='red'
          strokeWidth={curveCoords.length > curveIndex ? 0 : 0.5}
          strokeDasharray='4 2'
          style={curveCoords.length > curveIndex ? { opacity: 0 } : null}
          className={cl.impactDotLine}
        />
      </svg>
    </div>
  );
};

const HittingGraph = ({ currentMoment }) => {
  const {
    max_speed: maxSpeed,
    attack_angle: angle,
    speeds,
    impact_time: impactTime
  } = currentMoment?.metering?.bat || {};
  // const { time_start: timeStart } = currentMoment?.metering?.hit || {};
  return (
    <div className={cl.graph}>
      <Header maxSpeed={maxSpeed} angle={angle} />
      {speeds && <Graph speeds={speeds} video={currentMoment?.video} impactTime={impactTime} />}
    </div>
  );
};

export default HittingGraph;
