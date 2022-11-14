import VideoSpeedDropdown from 'components/UI/dropdown/VideoSpeedDropdown/VideoSpeedDropdown';
import ArrowDown from 'components/UI/icons/ArrowDown';
import React from 'react';
import { useSelector } from 'react-redux';
import cl from './VideoOptions.module.scss';
// import TriangleIcon from 'icons/triangle_icon.svg';

const SpeedSelector = () => {
	const speedOptions = [0.25, 1, 2]
	const videoPlaybackRate = useSelector(state => state.game.videoPlaybackRate)

  return (
    // <div className={cl.speedSelectorWrapper}>
    //   <p>Speed</p>
    //   <div>
    //     x2 <ArrowDown />
    //   </div>
    // </div>
		<VideoSpeedDropdown title='Speed x2 ' options={speedOptions} currentOption={videoPlaybackRate}/>
  );
};

export default SpeedSelector;
