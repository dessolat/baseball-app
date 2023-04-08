import useSetMomentById from 'hooks/useSetMomentById';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getPitchColorByName } from 'utils';
import { dot as dotClass, showingGroup, graphTooltip } from '../PlaysSpin.module.scss';

const Dots = ({ chartData, startX, startY, minMaxValues }) => {
  const [hoveredDot, setHoveredDot] = useState({
    visible: false,
    spinX: 0,
    spinY: 0,
    coords: [0, 0],
    pitchType: ''
  });

  const setMomentById = useSetMomentById();
  const { pitch_types: pitchTypes } = useSelector(state => state.game.preview);

  const maxX = Math.ceil(minMaxValues.maxX * 100);
  const minX = Math.floor(minMaxValues.minX * 100);
  const maxY = Math.ceil(minMaxValues.maxY * 100);
  const minY = Math.floor(minMaxValues.minY * 100);

  const xCoef = 100 / (maxX - minX);
  const yCoef = 100 / (maxY - minY);

  const handleDotClick = id => () => setMomentById(id);

  const spinValueX = Math.round(hoveredDot.spinX);
  const spinValueY = Math.round(hoveredDot.spinY);

  const hoveredDotXCoord =
    hoveredDot.coords[0] >= 90
      ? hoveredDot.coords[0] - 51
      : hoveredDot.coords[0] < 28
      ? hoveredDot.coords[0] + 57
      : hoveredDot.coords[0];
  const hoveredDotYCoord = hoveredDot.coords[1] <= 58 ? hoveredDot.coords[1] + 72 : hoveredDot.coords[1] - 16;
  return (
    <>
      {chartData.map(dot => {
        const coordX = (dot.offsetX * 100 - minX) * xCoef;
        const coordY = (dot.offsetY * 100 - minY) * yCoef;

        return (
          <circle
            key={`${coordX}-${coordY}`}
            cx={coordX + startX}
            cy={startY + 100 - coordY}
            fill={getPitchColorByName(pitchTypes[dot.pitchType][0])}
            stroke='black'
            strokeWidth='0.5'
            onClick={handleDotClick(dot.momentId)}
            className={dotClass}
            onPointerOver={() =>
              setHoveredDot(prev => ({
                ...prev,
                spinX: dot.offsetX * 100,
                spinY: dot.offsetY * -100,
                visible: true,
                coords: [coordX + startX, startY + 100 - coordY],
                pitchType: pitchTypes[dot.pitchType][0]
              }))
            }
            onPointerOut={() => setHoveredDot(prev => ({ ...prev, visible: false }))}
          />
        );
      })}
      {hoveredDot.visible && (
        <g className={showingGroup}>
          <rect
            x={hoveredDotXCoord - 37}
            y={hoveredDotYCoord - 42}
            width={74}
            height={48}
            stroke='grey'
            strokeWidth='.5'
            fill='white'
            radius='10'
          />
          <text x={hoveredDotXCoord} y={hoveredDotYCoord - 28} className={graphTooltip} textAnchor='middle'>
            {hoveredDot.pitchType}
          </text>
          <text x={hoveredDotXCoord} y={hoveredDotYCoord - 13} className={graphTooltip} textAnchor='middle'>
            dx: {spinValueX}
          </text>
          <text x={hoveredDotXCoord} y={hoveredDotYCoord +2} className={graphTooltip} textAnchor='middle'>
            dy: {spinValueY}
          </text>
        </g>
      )}
    </>
  );
};

export default Dots;
