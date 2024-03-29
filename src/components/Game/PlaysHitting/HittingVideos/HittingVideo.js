import React, { useRef, useEffect } from 'react';
import cl from './HittingVideo.module.scss';
import classNames from 'classnames';
import YouTube from 'react-youtube';
import { useSelector } from 'react-redux';
import NoVideoScreen from 'components/Game/Video/NoVideoScreen';

const HittingVideo = ({ videoId, position, handleOnReady, stateChangeHandler}) => {
  // eslint-disable-next-line
  const fullWidth = useSelector(state => state.shared.mobileWidth);
  const currentMoment = useSelector(state => state.game.currentMoment);

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
    [cl.bottomLeftVideo]: position === 'bottom-left',
    [cl.bottomRightVideo]: position === 'bottom-right'
  });

  const { batter_position: batterPosition } = currentMoment.metering?.pitch || {};

  const POS_OPTIONS = {
    'top-left':
      batterPosition === 0 ? { x: -0.09, y: -0.5, delta: 0.24 } : { x: -0.65, y: -0.52, delta: 0.24 },
    'top-right':
      batterPosition === 0 ? { x: -0.5833, y: -0.5, delta: 0.24 } : { x: -0.2, y: -0.5, delta: 0.24 },
    'bottom-left':
      batterPosition === 0 ? { x: -0.22, y: -0.01, delta: 0.52 } : { x: -0.15, y: -0.01, delta: 0.52 },
    'bottom-right':
      batterPosition === 0 ? { x: -0.1, y: -0.01, delta: 0.52 } : { x: -0.22, y: -0.01, delta: 0.52 }
  };

  const xCoef = videoWrapperRef?.current?.clientWidth / ((1920 / 100) * (POS_OPTIONS[position].delta * 100));

  const onReady = e => {
    handleOnReady(position, e.target);
  };

  const onStateChange = e => {
    stateChangeHandler(position, e.target, e.data);
  };

  function handleMouseMove() {
    if (!currentMoment.video || position !== 'bottom') return;

    clearTimeout(timerRef.current);

    controlsWrapperRef.current.firstChild.style.opacity = 1;
    controlsWrapperRef.current.firstChild.style.visibility = 'visible';

    timerRef.current = setTimeout(() => {
      if (!controlsWrapperRef.current) return;
      controlsWrapperRef.current.firstChild.style.opacity = 0;
      timerRef.current = setTimeout(() => {
        controlsWrapperRef.current.firstChild.style.visibility = 'hidden';
      }, 300);
    }, 500);
  }

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
      {!currentMoment.video && <NoVideoScreen />}
    </div>
  );
};

export default HittingVideo;
