import React, { Suspense, useMemo, useState, useRef, useEffect, useLayoutEffect } from 'react';
import cl from './HittingField.module.scss';
import { Canvas } from '@react-three/fiber';
import { CatmullRomCurve3, FrontSide, TextureLoader } from 'three';
import { OrbitControls } from '@react-three/drei';
import FieldBg from 'images/field_right.jpg';
import CurveTexture from 'images/blue_ball_curve.jpg';
import classNames from 'classnames';
import * as THREE from 'three';
import ArrowDown from 'components/UI/icons/ArrowDown';
import CameraIcon from 'images/video_camera_icon.png';
import FieldIcon from 'images/field_icon.png';
import CameraView from './CameraView';

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
      <div className={cl.arrowDown}>
        <ArrowDown />
      </div>
    </div>
  );
};

const Curve = ({ data, coef, curveCount }) => {
  const points = data.slice(0, curveCount).reduce((sum, coord) => {
    const newCoord = new THREE.Vector3(coord[0] * coef - 320, coord[2] * coef, coord[1] * -coef + 217);
    // const newCoord = new THREE.Vector3(-320, coord[2] * 5, 217);
    // const newCoord = new THREE.Vector3(coord[0]-325, coord[2] * 20, (coord[1] - 1490) / 3 + 150);
    // const newCoord = new THREE.Vector3(coord[0] / 3.5 - 450, coord[2] * 20, (coord[1] - 1490) / 3 + 150);
    sum.push(newCoord);
    return sum;
  }, []);

  const curveCoords = new CatmullRomCurve3(points);

  const textureRef = useMemo(() => new TextureLoader().load(CurveTexture), []);
  return (
    <>
      {/* <mesh position={[0, 0, 0]}> */}

      <mesh position={[-70, 0, 220]} castShadow>
        <tubeGeometry args={[curveCoords, 70, 3, 50, false]} />
        <meshPhongMaterial
          // color={'blue'}
          map={textureRef}
          side={FrontSide}
          //  shadowSide={DoubleSide}
          //  metalness={0}

          //  roughness={0.2}
          //  clearcoat={0.3}
          //  clearcoatRoughness={0.25}
          //  transmission={1}
          //  reflectivity={1}
          //  ior={1.2}
          //  thickness={10}
          //  envMap={textureRef}
        />
      </mesh>
    </>
  );
};

const TouchPoints = ({ data, coef, curveCount }) => (
  <>
    {data
      .slice(0, curveCount)
      .filter(coords => coords[3] === 1)
      .map(coord => (
        <mesh position={[coord[0] * coef - 320 - 70, coord[2] * coef, coord[1] * -coef + 217 + 220]}>
          {/* <mesh position={[coord[0] * coef - 320, coord[2] * coef, coord[1] * -coef + 217]}> */}
          {/* <mesh position={[coord[0] / 3.5 - 450 - 70, coord[2] * 20, (coord[1] - 1490) / 3 + 150 + 220]}> */}
          <sphereGeometry args={[5, 40, 40]} />
          <meshStandardMaterial color={'red'} />
        </mesh>
      ))}
  </>
);

const HittingField = ({ hit }) => {
  const { data_3d, camera_2d: camera2D } = hit || 0;
  const [isAutoRotate, setAutoRotate] = useState(true);
  const [curveCount, setCurveCount] = useState(null);
  const [isCameraView, setCameraView] = useState(false);

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
    if (isCameraView) return;

    setCurveCount(0);

    if (!data_3d) return;

    setTimeout(() => {
      setCurveCount(1);
    }, 150);
  }, [data_3d, isCameraView]);

  useEffect(() => {
    if (!data_3d || curveCount === 0) return;

    const length = data_3d.length;

    let timeout;

    if (curveCount < length) {
      timeout = setTimeout(() => {
        setCurveCount(prev => prev + 1);
      }, 3);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [curveCount]);

  const handleAutoRotateClick = () => setAutoRotate(prev => !prev);
  const handleResetClick = () => controlsRef.current.reset();

  // const font = new FontLoader().parse(ComfortaaFont)

  const coef = 925 / 90;
  // const yCoef = 909 / 90;
  // xStart = -320 (1)
  // xEnd = 605 (1)
  // yStart = 217 (3)
  // yEnd = -692 (3)

  // if (data_3d && curveCount > 1) {
  // }

  const cameraSwitchBtnHandler = () => setCameraView(prev => !prev);

  const isRenderPath = data_3d && curveCount > 1;
  const btnIcon = isCameraView ? FieldIcon : CameraIcon;
  const isBtnIcon = camera2D !== null;
  return (
    <div className={cl.field}>
      {(!isCameraView || camera2D === null) && (
        <>
          <Canvas
            className={cl.canvas}
            camera={{ position: [0, 700, 1000], far: 3000, zoom: 0.34 }}
            shadows={true}
            shadowMap
            orthographic={true}>
            <Suspense fallback={null}>
              <mesh position={[0, 0, 50]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow={true}>
                <planeGeometry args={[1280, 1090]} />
                <meshStandardMaterial map={textureRef} toneMapped={false} shadowSide={THREE.DoubleSide} />
              </mesh>

              {isRenderPath && <Curve data={data_3d} coef={coef} curveCount={curveCount} />}
              {/* {data_2d?.map(coord => (
            <mesh position={[coord[0] / 3.5 - 450, coord[2] * 20, (coord[1] - 1490) / 3 + 150]}>
              <sphereGeometry args={[5, 40, 40]} />
              <meshStandardMaterial color={'blue'} />
            </mesh>
          ))} */}

              {isRenderPath && <TouchPoints data={data_3d} coef={coef} curveCount={curveCount} />}

              {/* <spotLight
            position={[0, 1500, 0]}
            // target={new THREE.Object3D(500,500,100)}
            intensity={1}
            castShadow={true}
						distance={15000}
						power={2.5}
						/> */}

              <directionalLight
                position={[0, 400, 0]}
                intensity={0.5}
                castShadow
                shadow-camera-left={-640}
                shadow-camera-right={640}
                shadow-camera-top={640}
                shadow-camera-bottom={-640}
              />
              <ambientLight intensity={0.5} />

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
        </>
      )}
      {isCameraView && camera2D !== null && <CameraView camera2D={camera2D} />}
      {isBtnIcon && (
        <button className={cl.cameraSwitchBtn} onClick={cameraSwitchBtnHandler}>
          <img src={btnIcon} alt='camera' />
        </button>
      )}
    </div>
  );
};

export default HittingField;
