import { Fragment, useState } from 'react';
import { getPitchColorByName } from 'utils';
import { showingGroup, plainText, dot } from './PitchersReleaseSpeeds.module.scss';

const Dots = ({ PARAMS, linesArr, minMaxValues, pitchDeltaWidth }) => {
  const [hoveredDot, setHoveredDot] = useState({ visible: false, speed: 0, coords: [0, 0] });

  const handleDotClick = (gameId, momentId) => () => {
    window.open(`/game/${gameId}?card=${momentId}&tab=pitching`, '_blank');
  };

  const minMaxSpeedDelta = minMaxValues.max - minMaxValues.min;
  const heightPerValue = PARAMS.GRAPH_HEIGHT / minMaxSpeedDelta;

  const zeroYCoord = PARAMS.TOP_PADDING + PARAMS.GRAPH_HEIGHT;

  const speedValue = +(hoveredDot.speed * 10).toFixed(0) / 10;

  const hoveredDotXCoord =
    hoveredDot.coords[0] <= PARAMS.GRAPH_WIDTH ? hoveredDot.coords[0] : hoveredDot.coords[0] - 65;
  const hoveredDotYCoord = hoveredDot.coords[1] > 40 ? hoveredDot.coords[1] - 5 : hoveredDot.coords[1] + 75;
  return (
    <>
      {linesArr.map((pitcherData, i) => {
        const { pitchTypes } = pitcherData;
        return (
          <Fragment key={`dots-${i}`}>
            {pitcherData.pitches.map((pitch, j, arr) => {
              let xCoord = PARAMS.LEFT_PADDING + pitchDeltaWidth * (j + 1);
              if (i > 0) xCoord += pitchDeltaWidth * (pitcherData.accum - arr.length);

              const yCoord = zeroYCoord - heightPerValue * (pitch.speed - minMaxValues.min);
              return (
                <circle
                  key={`dot-${i}-${j}`}
                  cx={xCoord}
                  cy={yCoord}
                  className={dot}
                  stroke='black'
                  strokeWidth='.5'
                  fill={getPitchColorByName(pitchTypes[pitch.pitchType])}
                  onClick={handleDotClick(pitch.game_id, pitch.mom_id)}
                  onPointerOver={() =>
                    setHoveredDot(prev => ({
                      ...prev,
                      speed: pitch.speed,
                      visible: true,
                      coords: [xCoord, yCoord],
                      pitchType: pitchTypes[pitch.pitchType]
                    }))
                  }
                  onPointerOut={() => setHoveredDot(prev => ({ ...prev, visible: false }))}
                />
              );
            })}
          </Fragment>
        );
      })}
      {hoveredDot.visible && (
        <g className={showingGroup}>
          <rect
            x={hoveredDotXCoord - 50}
            y={hoveredDotYCoord - 44}
            width={100}
            height={35}
            stroke='black'
            strokeWidth='.5'
            fill='white'
            radius='10'
          />
          <text x={hoveredDotXCoord} y={hoveredDotYCoord - 29} className={plainText} textAnchor='middle'>
            {hoveredDot.pitchType}
          </text>
          <text x={hoveredDotXCoord} y={hoveredDotYCoord - 13} className={plainText} textAnchor='middle'>
            {speedValue} mph
          </text>
        </g>
      )}
    </>
  );
};

export default Dots;
