import React, { Suspense, useMemo, useState, useRef, useLayoutEffect, memo } from 'react';
import cl from './HittingField.module.scss';
import { Canvas, useFrame } from '@react-three/fiber';
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
import { useSelector } from 'react-redux';

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

const Curve = ({ moment, coef, setDrawPoints, currentMoment }) => {
  const { data_3d: data } = moment?.metering?.hit;

  const cashedStepTotal = useRef(0);
  const tubeRef = useRef(null);

  let stepTotalRef = cashedStepTotal.current;

  useLayoutEffect(() => {
    setDrawPoints(false);

    stepTotalRef = 0;
    cashedStepTotal.current = 0;
  }, [data]);

  const points = data
    // .slice(0, curveCount)
    .reduce((sum, coord) => {
      const newCoord = new THREE.Vector3(coord[0] * coef - 320, coord[2] * coef, coord[1] * -coef + 217);

      sum.push(newCoord);
      return sum;
    }, []);

  const curveCoords = new CatmullRomCurve3(points);

  // const textureRef = useMemo(() => new TextureLoader().load(CurveTexture), []);

  useFrame(() => {
    if (stepTotalRef > 30510) return;
    if (stepTotalRef > 30110) {
      setDrawPoints(true);
      cashedStepTotal.current = stepTotalRef;
      return;
    }
    cashedStepTotal.current = stepTotalRef;

    stepTotalRef += 400;
    tubeRef.current.setDrawRange(0, stepTotalRef);
  });
  const isCurrentTube = currentMoment.inner.id === moment.inner.id;
  return (
    <>
      <mesh position={[-70, 0, 220]} castShadow>
        <tubeGeometry args={[curveCoords, 70, 3, 50, false]} ref={tubeRef} />
        <meshPhongMaterial
          color={isCurrentTube ? 'blue' : '#0099E6'}
          // map={textureRef}
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

const CurveAndPoints = memo(({ moment, coef, currentMoment }) => {
  const [drawPoints, setDrawPoints] = useState(false);
  const { data_3d: data3D } = moment?.metering?.hit;

  return (
    <>
      <Curve moment={moment} coef={coef} setDrawPoints={setDrawPoints} currentMoment={currentMoment} />
      {drawPoints && <TouchPoints data={data3D} coef={coef} />}
    </>
  );
}, propsComparison);

function propsComparison(prevProps, nextProps) {
  return JSON.stringify(prevProps) === JSON.stringify(nextProps);
}

const Curves = memo(
  ({ batterMoments, coef, currentMoment }) => (
    <>
      {batterMoments.map((moment, i) => {
        return (
          <CurveAndPoints key={moment.inner.id} moment={moment} coef={coef} currentMoment={currentMoment} />
        );
        // return <CurveAndPoints key={'curve-points-' + i} data3D={data3D} coef={coef} />;
      })}
    </>
  ),
  propsComparison
);

const TouchPoints = ({ data, coef }) => (
  <>
    {data
      // .slice(0, curveCount)
      .filter(coords => coords[3] === 1)
      .map((coord, i) => (
        <mesh key={i} position={[coord[0] * coef - 320 - 70, coord[2] * coef, coord[1] * -coef + 217 + 220]}>
          <sphereGeometry args={[5, 40, 40]} />
          <meshStandardMaterial color={'red'} />
        </mesh>
      ))}
  </>
);

const HittingField = () => {
  const [isAutoRotate, setAutoRotate] = useState(true);
  // const [curveCount, setCurveCount] = useState(null);
  const [isCameraView, setCameraView] = useState(false);

  const { innings, currentCard, currentMoment } = useSelector(state => state.game);

  const { hit } = currentMoment.metering || {};
  const { data_3d, camera_2d: camera2D } = hit || 0;

  const textureRef = useMemo(() => new TextureLoader().load(FieldBg), []);

  const controlsRef = useRef();

  // useLayoutEffect(() => {
  //   if (isCameraView) return;

  //   setCurveCount(0);

  //   if (!data_3d) return;

  //   setTimeout(() => {
  //     setCurveCount(1);
  //   }, 150);
  // }, [data_3d, isCameraView]);

  // useEffect(() => {
  //   if (!data_3d || curveCount === 0) return;

  //   const length = data_3d.length;

  //   let timeout;

  //   if (curveCount < length) {
  //     timeout = setTimeout(() => {
  //       setCurveCount(prev => prev + 1);
  //     }, 3);
  //   }

  //   return () => {
  //     clearTimeout(timeout);
  //   };
  // }, [curveCount]);

  const handleAutoRotateClick = () => setAutoRotate(prev => !prev);
  const handleResetClick = () => controlsRef.current.reset();

  // const font = new FontLoader().parse(ComfortaaFont)

  const coef = 925 / 90;

  const batterCards = useMemo(
    () =>
      innings.reduce((sum, inning, i) => {
        inning['bottom/owners']
          ?.filter(card => card.who_id === currentCard.who_id)
          .forEach(card => {
            sum.push(card);
          });
        inning['top/guests']
          ?.filter(card => card.who_id === currentCard.who_id)
          .forEach(card => {
            sum.push(card);
          });

        return sum;
      }, []),
    [innings, currentCard]
  );

  const batterMoments = useMemo(
    () =>
      batterCards.reduce((sum, card) => {
        card.moments
          .filter(
            moment => moment.metering?.hit?.data_3d
            // && moment.inner.id !== currentMoment.inner?.id
          )
          .forEach(moment => sum.push(moment));

        return sum;
      }, []),
    [
      batterCards
      // , currentMoment
    ]
  );

  const cameraSwitchBtnHandler = () => setCameraView(prev => !prev);

  // const isCurrentTrajectory =  !!data_3d;
  const isOtherTrajectories = true;
  // const isOtherTrajectories = curveCount > 1;
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

              {/* CurrentMoment trajectory */}
              {/* {isCurrentTrajectory && <CurveAndPoints data3D={data_3d} coef={coef} />} */}
              {/* {isCurrentTrajectory && <Curve data={data_3d} coef={coef} />}
              {isCurrentTrajectory && <TouchPoints data={data_3d} coef={coef} />} */}

              {/* Other trajectories */}
              <Curves batterMoments={batterMoments} coef={coef} currentMoment={currentMoment} />

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

export default memo(HittingField);
