import { memo, useRef, useState, useEffect, useContext } from 'react';
import {
  useFrame
  // extend
} from '@react-three/fiber';
import { HSVtoRGB } from 'utils';
// import ComfortaaFont from 'fonts/Comfortaa_Regular.json';
import { ctx } from 'context/ThreeTextCtx';

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

const CurvePath = memo(
  ({ hit, coef, setDrawPoints, minMaxDistance, handlePointerOver, handlePointerOut }) => {
    const { data_3d: data3D, distance, angle, 'exit velocity': speed } = hit.hit_info;
    const { game_id: gameId, mom_id: momentId } = hit.pitch_info;

    const [pointerOver, setPointerOver] = useState(false);

    const tubeRef = useRef(null);
    // const textRef = useRef(null);

    const {
      // TextGeometry,
      Vector3,
      CatmullRomCurve3,
      // FontLoader,
      FrontSide
    } = useContext(ctx);

    // extend({ TextGeometry });

    // useEffect(() => {
    //   if (tubeRef.current === null) return;

    //   document.body.style.cursor = hovered ? 'pointer' : 'auto';
    // }, [hovered]);

    const cashedStepTotal = useRef(0);

    let stepTotalRef = cashedStepTotal.current;
    useEffect(() => {
      setDrawPoints(false);

      stepTotalRef = 0;
      cashedStepTotal.current = 0;
    }, [data3D]);

    // useEffect(() => {
    //   if (!hovered) {
    //     setTubeRadius(3);
    //     return;
    //   }

    //   setTubeRadius(prev => prev + 0.1);
    // }, [hovered]);

    // useEffect(() => {
    //   if (!hovered) {
    //     setTubeRadius(3);
    //     return;
    //   }
    //   if (tubeRadius <= 3 || tubeRadius >= 5) return;

    //   setTubeRadius(prev => prev + 0.1);
    // }, [tubeRadius, hovered]);

    const points = data3D.reduce((sum, coord) => {
      const newCoord = new Vector3(coord[0] * coef - 320, coord[2] * coef, coord[1] * -coef + 167);

      sum.push(newCoord);
      return sum;
    }, []);

    const curveCoords = new CatmullRomCurve3(points);

    useFrame(({ camera }) => {
      // if (textRef.current) {
      //   textRef.current.quaternion.copy(camera.quaternion);
      //   textRef.current.geometry.center();
      // }

      // if (pointerOver) {
      //   tubeRef.current.attributes.args = [curveCoords, 500, 10, 10, false];
      // }

      if (stepTotalRef > 30510) return;
      if (stepTotalRef > 30110) {
        setDrawPoints(true);
        cashedStepTotal.current = stepTotalRef;
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

    const resultColorRel = colorsMin + colorsDelta * distanceRel;

    const meshColor = HSVtoRGB(resultColorRel, 1, 1);

    const handleMeshClick = () => {
      window.open(`/game/${gameId}?card=${momentId}&tab=hitting`, '_blank');
    };

    // const font = new FontLoader().parse(ComfortaaFont);
    // const textCoords = data3D[Math.floor(data3D.length / 2)];

    const distanceText = `Angle: ${String(Math.round(angle))}° Velocity: ${String(Math.round(speed))} mph 
Distance: ${String(Math.round(distance))} m.`;
    return (
      <>
        <mesh position={[-70, 0, 220]} castShadow>
          <tubeGeometry
            args={[curveCoords, 500, !pointerOver ? 3 : 4, 10, false]}
            // drawRange={{ start: 0, count: 200 }}
            ref={tubeRef}
          />
          <meshPhongMaterial color={meshColor} side={FrontSide} />
        </mesh>
        <mesh
          position={[-70, 0, 220]}
          onClick={handleMeshClick}
          onPointerOver={() => {
            if (cashedStepTotal.current < 30110) return;
            handlePointerOver(distanceText);
            setPointerOver(true);
          }}
          onPointerOut={() => {
            if (cashedStepTotal.current < 30110) return;
            handlePointerOut(distanceText);
            setPointerOver(false);
          }}>
          <tubeGeometry args={[curveCoords, 500, 12, 10, false]} />
          <meshPhongMaterial transparent opacity='0' />
        </mesh>

        {/* {hovered && (
        <mesh
          position={[textCoords[0] * coef - 390, textCoords[2] * coef + 100, textCoords[1] * -coef + 450]}
          ref={textRef}>
          <textGeometry args={[distanceText, { font, size: 22, height: 2 }]} />
          <meshBasicMaterial color='blue' toneMapped={false} />
        </mesh>
      )} */}
      </>
    );
  }
);

const Curve = ({ hit, curveCount, minMaxDistance, handlePointerOver, handlePointerOut }) => {
  const [drawPoints, setDrawPoints] = useState(false);
  const coef = 925 / 90;

  return (
    <>
      <CurvePath
        hit={hit}
        coef={coef}
        curveCount={curveCount}
        setDrawPoints={setDrawPoints}
        minMaxDistance={minMaxDistance}
        handlePointerOver={handlePointerOver}
        handlePointerOut={handlePointerOut}
      />
      {/* {drawPoints && <TouchPoints data3D={data3D} coef={coef} curveCount={curveCount} />} */}
    </>
  );
};

export default Curve;
