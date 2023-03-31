import useSetMomentById from 'hooks/useSetMomentById';
import { DotRadiusContext } from 'context';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { getPitchColorByName } from 'utils';
import { dot as dotClass } from '../PlaysSpin.module.scss';

const Dots = ({ chartData, startX, startY, minMaxValues }) => {
  const DOT_RADIUS = useContext(DotRadiusContext);

  const setMomentById = useSetMomentById();
  const { pitch_types: pitchTypes } = useSelector(state => state.game.preview);

  const maxX = Math.ceil(minMaxValues.maxX * 100);
  const minX = Math.floor(minMaxValues.minX * 100);
  const maxY = Math.ceil(minMaxValues.maxY * 100);
  const minY = Math.floor(minMaxValues.minY * 100);

  const xCoef = 100 / (maxX - minX);
  const yCoef = 100 / (maxY - minY);

  const handleDotClick = id => () => setMomentById(id);
  return (
    <>
      {chartData.map((dot, i) => {
        const coordX = (dot.offsetX * 100 - minX) * xCoef;
        const coordY = (dot.offsetY * 100 - minY) * yCoef;

        return (
          <circle
            key={i}
            cx={coordX + startX}
            cy={startY + 100 - coordY}
            r={DOT_RADIUS}
            fill={getPitchColorByName(pitchTypes[dot.pitchType][0])}
            stroke='black'
            strokeWidth='0.5'
            onClick={handleDotClick(dot.momentId)}
            className={dotClass}
          />
        );
      })}
    </>
  );
};

export default Dots;
