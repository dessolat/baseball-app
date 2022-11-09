import React from 'react';
import PlaysField from '../PlaysField/PlaysField';
import PlaysSpin from '../PlaysSpin/PlaysSpin';
import PlaysSpeed from '../PlaysSpeed/PlaysSpeed';
import { useSelector } from 'react-redux';
import PitchVideo from './PitchVideo/PitchVideo';
import PitchValues from './PitchValues/PitchValues';

const PlaysPitch = () => {
	const currentMoment = useSelector(state => state.game.currentMoment)
  return (
    <>
      <PlaysField currentMoment={currentMoment} />
      <PlaysSpeed currentMoment={currentMoment} />
      <PlaysSpin pitch={currentMoment?.metering?.pitch} />
			<PitchVideo position='top-left'/>
			<PitchVideo position='top-right'/>
			<PitchVideo position='bottom'/>
			<PitchValues />
    </>
  );
};

export default PlaysPitch;
