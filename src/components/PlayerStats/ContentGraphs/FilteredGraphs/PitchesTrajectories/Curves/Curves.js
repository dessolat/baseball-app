import { useState, memo } from 'react';
import { getRndValue } from 'utils';
import Curve from './Curve';
// import CurveTexture from 'images/blue_ball_curve.jpg';
// import { TextureLoader } from 'three';

const Curves = ({ hitsData }) => {
  const maxLength = hitsData.reduce((sum, hit) => {
    const curLength = hit.hit_info.data_3d.length;
    if (curLength > sum) sum = curLength;

    return sum;
  }, 0);

  const [curveCount, setCurveCount] = useState(maxLength);

  const isRenderCurves = curveCount > 1;
  // 240 - 359

  const defaultMinMaxDistance = { min: hitsData[0].hit_info.distance, max: hitsData[0].hit_info.distance };
  const minMaxDistance = hitsData.reduce((result, { hit_info: { distance } }) => {
    if (distance < result.min) result.min = distance;
    if (distance > result.max) result.max = distance;

    return result;
  }, defaultMinMaxDistance);
  return (
    <>
      {isRenderCurves &&
        hitsData.map((hit, i) => {
          const { hit_info: hitInfo } = hit;
          const { data_3d: data3D } = hitInfo;

          const curCurveCount = curveCount > data3D.length ? data3D.length : curveCount;

          return (
            <Curve
              key={'curve-' + getRndValue(0, 100000)}
              number={i}
              hitInfo={hitInfo}
              curveCount={curCurveCount}
              minMaxDistance={minMaxDistance}
              // curveTextureBlue={curveTextureBlue}
            />
          );
        })}
    </>
  );
};

function propsComparison(prevProps, nextProps) {
  return JSON.stringify(prevProps) === JSON.stringify(nextProps);
}

export default memo(Curves, propsComparison);
