import React from 'react'
import cl from './VideoControls.module.scss';
import PlayBtn from 'components/UI/icons/YTButtons/PlayBtn/PlayBtn';
import SpeedBtn from 'components/UI/icons/YTButtons/SpeedBtn/SpeedBtn';

const VideoControls = ({controlsWrapper}) => {
	return (
		<div className={controlsWrapper}>
			<div className={cl.timeLine}>Timeline</div>
			<div className={cl.buttons}>
				<PlayBtn />
				<SpeedBtn />
			</div>
		</div>
	)
}

export default VideoControls