import { CatmullRomCurve3, FrontSide, Vector3 } from 'three';
import { memo, useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { HSVtoRGB } from 'utils';

// const TouchPoints = ({ data3D, coef, curveCount }) => (
//   <>
//     {data3D
//       .slice(0, curveCount)
//       .filter(coords => coords[3] === 1)
//       .map(coord => (
//         <mesh position={[coord[0] * coef - 320 - 70, coord[2] * coef, coord[1] * -coef + 167 + 220]}>
//           <sphereGeometry args={[5, 40, 40]} />
//           <meshStandardMaterial color={'red'} />
//         </mesh>
//       ))}
//   </>
// );

const CurvePath = memo(({ hitInfo, coef, curveCount, setDrawPoints, minMaxDistance }) => {
  const { data_3d: data3D, distance } = hitInfo;
  const tubeRef = useRef(null);

  let stepTotalRef = 0;
  useEffect(() => {
    setDrawPoints(false);

    stepTotalRef = 0;
  }, [data3D]);

  const points = data3D.reduce((sum, coord) => {
    const newCoord = new Vector3(coord[0] * coef - 320, coord[2] * coef, coord[1] * -coef + 167);

    sum.push(newCoord);
    return sum;
  }, []);

  const curveCoords = new CatmullRomCurve3(points);

  useFrame(() => {
    if (stepTotalRef > 30110) {
      setDrawPoints(true);
      return;
    }
    stepTotalRef += 400;
    tubeRef.current.setDrawRange(0, stepTotalRef);
  });

  const colorsMin = 0.65;
  const colorsMax = 1;
  const colorsDelta = colorsMax - colorsMin;

  const distanceDelta = distance - minMaxDistance.min;
  const distanceRel = distanceDelta / (minMaxDistance.max - minMaxDistance.min);

	const resultColorRel = colorsMin + colorsDelta * distanceRel

  const meshColor = HSVtoRGB(resultColorRel, 1, 1);
  return (
    <mesh position={[-70, 0, 220]} castShadow>
      <tubeGeometry
        args={[curveCoords, 500, 3, 10, false]}
        // drawRange={{ start: 0, count: 200 }}
        ref={tubeRef}
      />
      <meshPhongMaterial
        // map={curveTextureBlue}
        color={meshColor}
        side={FrontSide}
      />
    </mesh>
  );
});

const Curve = ({ hitInfo, curveCount, minMaxDistance }) => {
  const [drawPoints, setDrawPoints] = useState(false);
  const coef = 925 / 90;

  // const { data_3d: data3D } = hitInfo;
  return (
    <>
      <CurvePath
        hitInfo={hitInfo}
        coef={coef}
        curveCount={curveCount}
        setDrawPoints={setDrawPoints}
        minMaxDistance={minMaxDistance}
      />
      {/* {drawPoints && <TouchPoints data3D={data3D} coef={coef} curveCount={curveCount} />} */}
    </>
  );
};

export default Curve;
