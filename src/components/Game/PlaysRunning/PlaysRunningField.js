import classNames from 'classnames';
import Arrow from 'components/UI/buttons/Arrow/Arrow';
import React, { memo, Suspense, useMemo, useState, useRef, useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cl from './PlaysRunning.module.scss';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { FrontSide, TextureLoader } from 'three';
import { OrbitControls } from '@react-three/drei';
import FieldBg from 'images/field_right.jpg';
import ArrowDown from 'components/UI/icons/ArrowDown';
import ComfortaaFont from 'fonts/Comfortaa_Regular.json';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { getChartColor } from 'utils';

extend({ TextGeometry });

const BallPaths = ({ field }) => {
  const ballPaths = field.reduce((sum, { data_2d: data2d }) => {
    let ballPath = '';
    ballPath += `M${data2d[0][0]} ${data2d[0][1]}`;
    data2d.slice(1).forEach(coord => (ballPath += `L${coord[0]} ${coord[1]}`));
    sum.push(ballPath);

    return sum;
  }, []);

  return (
    <>
      {ballPaths.map((path, i) => (
        <path
          key={i}
          d={path}
          stroke='red'
          strokeWidth='25'
          strokeLinejoin='round'
          strokeLinecap='round'
          strokeDasharray='1 35'
        />
      ))}
    </>
  );
};

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

const Line = ({ runData, xStartPos, yStartPos, coef, count, lineNumber, curLineNumber }) => {
  const textRef = useRef();

  useFrame(({ camera }) => {
    if (textRef.current) textRef.current.quaternion.copy(camera.quaternion);
  });

  const curDataSlice =
    curLineNumber < lineNumber ? 0 : curLineNumber === lineNumber ? count : runData.data_3d.length;

  const font = new FontLoader().parse(ComfortaaFont);

  let lastCoords;

  const renderedPart = runData.data_3d.slice(0, curDataSlice);
  const runnerName = String(runData.who);

  if (curDataSlice !== 0) {
    lastCoords = renderedPart[renderedPart.length - 1];
  }

  const isRender = curDataSlice > 0;
  return (
    <>
      {isRender ? (
        <>
          {renderedPart.map((coord, i) => (
            <mesh
              key={i}
              position={[xStartPos + coord[0] * coef, 1, yStartPos - coord[1] * coef]}
              rotation={[-Math.PI / 2, 0, 0]}
              receiveShadow={true}>
              <planeGeometry args={[10, 10]} />
              <meshStandardMaterial color={getChartColor(+runnerName+1)} toneMapped={false} shadowSide={FrontSide} />
            </mesh>
          ))}
          <mesh
            position={[xStartPos + lastCoords[0] * coef, 20, yStartPos - lastCoords[1] * coef]}
            ref={textRef}>
            <textGeometry args={[runnerName, { font, size: 30, height: 2 }]} />
            <meshBasicMaterial color={'#1A4C96'} toneMapped={false} />
          </mesh>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

const Lines = ({ field, xStartPos, yStartPos, coef, currentMoment }) => {
  const [count, setCount] = useState(null);
  const [curLineNumber, setLineNumber] = useState(0);

  const timeoutRef = useRef();

  const uniqueField = field.reduce((sum, cur) => {
    const tempData3D = cur.data_3d.filter((pair, i) => !(i % 10));

    sum.push({ ...cur, data_3d: tempData3D });

    return sum;
  }, []);

  const widerField = uniqueField.reduce((sum, cur) => {
    const tempData3D = cur.data_3d.slice(1).reduce(
      (innerSum, curPair, i) => {
        const lastX = innerSum[innerSum.length - 1][0];
        const lastY = innerSum[innerSum.length - 1][1];
        const deltaX = curPair[0] - lastX;
        const deltaY = curPair[1] - lastY;
        const multiplyBy = 8;
        const avgX = deltaX / multiplyBy;
        const avgY = deltaY / multiplyBy;

        for (let i = 1; i <= multiplyBy; i++) {
          innerSum.push([lastX + avgX * i, lastY + avgY * i]);
        }

        return innerSum;
      },
      [cur.data_3d[0]]
    );

    sum.push({ ...cur, data_3d: tempData3D });

    return sum;
  }, []);

  useEffect(() => {
    setCount(0);

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  useLayoutEffect(() => {
    clearTimeout(timeoutRef.current);

    if (count === null || widerField.length === 0) return;

    setCount(0);
    setLineNumber(0);
  }, [currentMoment]);

  useEffect(() => {
    if (count === null) return;

    timeoutRef.current = setTimeout(() => {
      if (widerField[curLineNumber].data_3d.length > count) {
        setCount(prev => prev + 7);
        return;
      }

      if (curLineNumber + 1 < field.length) {
        setCount(0);
        setLineNumber(prev => prev + 1);
      }
    }, 5);
  }, [count]);

  // const points = newCoords.slice(5).reduce((sum, coord) => {
  //   const tempCoord = new Vector3(xStartPos + coord[0] * coef, -1, yStartPos - coord[1] * coef);
  //   sum.push(tempCoord);

  //   return sum;
  // }, []);

  // const newCoord1 = new Vector3(0, 0, 0);
  // const newCoord2 = new Vector3(0, 100, -100);
  // const newCoord3 = new Vector3(-1, 100, 100);
  // const newCoord3 = new Vector3(100, -100, 0);

  // const newCoord = new THREE.Vector3(-320, coord[2] * 5, 217);
  // const newCoord = new THREE.Vector3(coord[0]-325, coord[2] * 20, (coord[1] - 1490) / 3 + 150);
  // const newCoord = new THREE.Vector3(coord[0] / 3.5 - 450, coord[2] * 20, (coord[1] - 1490) / 3 + 150);
  // const linePoints = [newCoord, newCoord2, newCoord3];

  // const curveCoords = new LineCurve3(newCoord1, newCoord2);
  // const curveCoords = new CatmullRomCurve3(points, false, 'catmullrom', 0);
  // chordal and catmullrom.
  return (
    <>
      {widerField.map((runData, j) => (
        <Line
          key={j}
          runData={runData}
          xStartPos={xStartPos}
          yStartPos={yStartPos}
          coef={coef}
          count={count}
          lineNumber={j}
          curLineNumber={curLineNumber}
        />
      ))}
    </>
    // <line
    //   // rotation={[0, 0, -Math.PI / 2]}
    //   strokeLinecap='round'
    //   strokeLinejoin='round'

    //   rotation={[0, 0, -Math.PI / 2]}
    // >
    //   <tubeGeometry args={[curveCoords, 512, 20, 2, false]}/>

    //   {/* <bufferGeometry /> */}
    //   <lineBasicMaterial color='red' lineWidth={5} />
    // </line>
  );
};

const PlaysRunningField = ({ field, setRunningMode }) => {
  const [isAutoRotate, setAutoRotate] = useState(false);
  const [zoomCoef, setZoomCoef] = useState(1);

  const currentMoment = useSelector(state => state.game.currentMoment);
  const dispatch = useDispatch();

  const controlsRef = useRef();
  const wrapperRef = useRef();

  useEffect(() => {
    const xCoef = wrapperRef.current.clientWidth / 568.72;
    const yCoef = wrapperRef.current.clientHeight / 497.81;
    const resultCoef = Math.min(xCoef, yCoef);

    setZoomCoef(resultCoef);
  }, []);

  const handleResetClick = () => controlsRef.current.reset();
  const handleAutoRotateClick = () => setAutoRotate(prev => !prev);

  const textureRef = useMemo(() => new TextureLoader().load(FieldBg), []);

  const xStartPos = -389;
  const yStartPos = 388;

  const coef = 925 / 90;

  return (
    <div className={cl.fieldWrapper} ref={wrapperRef}>
      {/* <svg className={cl.field} viewBox='0 0 2560 2560' fill='none' preserveAspectRatio='none'> */}
      {/* {isBallPaths && <BallPaths field={field} />} */}
      {/* </svg> */}
      <Canvas
        className={cl.canvas}
        camera={{ position: [0, 1000, 0], far: 3000, zoom: 0.45 * zoomCoef }}
        shadows={true}
        orthographic={true}>
        <Suspense fallback={null}>
          <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow={true}>
            <planeGeometry args={[1280, 1090]} />
            <meshStandardMaterial map={textureRef} toneMapped={false} shadowSide={FrontSide} />
          </mesh>
          {field && (
            <Lines
              field={field}
              xStartPos={xStartPos}
              yStartPos={yStartPos}
              coef={coef}
              currentMoment={currentMoment}
            />
          )}

          <spotLight position={[0, 499.9, 0]} intensity={0.4} castShadow={true} />
          <ambientLight intensity={0.8} />

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
      <div className={cl.rightArrowWrapper}>
        <Arrow direction='right' onClick={() => setRunningMode('Info')} />
      </div>
    </div>
  );
};

export default memo(PlaysRunningField);
