import React from 'react';
import PlaysPitch from '../PlaysPitch/PlaysPitch';

const PlaysContent = ({ footerTab }) => <>{footerTab === 'pitch' ? <PlaysPitch /> : <></>}</>;
export default PlaysContent;
