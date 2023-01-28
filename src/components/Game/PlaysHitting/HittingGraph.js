import React, { Fragment, useState, useEffect, useRef } from 'react';
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

const Graph = ({ speeds, timeStart, video }) => {
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

  const verticalGraphPart = speeds[speeds.length - 1][1] / 5;
  const bottomTitles = [
    verticalGraphPart.toFixed(2),
    (verticalGraphPart * 2).toFixed(2),
    (verticalGraphPart * 3).toFixed(2),
    (verticalGraphPart * 4).toFixed(2)
  ];

  const maxXValue = +bottomTitles.slice(-1)[0] + verticalGraphPart;

  const xCoef = GRAPH_WIDTH / maxXValue;
  const yCoef = 42 / (maxSpeedRounded - minSpeedRounded);

  const curveCoords = speeds.map(coords => [
    coords[1] * xCoef + GRAPH_START_X,
    GRAPH_START_Y + 11 + 42 - (coords[0] - minSpeedRounded) * yCoef
  ]);

  useEffect(() => {
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

  const totalHitTime = speeds[speeds.length - 1][1];

  const elapsedTime =
    curTimeCorr < timeStart ||
    videoCurrentTime > video.full_seconds_to ||
    videoCurrentTime < video.full_seconds_from
      ? 0
      : curTimeCorr - timeStart;

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
      </svg>
    </div>
  );
};

const HittingGraph = ({ currentMoment }) => {
  const { max_speed: maxSpeed, attack_angle: angle, speeds } = currentMoment?.metering?.bat || {};
  const { time_start: timeStart } = currentMoment?.metering?.hit || {};

  return (
    <div className={cl.graph}>
      <Header maxSpeed={maxSpeed} angle={angle} />
      {speeds && <Graph speeds={speeds} timeStart={timeStart} video={currentMoment?.video} />}
    </div>
  );
};

export default HittingGraph;
