import { useState, memo } from 'react';
import useSetMomentById from 'hooks/useSetMomentById';
import { getPitchColorByName, propsAreEqual } from 'utils';
import { dot as dotClass, plainText, showingGroup } from '../PlaysSpeed.module.scss';

const Dot = ({ dot, handleDotClick, pitchTypes, setHoveredDot }) => (
  <circle
    cx={dot.coords[0]}
    cy={dot.coords[1]}
    fill={getPitchColorByName(pitchTypes[dot.type][0])}
    stroke='#000'
    strokeWidth='0.5'
    className={dotClass}
    onClick={handleDotClick(dot.momentId)}
    onPointerOver={() =>
      setHoveredDot(prev => ({
        ...prev,
        speed: dot.speed,
        visible: true,
        coords: [dot.coords[0], dot.coords[1]]
      }))
    }
    onPointerOut={() => setHoveredDot(prev => ({ ...prev, visible: false }))}
  />
);

const Dots = ({ dotsCoords, pitchTypes }) => {
  const [hoveredDot, setHoveredDot] = useState({ visible: false, speed: 0, coords: [0, 0] });

  const setMomentById = useSetMomentById();

  const dotsArr = Object.entries(dotsCoords).reduce((sum, pair) => {
    pair[1].forEach(coords =>
      sum.push({ type: +pair[0], coords: [coords[0], coords[1]], momentId: coords[2], speed: coords[3] })
    );
    return sum;
  }, []);

  const handleDotClick = id => () => setMomentById(id);

  const speedValue = +(hoveredDot.speed * 10).toFixed(0) / 10;
  const hoveredDotXCoord =
    hoveredDot.coords[1] > 40
      ? hoveredDot.coords[0]
      : hoveredDot.coords[0] > 400
      ? hoveredDot.coords[0] - 34
      : hoveredDot.coords[0] + 34;
  const hoveredDotYCoord = hoveredDot.coords[1] > 40 ? hoveredDot.coords[1] : hoveredDot.coords[1] + 18;
  return (
    <>
      {dotsArr.map(dot => {
        return (
          <Dot
            key={`${dot.coords[0]}-${dot.coords[1]}`}
            dot={dot}
            handleDotClick={handleDotClick}
            pitchTypes={pitchTypes}
            setHoveredDot={setHoveredDot}
          />
        );
      })}
      {hoveredDot.visible && (
        <g className={showingGroup}>
          <rect
            x={hoveredDotXCoord - 20}
            y={hoveredDotYCoord - 29}
            width={40}
            height={20}
            stroke='grey'
            strokeWidth='.5'
            fill='white'
            radius='10'
          />
          <text
            x={hoveredDotXCoord}
            y={hoveredDotYCoord - 13}
            className={plainText}
            textAnchor='middle'
            filter='url(#solid)'>
            {speedValue}
          </text>
        </g>
      )}
    </>
  );
};

export default memo(Dots, propsAreEqual);
