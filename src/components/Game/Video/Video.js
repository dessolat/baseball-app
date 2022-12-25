import React, { useRef, useState, useEffect } from 'react';
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

const Video = ({ videoId, videoNumber, handleOnReady, stateChangeHandler, setPlayPause }) => {
  const [currentTime, setCurrentTime] = useState(0);

  const wrapperRef = useRef();
  const timerRef = useRef();
  const controlsWrapperRef = useRef();
  const currentTimeInterval = useRef();

  const currentCard = useSelector(state => state.game.currentCard);
  const currentMoment = useSelector(state => state.game.currentMoment);
  const viewMode = useSelector(state => state.game.viewMode);

  useEffect(() => () => clearInterval(currentTimeInterval.current), []);

  const onReady = e => {
    handleOnReady(videoNumber, e.target);

    currentTimeInterval.current = setInterval(() => {
      setCurrentTime(e.target.getCurrentTime().toFixed(2));
    }, 20);
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

    controlsWrapperRef.current.firstChild.style.opacity = 1;
    controlsWrapperRef.current.firstChild.style.visibility = 'visible';

    timerRef.current = setTimeout(() => {
      if (!controlsWrapperRef.current) return;
      controlsWrapperRef.current.firstChild.style.opacity = 0;
      timerRef.current = setTimeout(() => {
        if (controlsWrapperRef.current) controlsWrapperRef.current.firstChild.style.visibility = 'hidden';
      }, 300);
    }, 500);
  }

  return (
    <div className={videoClasses} ref={wrapperRef}>
      {Object.keys(currentCard).length !== 0 ? (
        <div className={cl.wrapper}>
          <YouTube
            videoId={videoId}
            // videoId={'ZTsgKIKW8GE'}
            // videoId={'WCjLd7QAJq8'}
            onReady={onReady}
            onStateChange={onStateChange}
            opts={{
              height: '100%',
              width: '100%',
              playerVars: {
                autoplay: 0,
                controls: 1,
                modestbranding: 1,
                disablekb: 1
                // loop: 1,
                // playlist: '-GR52czEd-0'
              }
            }}
          />
          {/* <span style={{position: 'absolute', left: 30, top: 30, color: 'white', fontWeight: 600}}>{currentMoment.video?.seconds_from.toFixed(2)}</span> */}
          <span
            style={{
              position: 'absolute',
              left: '50%',
              top: 30,
              transform: 'translateX(-50%)',
              color: 'white',
              fontWeight: 600
            }}>
            {currentTime}
          </span>
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
