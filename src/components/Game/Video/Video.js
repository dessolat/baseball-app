import React, { useRef, useState, useEffect, Suspense, Fragment } from 'react';
import cl from './Video.module.scss';
import YouTube from 'react-youtube';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import NoVideoScreen from './NoVideoScreen';
import FullscreenBtn from 'components/UI/icons/VideoControlsBtns/FullscreenBtn/FullscreenBtn';
import { openFullscreen } from 'utils';
import VideoControls from '../VideoControls/VideoControls';
import SidePanel from './SidePanel';
import BottomPanel from './BottomPanel';
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
// import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
// import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
// import ComfortaaFont from 'fonts/Comfortaa_Regular.json';
// import { Quaternion, Vector3 } from 'three';
import { degToRad } from 'three/src/math/MathUtils';

const BatPath = ({ currentMoment, videoCurrentTime }) => {
  // const { camera } = useThree();

  // camera.lookAt(-5.39615, 8.88691, 0);
	// camera.rotation.z = degToRad(3.077909001)

  const { data_3d: batCoords, speeds } = currentMoment?.metering?.bat || {};
  // const { time_start: timeStart } = currentMoment?.metering?.hit || {};

  const curTimeCorr = videoCurrentTime;
  // const curTimeCorr = videoCurrentTime + 0.286;

  const timeStart = speeds[0][1];

  const totalHitTime = speeds[speeds.length - 1][1] - timeStart;
  // const totalHitTime = speeds[speeds.length - 1][1];

  const elapsedTime =
    curTimeCorr < timeStart ||
    videoCurrentTime > currentMoment.video.full_seconds_to ||
    videoCurrentTime < currentMoment.video.full_seconds_from
      ? 0
      : curTimeCorr - timeStart;
  const coordsLength = batCoords.length;

  const sliceCoef = totalHitTime / coordsLength;
  const sliceCount = elapsedTime / sliceCoef;

  // const textRef = useRef(null);

  // const { camera } = useThree();
  // camera.aspect = 1.77777
  // camera.lookAt(-80, 0, 0);
  // useFrame(() => {
  //   if (textRef.current === null) return;
  //   let zPosition = textRef.current.position.z;
  //   textRef.current.position.z = zPosition < 100 ? zPosition + 1 : -140;
  // });

  // extend({ TextGeometry });
  // const font = new FontLoader().parse(ComfortaaFont);

  const dotRadius = 0.04;

  // const xCorrect = 0;
  // const zCorrect = 0;
  const xCorrect = 1;       
  const zCorrect = -0.5;    

  const getDistance = (coords, prevCoords) =>
    Math.sqrt(
      (coords[3] - prevCoords[3]) ** 2 + (coords[4] - prevCoords[4]) ** 2 + (coords[5] - prevCoords[5]) ** 2
    );

  const firstDistance = getDistance(batCoords[1], batCoords[0]);
  const defaultMinMaxDistance = { min: firstDistance, max: firstDistance };

  const minMaxDistance = batCoords.reduce((sum, cur, i) => {
    if (i < 2) return sum;

    const curDistance = getDistance(cur, batCoords[i - 1]);

    if (curDistance < sum.min) {
      sum.min = curDistance;
      return sum;
    }

    if (curDistance > sum.max) {
      sum.max = curDistance;
      return sum;
    }

    return sum;
  }, defaultMinMaxDistance);

  const minOpacity = 0.3;
  const maxOpacity = 1;

  const opacityCoef = (maxOpacity - minOpacity) / (minMaxDistance.max - minMaxDistance.min);
  return (
    <>
      {sliceCount &&
        batCoords.slice(0, sliceCount).map((coords, i, arr) => {
          const curOpacity = i > 0 ? minOpacity + getDistance(coords, arr[i - 1]) * opacityCoef : minOpacity;

          return (
            <Fragment key={i}>
              <mesh position={[coords[0] + xCorrect, coords[1], coords[2] + zCorrect]}>
                <sphereGeometry args={[dotRadius, 20, 20]} />
                <meshStandardMaterial
                  color={'#1A4C96'}
                  toneMapped={false}
                  transparent={true}
                  opacity={curOpacity}
                />
              </mesh>
              <mesh position={[coords[3] + xCorrect, coords[4], coords[5] + zCorrect]}>
                <sphereGeometry args={[dotRadius, 20, 20]} />
                <meshStandardMaterial
                  color='red'
                  toneMapped={false}
                  transparent={true}
                  opacity={curOpacity}
                />
              </mesh>
              <mesh position={[coords[6] + xCorrect, coords[7], coords[8] + zCorrect]}>
                <sphereGeometry args={[dotRadius, 20, 20]} />
                <meshStandardMaterial
                  color='yellow'
                  toneMapped={false}
                  transparent={true}
                  opacity={curOpacity}
                />
              </mesh>
            </Fragment>
          );
        })}

      {/* <mesh position={[30, 20, -140]} ref={textRef}>
        <textGeometry args={['Test', { font, size: 30, height: 4 }]} />
        <meshBasicMaterial color={'#1A4C96'} toneMapped={false} />
      </mesh> */}
    </>
  );
};

