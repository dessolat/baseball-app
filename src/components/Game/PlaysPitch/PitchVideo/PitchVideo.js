import React, { useRef, useEffect } from 'react';
import cl from './PitchVideo.module.scss';
import classNames from 'classnames';
import YouTube from 'react-youtube';
import { useDispatch, useSelector } from 'react-redux';
import NoVideoScreen from 'components/Game/Video/NoVideoScreen';
import VideoControls from 'components/Game/VideoControls/VideoControls';

const POS_OPTIONS = {
  'top-left': { x: -0.34, y: -0.22, delta: 0.14 },
  // 'top-left': { x: -0.34, y: -0.2, delta: 0.14 },
  'top-right': { x: -0.505, y: -0.225, delta: 0.14 },
  // 'top-right': { x: -0.505, y: -0.205, delta: 0.14 },
  bottom: { x: -0.27, y: -0.14, delta: 0.42 }
  // bottom: { x: -0.27, y: -0.07, delta: 0.42 }
};

const PitchVideo = ({ videoId, position, handleOnReady, stateChangeHandler, setPlayPause = null }) => {
  // const [currentTime, setCurrentTime] = useState(0);

  // eslint-disable-next-line
  const fullWidth = useSelector(state => state.shared.mobileWidth);
  const currentMoment = useSelector(state => state.game.currentMoment);
  const pitchState = useSelector(state => state.game.pitchState);

  const videoWrapperRef = useRef(null);
  const timerRef = useRef();
  const controlsWrapperRef = useRef();
  const currentTimeInterval = useRef();

  useEffect(
    () => () => {
      clearTimeout(timerRef.current);
      clearInterval(currentTimeInterval.current);
    },
    []
  );

  const videoClasses = classNames(cl.video, {
    [cl.topLeftVideo]: position === 'top-left',
    [cl.topRightVideo]: position === 'top-right',
    [cl.bottomVideo]: position === 'bottom',
    [cl.dnone]: pitchState !== 'Videos'
  });

  const xCoef =
    (videoWrapperRef?.current?.clientWidth ?? 0) / ((1920 / 100) * (POS_OPTIONS[position].delta * 100));

  const onReady = e => {
    handleOnReady(position, e.target);
  };

  const onStateChange = e => {
    stateChangeHandler(position, e.target, e.data);
  };

  function handleMouseMove() {
    if (!currentMoment.video || position !== 'bottom') return;

    clearTimeout(timerRef.current);

    controlsWrapperRef.current.lastChild.style.opacity = 1;
    controlsWrapperRef.current.lastChild.style.visibility = 'visible';

    timerRef.current = setTimeout(() => {
      if (!controlsWrapperRef.current) return;
      controlsWrapperRef.current.lastChild.style.opacity = 0;
      timerRef.current = setTimeout(() => {
        controlsWrapperRef.current.lastChild.style.visibility = 'hidden';
      }, 300);
    }, 500);
  }

  const isVideoControls = currentMoment.video && position === 'bottom';
  const isInvisWrapper = position !== 'bottom';
  return (
    <div
      className={videoClasses}
      onMouseMove={handleMouseMove}
      onClick={handleMouseMove}
      ref={videoWrapperRef}>
      <div
        style={{
          position: 'absolute',
          width: 1920 * xCoef,
          height: 1080 * xCoef,
          left: POS_OPTIONS[position].x * 1920 * xCoef,
          top: POS_OPTIONS[position].y * 1080 * xCoef
        }}>
        <YouTube
          videoId={videoId}
          // videoId={'WCjLd7QAJq8'}
          onReady={onReady}
          onStateChange={onStateChange}
          // onPlaybackRateChange={onPlaybackRateChange}
          // onPlaybackQualityChange={playbackQualityHandle}
          containerClassName={cl.YTContainer}
          opts={{
            width: '100%',
            height: '100%',
            playerVars: {
              autoplay: 0,
              controls: 0,
              modestbranding: 1,
              disablekb: 1
              // loop: 1,
              // playlist: '-GR52czEd-0'
            }
          }}
        />
      </div>
      {isVideoControls && (
        <VideoControls
          setPlayPause={setPlayPause}
          fullscreenAvailable={false}
          ref={controlsWrapperRef}
        />
      )}
      {/* <div
        style={{
          position: 'absolute',
          left: 15,
          top: 15,
          padding: '3px 8px',
          background: 'black',
          color: 'white',
          fontWeight: 700,
          fontSize: '.8rem'
        }}>
        {currentQuality}
      </div> */}
      {/* <div
        style={{
          position: 'absolute',
          right: 15,
          top: 15,
          padding: '3px 8px',
          background: 'black',
          color: 'white',
          fontWeight: 700,
          fontSize: '.8rem'
        }}>
        {currentTime}
      </div> */}
      {isInvisWrapper && <div style={{ position: 'absolute', inset: 0 }}></div>}
      {!currentMoment.video && <NoVideoScreen />}
    </div>
  );
  // return <img className={videoClasses} src={PICTURES[position]} alt='video-1' />;
};

export default PitchVideo;
