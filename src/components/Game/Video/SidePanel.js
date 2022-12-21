import React from 'react'
import cl from './Video.module.scss'
import PlaysEvents from '../PlaysEvents/PlaysEvents';
import VideoOptions from '../VideoOptions/VideoOptions';

const SidePanel = () => (
  <div className={cl.sidePanelFull}>
    <div className={cl.events}>
      <PlaysEvents />
    </div>
    <div className={cl.options}>
      <VideoOptions />
    </div>
  </div>
);

export default SidePanel