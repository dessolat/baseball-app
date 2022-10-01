import React from 'react'
import cl from './VideoControls.module.scss';
import PlayBtn from 'components/UI/icons/YTButtons/PlayBtn/PlayBtn';
import SpeedBtn from 'components/UI/icons/YTButtons/SpeedBtn/SpeedBtn';

const VideoControls = () => {
	return (
		<div className={cl.wrapper}>
			<div className={cl.timeLine}>Timeline</div>
			<div className={cl.buttons}>
				<PlayBtn />
				<SpeedBtn />
			</div>
		</div>
	)
}

export default VideoControls