const ControlSpheres = () => (
  <>
    {/* <mesh position={[1.39615, 8.88691, 0]}> */}
    <mesh position={[5.9516, -11.3477, 2.66897]}>
      <sphereGeometry args={[20, 20, 20]} />
      <meshStandardMaterial color='red' />
    </mesh>
    <mesh position={[7.82522, -10.1832, 2.69391]}>
      <sphereGeometry args={[20, 20, 20]} />
      <meshStandardMaterial color='red' />
    </mesh>
    <mesh position={[7.88406, -10.277, 1.44497]}>
      <sphereGeometry args={[20, 20, 20]} />
      <meshStandardMaterial color='red' />
    </mesh>
    <mesh position={[6.00743, -11.4398, 1.46124]}>
      <sphereGeometry args={[20, 20, 20]} />
      <meshStandardMaterial color='red' />
    </mesh>
  </>
);

const CanvasWrapper = ({ currentMoment }) => {
  const videoCurrentTime = useSelector(state => state.game.videoCurrentTime);

  return (
    <Canvas
      camera={{
        position: [12.12522834, -19.15615498, 2.94535569],
        // fov: 7.3189,
        aspect: 1.77777,
        // fov: 7.3189,
        // rotation: [degToRad(84.05143912), 0,0],
        // rotation: [0, 0, degToRad(3.077909001)],
        rotation: [degToRad(84.05143912), degToRad(30.70764465), degToRad(3.077909001)],
        fov: 7.3189 / 1.5,
      }}
      style={{
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        position: 'absolute',
        pointerEvents: 'none'
      }}>
      <Suspense fallback={null}>
        <BatPath currentMoment={currentMoment} videoCurrentTime={videoCurrentTime} />
        <ControlSpheres />
        <spotLight position={[100, 80, 50]} />
        <ambientLight intensity={0.4} />
      </Suspense>
    </Canvas>
  );
};

