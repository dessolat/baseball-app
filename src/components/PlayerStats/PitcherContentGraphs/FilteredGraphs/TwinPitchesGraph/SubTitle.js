import { subTitle } from './TwinPitchesGraph.module.scss';

const SubTitle = ({ zeroXCoord, top, arrData }) => {
  const minMaxSpeed = arrData.reduce((minMax, { pitch_info: { speed } }, i) => {
    if (speed < minMax.min || i === 0) minMax.min = speed;
    if (speed > minMax.max || i === 0) minMax.max = speed;

    return minMax;
  }, {});

  minMaxSpeed.min *= 2.24;
  minMaxSpeed.max *= 2.24;
  return (
    <>
      <text x={zeroXCoord} y={top + 10} className={subTitle}>
        Min: {Math.round(minMaxSpeed.min)} mph
      </text>
      <text x={zeroXCoord} y={top + 26} className={subTitle}>
        Max: {Math.round(minMaxSpeed.max)} mph
      </text>
    </>
  );
};

export default SubTitle;
