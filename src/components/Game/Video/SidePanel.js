import React from 'react';
import cl from './Video.module.scss';
import PlaysEvents from '../PlaysEvents/PlaysEvents';
import VideoOptions from '../VideoOptions/VideoOptions';
import { useSelector } from 'react-redux';
import Signs from '../Videos/SidePanel/Signs';
import TeamInfo from '../Videos/SidePanel/TeamInfo';

const SidePanel = () => {
  const { guests, owners } = useSelector(state => state.game.preview);

  return (
    <div className={cl.sidePanelFull}>
      <div className={cl.events}>
        <PlaysEvents />
      </div>

      <TeamInfo score={guests.score} side='guests'/>
      <TeamInfo score={owners.score} side='owners'/>

      <Signs />

      <div className={cl.options}>
        <VideoOptions />
      </div>
    </div>
  );
};

export default SidePanel;
