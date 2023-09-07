import React, { Suspense, useMemo, useState, useRef, useLayoutEffect, memo, lazy } from 'react';
import cl from './HittingField.module.scss';
import { Canvas, useFrame } from '@react-three/fiber';
import { CatmullRomCurve3, FrontSide, TextureLoader } from 'three';
import { OrbitControls } from '@react-three/drei';
import FieldBg from 'images/field_right.jpg';
import classNames from 'classnames';
import * as THREE from 'three';
import ArrowDown from 'components/UI/icons/ArrowDown';
import CameraIcon from 'images/video_camera_icon.png';
import FieldIcon from 'images/field_icon.png';
import CameraView from './CameraView';
import { shallowEqual, useSelector } from 'react-redux';
import useSetMomentById from 'hooks/useSetMomentById';
import Tooltip from './Tooltip';
// import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
// import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
// import ComfortaaFont from 'fonts/Comfortaa_Regular.json';
const Model = lazy(() => import('models/Stadium'));

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

const Curve = ({
  moment,
  coef,
  setDrawPoints,
  currentMoment,
  setMomentById,
  handlePointerOver,
  handlePointerOut
}) => {
  const { data_3d: data } = moment?.metering?.hit;

  const [pointerOver, setPointerOver] = useState(false);

  const cashedStepTotal = useRef(0);
  const tubeRef = useRef(null);
  const textRef = useRef(null);

  let stepTotalRef = cashedStepTotal.current;

  useLayoutEffect(() => {
    setDrawPoints(false);

    stepTotalRef = 0;
    cashedStepTotal.current = 0;
  }, [data]);

  const points = data.reduce((sum, coord) => {
    const newCoord = new THREE.Vector3(coord[0] * coef - 320, coord[2] * coef, coord[1] * -coef + 217);

    sum.push(newCoord);
    return sum;
  }, []);

  const curveCoords = new CatmullRomCurve3(points);

  // const textureRef = useMemo(() => new TextureLoader().load(CurveTexture), []);

  useFrame(({ camera }) => {
    if (textRef.current) {
      textRef.current.quaternion.copy(camera.quaternion);
      textRef.current.geometry.center();
    }

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

  const handleMeshClick = () => setMomentById(moment.inner.id);

  // const font = new FontLoader().parse(ComfortaaFont);
  // const textCoords = data[Math.floor(data.length / 2)];

  const distanceText = `Angle: ${String(Math.round(moment.metering.hit.angle))}° Velocity: ${String(
    Math.round(moment.metering.hit.start_speed)
  )} mph 
Distance: ${String(Math.round(moment.metering.hit.distance))} m.`;
  return (
    <>
      <mesh position={[-70, 0, 220]} castShadow>
        <tubeGeometry args={[curveCoords, 70, !pointerOver ? 3 : 4, 50, false]} ref={tubeRef} />
        <meshPhongMaterial color={isCurrentTube ? 'blue' : '#0099E6'} side={FrontSide} />
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
        <tubeGeometry args={[curveCoords, 70, 12, 50, false]} />
        <meshPhongMaterial transparent opacity='0' />
      </mesh>
      {/* {hovered && (
        <mesh
          position={[textCoords[0] * coef - 390, textCoords[2] * coef + 77, textCoords[1] * -coef + 450]}
          ref={textRef}>
          <textGeometry args={[distanceText, { font, size: 22, height: 2 }]} />
          <meshBasicMaterial color='blue' toneMapped={false} />
        </mesh>
      )} */}
    </>
  );
};

const CurveAndPoints = memo(
  ({ moment, coef, currentMoment, setMomentById, handlePointerOver, handlePointerOut }) => {
    const [drawPoints, setDrawPoints] = useState(false);
    const { data_3d: data3D } = moment?.metering?.hit;

    return (
      <>
        <Curve
          moment={moment}
          coef={coef}
          setDrawPoints={setDrawPoints}
          currentMoment={currentMoment}
          setMomentById={setMomentById}
          handlePointerOver={handlePointerOver}
          handlePointerOut={handlePointerOut}
        />
        {drawPoints && <TouchPoints data={data3D} coef={coef} />}
      </>
    );
  },
  propsComparison
);

function propsComparison(prevProps, nextProps) {
  return JSON.stringify(prevProps) === JSON.stringify(nextProps);
}

const Curves = memo(
  ({ batterMoments, coef, currentMoment, setMomentById, handlePointerOver, handlePointerOut }) => {
    return (
      <>
        {batterMoments.map(moment => {
          return (
            <CurveAndPoints
              key={moment.inner.id}
              moment={moment}
              coef={coef}
              currentMoment={currentMoment}
              setMomentById={setMomentById}
              handlePointerOver={handlePointerOver}
              handlePointerOut={handlePointerOut}
            />
          );
        })}
      </>
    );
  },
  propsComparison
);

const TouchPoints = ({ data, coef }) => (
  <>
    {data
      .filter(coords => coords[3] === 1)
      .map((coord, i) => (
        <mesh key={i} position={[coord[0] * coef - 320 - 70, coord[2] * coef, coord[1] * -coef + 217 + 220]}>
          <sphereGeometry args={[5, 40, 40]} />
          <meshStandardMaterial color={'red'} />
        </mesh>
      ))}
  </>
);

const HittingField = ({ handleOnReady, isInterruptedMoment }) => {
  const [isAutoRotate, setAutoRotate] = useState(true);
  const [isCameraView, setCameraView] = useState(false);
  const [hovered, setHovered] = useState({ isHovered: false, text: '' });

  const innings = useSelector(state => state.game.innings, shallowEqual);
  const currentCard = useSelector(state => state.game.currentCard, shallowEqual);
  const currentMoment = useSelector(state => state.game.currentMoment, shallowEqual);
  const hitState = useSelector(state => state.game.hitState);
  const isBroadcast = useSelector(state => state.game.isBroadcast);

  const { hit } = currentMoment.metering || {};
  const { camera_2d: camera2D } = hit || 0;

  const textureRef = useMemo(() => new TextureLoader().load(FieldBg), []);

  const controlsRef = useRef();
  const pointerTimeout = useRef(null);

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

  const handlePointerOverCurve = text => {
    clearTimeout(pointerTimeout.current);

    setHovered({ isHovered: true, text });

    document.body.style.cursor = 'pointer';
  };

  const handlePointerOutCurve = text => {
    clearTimeout(pointerTimeout.current);

    pointerTimeout.current = setTimeout(() => {
      setHovered({ isHovered: false, text });
    }, 4000);

    document.body.style.cursor = 'auto';
  };

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
        card.moments.filter(moment => moment.metering?.hit?.data_3d).forEach(moment => sum.push(moment));

        return sum;
      }, []),
    [batterCards]
  );

  const cameraSwitchBtnHandler = () => setCameraView(prev => !prev);

  const btnIcon = isCameraView ? FieldIcon : CameraIcon;
  const isBtnIcon = camera2D !== null && currentMoment.video && !isBroadcast && !isInterruptedMoment;

  const setMomentById = useSetMomentById();

  const wrapperClasses = classNames(cl.field, {
    [cl.dnone]: hitState !== 'Field'
  });
  return (
    <div className={wrapperClasses}>
      {(!isCameraView || camera2D === null || isInterruptedMoment) && (
        <>
          <Canvas
            className={cl.canvas}
            camera={{ position: [0, 700, 1000], far: 3000, zoom: 0.34 }}
            shadows={true}
            shadowMap
            orthographic={true}>
            <Suspense fallback={null}>
              {/* <mesh position={[0, 0, 50]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow={true}>
                <planeGeometry args={[1280, 1090]} />
                <meshStandardMaterial map={textureRef} toneMapped={false} shadowSide={THREE.DoubleSide} />
              </mesh> */}
              {/* <Model
                position={[-96, 105, 65]}
                rotation={[0, -Math.PI / 9.5, 0]}
                scale={[10.84, 10.84, 10.84]}
                transparency={0.2}
              /> */}
              <Model
                position={[-270, 72, 385]}
                rotation={[0, -Math.PI / 9.5, 0]}
                scale={[10.84, 10.84, 10.84]}
                transparency={0.2}
              />

              {/* Other trajectories */}
              <Curves
                batterMoments={batterMoments}
                coef={coef}
                currentMoment={currentMoment}
                setMomentById={setMomentById}
                handlePointerOver={handlePointerOverCurve}
                handlePointerOut={handlePointerOutCurve}
              />

              <directionalLight
                position={[0, 400, 0]}
                intensity={1}
                castShadow
                shadow-camera-left={-640}
                shadow-camera-right={640}
                shadow-camera-top={640}
                shadow-camera-bottom={-640}
              />
              <ambientLight intensity={0.7} />

              <OrbitControls
                enableZoom={true}
                autoRotate={isAutoRotate}
                minPolarAngle={Math.PI / 10}
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
          {hovered.isHovered && <Tooltip text={hovered.text} />}
        </>
      )}
      {!isBroadcast && !isInterruptedMoment && (
        <CameraView
          camera2D={camera2D}
          handleOnReady={handleOnReady}
          isVisible={isCameraView && camera2D !== null && currentMoment.video}
        />
      )}
      {/* {isCameraView && camera2D !== null && <CameraView camera2D={camera2D} handleOnReady={handleOnReady} />} */}
      {isBtnIcon && (
        <button className={cl.cameraSwitchBtn} onClick={cameraSwitchBtnHandler}>
          <img src={btnIcon} alt='camera' />
        </button>
      )}
    </div>
  );
};

export default memo(HittingField);
