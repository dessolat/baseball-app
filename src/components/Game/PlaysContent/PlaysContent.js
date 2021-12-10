import React from 'react';
import PlaysPitch from '../PlaysPitch/PlaysPitch';

const PlaysContent = ({ footerTab, currentMoment }) => <>{footerTab === 'pitch' ? <PlaysPitch currentMoment={currentMoment}/> : <></>}</>;
export default PlaysContent;
