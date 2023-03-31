import { useContext } from 'react';
import useSetMomentById from 'hooks/useSetMomentById';
import { DotRadiusContext } from 'context';
import { getPitchColorByName } from 'utils';
import { dot as dotClass } from '../PlaysSpeed.module.scss';

const Dots = ({ dotsCoords, pitchTypes }) => {
  const setMomentById = useSetMomentById();

  const DOT_RADIUS = useContext(DotRadiusContext);

  const dotsArr = Object.entries(dotsCoords).reduce((sum, pair) => {
    pair[1].forEach(coords =>
      sum.push({ type: +pair[0], coords: [coords[0], coords[1]], momentId: coords[2] })
    );
    return sum;
  }, []);

  const handleDotClick = id => () => setMomentById(id);
  return dotsArr.map((dot, i) => (
    <circle
      key={i}
      cx={dot.coords[0]}
      cy={dot.coords[1]}
      r={DOT_RADIUS}
      fill={getPitchColorByName(pitchTypes[dot.type][0])}
      stroke='#000'
      strokeWidth='0.5'
      className={dotClass}
      onClick={handleDotClick(dot.momentId)}
    />
  ));
};

export default Dots;
