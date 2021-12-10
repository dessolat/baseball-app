import React from 'react'
import PlaysField from '../PlaysField/PlaysField';
import PlaysSpin from '../PlaysSpin/PlaysSpin';
import PlaysSpeed from '../PlaysSpeed/PlaysSpeed';

const PlaysPitch = ({currentMoment}) => {
	return (
		<>
			<PlaysSpeed />
      <PlaysSpin />
      <PlaysField currentMoment={currentMoment}/>
		</>
	)
}

export default PlaysPitch
