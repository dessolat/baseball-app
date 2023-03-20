import { CatmullRomCurve3, FrontSide, Vector3 } from 'three';
import { memo, useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';

const TouchPoints = ({ data3D, coef, curveCount }) => (
  <>
    {data3D
      .slice(0, curveCount)
      .filter(coords => coords[3] === 1)
      .map(coord => (
        <mesh position={[coord[0] * coef - 320 - 70, coord[2] * coef, coord[1] * -coef + 167 + 220]}>
          <sphereGeometry args={[5, 40, 40]} />
          <meshStandardMaterial color={'red'} />
        </mesh>
      ))}
  </>
);

const CurvePath = memo(({ data3D, coef, curveCount, setDrawPoints }) => {
  const tubeRef = useRef(null);

let stepTotalRef = 0
  useEffect(() => {
    
		setDrawPoints(false)
		

			stepTotalRef = 0
  }, [data3D]);

  const points = data3D
	.reduce((sum, coord) => {
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
  return (
    <mesh position={[-70, 0, 220]} castShadow>
      <tubeGeometry
        args={[curveCoords, 500, 3, 10, false]}
        // drawRange={{ start: 0, count: 200 }}
        ref={tubeRef}
      />
      <meshPhongMaterial
        // map={curveTextureBlue}
        color='blue'
        side={FrontSide}
      />
    </mesh>
  );
});

const Curve = ({ data3D, curveCount, number }) => {
  const [drawPoints, setDrawPoints] = useState(false);
  const coef = 925 / 90;

  return (
    <>
      <CurvePath data3D={data3D} coef={coef} curveCount={curveCount} setDrawPoints={setDrawPoints} />
      {drawPoints && <TouchPoints data3D={data3D} coef={coef} curveCount={curveCount} />}
    </>
  );
};

export default Curve;
