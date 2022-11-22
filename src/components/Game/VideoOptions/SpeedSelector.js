import VideoSpeedDropdown from 'components/UI/dropdown/VideoSpeedDropdown/VideoSpeedDropdown';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setVideoPlaybackRate } from 'redux/gameReducer';

const SpeedSelector = () => {
  const speedOptions = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
  const videoPlaybackRate = useSelector(state => state.game.videoPlaybackRate);

  const dispatch = useDispatch();

  const handleItemClick = option => {
    dispatch(setVideoPlaybackRate(option));
  };
  return (
    <VideoSpeedDropdown
      title={`Speed x${videoPlaybackRate} `}
      options={speedOptions}
      currentOption={videoPlaybackRate}
      handleClick={handleItemClick}
    />
  );
};

export default SpeedSelector;
