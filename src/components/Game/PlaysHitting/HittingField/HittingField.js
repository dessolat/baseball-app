import React, { Suspense, useMemo, useState, useRef, useEffect, useLayoutEffect } from 'react';
import cl from './HittingField.module.scss';
import { Canvas } from '@react-three/fiber';
import { CatmullRomCurve3, TextureLoader } from 'three';
import { OrbitControls } from '@react-three/drei';
import FieldBg from 'images/field_right.jpg';
import classNames from 'classnames';
import * as THREE from 'three';

// extend({ TextGeometry });

const OptionsBar = ({ isAutoRotate, handleAutoRotateClick, handleResetClick }) => {
  const rotateBtnClass = classNames({
    [cl.active]: isAutoRotate
  });

  return (
    <div className={cl.optionsBarWrapper}>
      <div className={cl.optionsBar}>
        <button onClick={handleAutoRotateClick} className={rotateBtnClass}>
          Auto-rotate
        </button>
        <button onClick={handleResetClick}>Reset field</button>
      </div>
    </div>
  );
};

const HittingField = ({ hit }) => {
  const { data_2d } = hit || 0;
  const [isAutoRotate, setAutoRotate] = useState(false);
  const [curveCount, setCurveCount] = useState(null);

  const textureRef = useMemo(() => new TextureLoader().load(FieldBg), []);

  const controlsRef = useRef();

  // let ballPath = data_2d ? `M${data_2d[0][0]} ${data_2d[0][1]}` : '';
  // data_2d && data_2d.slice(1).forEach(coords => (ballPath += `L${coords[0]} ${coords[1]}`));

  // const intermediatePoints = data_2d
  //   ? data_2d
  //       .filter(coords => coords[3] === 1)
  //       .map((coords, i) => <circle key={i} cx={coords[0]} cy={coords[1]} r={18} fill='red'></circle>)
  //   : '';

  // const setCords = e => {
  // 	console.log(e);
  //   setCameraCoords([e.point.x, e.point.y, e.point.z]);
  // };

  useLayoutEffect(() => {
    setCurveCount(0);

    if (!data_2d) return;

    setTimeout(() => {
      setCurveCount(1);
    }, 150);
  }, [data_2d]);

  useEffect(() => {
    if (!data_2d || curveCount === 0) return;

    const length = data_2d.length;
		
		let timeout;

    if (curveCount < length) {
      timeout = setTimeout(() => {
        setCurveCount(prev => prev + 1);
      }, 3);
    }

		return () => {
			clearTimeout(timeout)
		}
  }, [curveCount]);

  const handleAutoRotateClick = () => setAutoRotate(prev => !prev);
  const handleResetClick = () => controlsRef.current.reset();

  // const font = new FontLoader().parse(ComfortaaFont)

  let points, curve;

  if (data_2d && curveCount > 0) {
    points = data_2d?.slice(0, curveCount).reduce((sum, coord) => {
      const newCoord = new THREE.Vector3(coord[0] / 3.5 - 450, coord[2] * 20, (coord[1] - 1490) / 3 + 150);
      sum.push(newCoord);
      return sum;
    }, []);

    curve = new CatmullRomCurve3(points);
  }

  return (
    <div className={cl.field}>
      <Canvas
        className={cl.canvas}
        camera={{ position: [0, 700, 1000], far: 3000, zoom: 0.34 }}
        orthographic={true}>
        <Suspense fallback={null}>
          <mesh position={[0, 0, 50]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[1280, 1090]} />
            <meshBasicMaterial map={textureRef} toneMapped={false} />
          </mesh>

          {curveCount > 1 && (
            <mesh position={[-70, 0, 220]}>
              <tubeGeometry args={[curve, 70, 3, 50, false]} />
              <meshBasicMaterial color={'blue'} side={THREE.DoubleSide} />
            </mesh>
          )}
          {/* {data_2d?.map(coord => (
            <mesh position={[coord[0] / 3.5 - 450, coord[2] * 20, (coord[1] - 1490) / 3 + 150]}>
              <sphereGeometry args={[5, 40, 40]} />
              <meshStandardMaterial color={'blue'} />
            </mesh>
          ))} */}
          {data_2d
            ?.slice(0, curveCount)
            .filter(coords => coords[3] === 1)
            .map(coord => (
              <mesh position={[coord[0] / 3.5 - 450 - 70, coord[2] * 20, (coord[1] - 1490) / 3 + 150 + 220]}>
                <sphereGeometry args={[5, 40, 40]} />
                <meshStandardMaterial color={'red'} />
              </mesh>
            ))}

          <ambientLight intensity={1} />

          <OrbitControls
            enableZoom={true}
            autoRotate={isAutoRotate}
            maxPolarAngle={Math.PI / 2.2}
            minZoom={0.22}
            maxZoom={3}
            zoomSpeed={1.5}
            enableDamping={false}
            rotateSpeed={1.2}
            ref={controlsRef}
          />
        </Suspense>
      </Canvas>

      <OptionsBar
        isAutoRotate={isAutoRotate}
        handleAutoRotateClick={handleAutoRotateClick}
        handleResetClick={handleResetClick}
      />

      {/* <div className={cl.fieldBg}>
        <svg width='100%' height='100%' viewBox='0 0 2560 2560' fill='none' preserveAspectRatio='none'>
          <path
            d={ballPath}
            stroke='#4AA0F0'
            strokeWidth='20'
            strokeLinejoin='round'
            strokeLinecap='round'></path>
          {intermediatePoints}
        </svg>
      </div> */}
    </div>
  );
};

export default HittingField;