const Video = ({ videoId, videoNumber, handleOnReady, stateChangeHandler, setPlayPause }) => {
  // const [currentTime, setCurrentTime] = useState(0);

  const wrapperRef = useRef();
  const timerRef = useRef();
  const controlsWrapperRef = useRef();
  const currentTimeInterval = useRef();

  const currentCard = useSelector(state => state.game.currentCard);
  const currentMoment = useSelector(state => state.game.currentMoment);
  const viewMode = useSelector(state => state.game.viewMode);
  const isVideoEffects = useSelector(state => state.game.isVideoEffects);

  useEffect(() => () => clearInterval(currentTimeInterval.current), []);

  const onReady = e => {
    handleOnReady(videoNumber, e.target);

    // currentTimeInterval.current = setInterval(() => {
    //   setCurrentTime(e.target.getCurrentTime().toFixed(4));
    // }, 20);
  };

  const onStateChange = e => {
    stateChangeHandler(videoNumber, e.target, e.data);
  };

  const openFullScreen = () => {
    openFullscreen(wrapperRef.current);
  };
  // const closeFullScreen = () => {
  //   closeFullscreen();
  // };

  const videoClasses = classNames(cl.videoWrapper, {
    [cl.videoOne]: videoNumber === 1,
    [cl.videoTwo]: videoNumber === 2,
    [cl.videoThree]: videoNumber === 3,
    [cl.videoFour]: videoNumber === 4,
    [cl.aspectRatio16]: (videoNumber === 1 || videoNumber === 2) && viewMode === 'mode-2'
  });

  const fullscreenBtnClasses = classNames(cl.btnWrapper, {
    [cl.dnone]: viewMode.slice(-1) === '1',
    [cl.topLeftBtn]: videoNumber === 1,
    [cl.topRightBtn]: videoNumber === 2,
    [cl.bottomLeftBtn]: videoNumber === 3,
    [cl.bottomRightBtn]: videoNumber === 4
  });

  function handleMouseMove() {
    if (!currentMoment.video) return;

    clearTimeout(timerRef.current);

    controlsWrapperRef.current.lastChild.style.opacity = 1;
    controlsWrapperRef.current.lastChild.style.visibility = 'visible';

    timerRef.current = setTimeout(() => {
      if (!controlsWrapperRef.current) return;
      controlsWrapperRef.current.lastChild.style.opacity = 0;
      timerRef.current = setTimeout(() => {
        if (controlsWrapperRef.current) controlsWrapperRef.current.lastChild.style.visibility = 'hidden';
      }, 300);
    }, 500);
  }

  const isBatPath = videoNumber === 1 && isVideoEffects && currentMoment?.metering?.bat?.data_3d;
  return (
    <div className={videoClasses} ref={wrapperRef}>
      {Object.keys(currentCard).length !== 0 ? (
        <div className={cl.wrapper}>
          <YouTube
            videoId={videoId}
            // videoId={'ZTsgKIKW8GE'}
            onReady={onReady}
            onStateChange={onStateChange}
            opts={{
              height: '100%',
              width: '100%',
              playerVars: {
                autoplay: 0,
                controls: 0,
                modestbranding: 1,
                disablekb: 1
                // loop: 1
              }
            }}
          />
          {isBatPath && <CanvasWrapper currentMoment={currentMoment} />}
          {/* <span style={{position: 'absolute', left: 30, top: 30, color: 'white', fontWeight: 600}}>{currentMoment.video?.seconds_from.toFixed(2)}</span> */}
          {/* <span
            style={{
              position: 'absolute',
              left: '50%',
              top: 30,
              transform: 'translateX(-50%)',
              color: 'white',
              fontWeight: 600
            }}>
            {currentTime}
          </span> */}
          {/* <span style={{position: 'absolute', left: '50%', top: 30, transform: 'translateX(-50%)', color: 'white', fontWeight: 600}}>{videoCurrentTime?.toFixed(2)}</span> */}
          {/* <span style={{position: 'absolute', right: 30, top: 30, color: 'white', fontWeight: 600}}>{currentMoment.video?.seconds_to.toFixed(2)}</span> */}
          <div className={fullscreenBtnClasses} onMouseMove={handleMouseMove} onClick={handleMouseMove}>
            <button onClick={openFullScreen} className={cl.toFullScreen}>
              <FullscreenBtn isOff={true} width={'100%'} height={'100%'} />
            </button>
            {/* <button onClick={closeFullScreen} className={cl.fromFullScreen}>
              <FullscreenBtn isOff={false} width={'100%'} height={'100%'} />
            </button> */}
            <div className={cl.videoControls}>
              <VideoControls
                setPlayPause={setPlayPause}
                fullscreenAvailable={true}
                ref={controlsWrapperRef}
              />
            </div>
          </div>
          {!currentMoment.video && <NoVideoScreen />}
        </div>
      ) : (
        <></>
      )}
      <SidePanel />
      <BottomPanel />
    </div>
  );
};

export default Video;
