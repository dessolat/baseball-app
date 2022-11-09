import React from 'react';
import TopLeftVideoThumb from 'images/top_left_video_thumb.jpg';
import TopRightVideoThumb from 'images/top_right_video_thumb.jpg';
import BottomVideoThumb from 'images/bottom_video_thumb.jpg';
import cl from './PitchVideo.module.scss';
import classNames from 'classnames';

const PICTURES = {
  'top-left': TopLeftVideoThumb,
  'top-right': TopRightVideoThumb,
  bottom: BottomVideoThumb
};

const PitchVideo = ({ position }) => {
  const videoClasses = classNames(cl.video, {
    [cl.topLeftVideo]: position === 'top-left',
    [cl.topRightVideo]: position === 'top-right',
    [cl.bottomVideo]: position === 'bottom'
  });

  return <img className={videoClasses} src={PICTURES[position]} alt='video-1' />;
};

export default PitchVideo;
