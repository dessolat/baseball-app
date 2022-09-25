import React from 'react';
import cl from './ContentCardTitle.module.scss';

const ContentCardTitle = ({ player }) => (
  <p className={cl.playerName}>{`${player.hit_order}. ${player.who}`}</p>
);

export default ContentCardTitle;
