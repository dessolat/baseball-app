import React, { useRef } from 'react';
// import TopLeftVideoThumb from 'images/top_left_video_thumb.jpg';
// import TopRightVideoThumb from 'images/top_right_video_thumb.jpg';
// import BottomVideoThumb from 'images/bottom_video_thumb.jpg';
import cl from './PitchVideo.module.scss';
import classNames from 'classnames';
import YouTube from 'react-youtube';
import { useSelector } from 'react-redux';

// const PICTURES = {
//   'top-left': TopLeftVideoThumb,
//   'top-right': TopRightVideoThumb,
//   bottom: BottomVideoThumb
// };

const POS_OPTIONS = {
  'top-left': { x: -0.37, y: -0.25, delta: 0.09 },
  'top-right': { x: -0.52, y: -0.26, delta: 0.09 },
  bottom: { x: -0.31, y: -0.08, delta: 0.42 }
};

const PitchVideo = ({ videoId, position }) => {
  const fullWidth = useSelector(state => state.shared.mobileWidth);

  const videoWrapperRef = useRef(null);

  const videoClasses = classNames(cl.video, {
    [cl.topLeftVideo]: position === 'top-left',
    [cl.topRightVideo]: position === 'top-right',
    [cl.bottomVideo]: position === 'bottom'
  });

  const xCoef = videoWrapperRef?.current?.clientWidth / ((1920 / 100) * (POS_OPTIONS[position].delta * 100));

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
          // onReady={onReady}
          // onStateChange={onStateChange}
          // onPlaybackRateChange={onPlaybackRateChange}
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
    </div>
  );
  // return <img className={videoClasses} src={PICTURES[position]} alt='video-1' />;
};

export default PitchVideo;
