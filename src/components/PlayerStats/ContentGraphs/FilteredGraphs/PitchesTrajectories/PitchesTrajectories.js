import classNames from 'classnames';
import React, { memo, Suspense, useMemo, useState, useRef, useEffect, forwardRef } from 'react';
import { useSelector } from 'react-redux';
import cl from './PitchesTrajectories.module.scss';
import { Canvas } from '@react-three/fiber';
import { FrontSide, TextureLoader } from 'three';
import { OrbitControls } from '@react-three/drei';
import FieldBg from 'images/field_right.jpg';
import ArrowDown from 'components/UI/icons/ArrowDown';
import Curves from './Curves/Curves';

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

const PitchesTrajectories = ({ data }) => {
  const [isAutoRotate, setAutoRotate] = useState(false);
  const [zoomCoef, setZoomCoef] = useState(1);
  const [isGraphVisible, setGraphVisibility] = useState(false);

  const graphRef = useRef();

  useEffect(() => {
    let options = {
      root: null,
      rootMargin: '300px 0px',
      threshold: 0
    };

    let observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const { isIntersecting } = entry;

        if (isIntersecting) {
          setGraphVisibility(true);
        } else {
          setGraphVisibility(false);
        }
      });
    }, options);
    observer.observe(graphRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  const currentMoment = useSelector(state => state.game.currentMoment);

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

  const hitsData = data.filter(({ hit_info }) => hit_info.data_3d !== null);
  return (
    <div className={cl.fieldWrapper} ref={wrapperRef}>
      <Canvas
        className={cl.canvas}
        ref={graphRef}
        camera={{ position: [350, 1000, 1500], far: 3000, zoom: 0.45 * zoomCoef }}
        shadows={true}
        orthographic={true}>
        {isGraphVisible && (
          <Suspense fallback={null}>
            <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow={true}>
              <planeGeometry args={[1280, 1090]} />
              <meshStandardMaterial map={textureRef} toneMapped={false} shadowSide={FrontSide} />
            </mesh>

            <Curves hitsData={hitsData} />

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
        )}
      </Canvas>

      <OptionsBar
        isAutoRotate={isAutoRotate}
        handleAutoRotateClick={handleAutoRotateClick}
        handleResetClick={handleResetClick}
      />
    </div>
  );
};

export default memo(PitchesTrajectories);
