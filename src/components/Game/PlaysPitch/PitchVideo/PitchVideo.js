import React, { useRef, useState } from 'react';
import cl from './PitchVideo.module.scss';
import classNames from 'classnames';
import YouTube from 'react-youtube';
import { useSelector } from 'react-redux';
import NoVideoScreen from 'components/Game/Video/NoVideoScreen';

const POS_OPTIONS = {
  'top-left': { x: -0.34, y: -0.20, delta: 0.14 },
  'top-right': { x: -0.505, y: -0.205, delta: 0.14 },
  bottom: { x: -0.31, y: -0.053, delta: 0.42 }
};

const PitchVideo = ({ videoId, position, handleOnReady, stateChangeHandler }) => {
  const [currentQuality, setCurrentQuality] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);

	// eslint-disable-next-line
  const fullWidth = useSelector(state => state.shared.mobileWidth);
  const currentMoment = useSelector(state => state.game.currentMoment);

  const videoWrapperRef = useRef(null);

  const videoClasses = classNames(cl.video, {
    [cl.topLeftVideo]: position === 'top-left',
    [cl.topRightVideo]: position === 'top-right',
    [cl.bottomVideo]: position === 'bottom'
  });

  const xCoef = videoWrapperRef?.current?.clientWidth / ((1920 / 100) * (POS_OPTIONS[position].delta * 100));

	const playbackQualityHandle = e => {
		setCurrentQuality(e.data)
	}

	const onReady = e => {
		handleOnReady(position, e.target)

		setInterval(() => {
			setCurrentTime(e.target.getCurrentTime().toFixed(2))
		}, 20);
	}

	const onStateChange = e => {
    stateChangeHandler(position, e.target, e.data);
  };
  return (
    <div className={videoClasses} ref={videoWrapperRef}>
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
					onPlaybackQualityChange={playbackQualityHandle}
          containerClassName={cl.YTContainer}
          opts={{
            width: '100%',
            height: '100%',
            playerVars: {
              autoplay: 1,
              controls: 0,
              modestbranding: 1,
              disablekb: 1
              // loop: 1,
              // playlist: '-GR52czEd-0'
            }
          }}
        />
      </div>
			<div style={{position: 'absolute', left: 15, top: 15, padding: '3px 8px', background: 'black', color: 'white', fontWeight: 700, fontSize: '.8rem'}}>
					{currentQuality}
			</div>
			<div style={{position: 'absolute', right: 15, top: 15, padding: '3px 8px', background: 'black', color: 'white', fontWeight: 700, fontSize: '.8rem'}}>
					{currentTime}
			</div>
			{!currentMoment.video && <NoVideoScreen />}
    </div>
  );
  // return <img className={videoClasses} src={PICTURES[position]} alt='video-1' />;
};

export default PitchVideo ;
