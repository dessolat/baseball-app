import React from 'react';
import cl from './ContentCardReplacement.module.scss';
import PortraitImg from 'images/portrait.png';
import { useSelector } from 'react-redux';

const ContentCardReplacementItem = ({ event }) => {
  const imagesData = useSelector(state => state.game.imagesData);

  return (
    <div className={cl.replace}>
      <div className={cl.portrait}>
        <img
          className={!imagesData[event.new_player] ? cl.default : ''}
          src={imagesData[event.new_player] || PortraitImg}
          alt='Portrait'
        />
      </div>
      <p className={cl.text}>{event.description}</p>
      <div className={cl.portrait} style={event.old_player === null ? {display: 'none'} : null}>
        <img
          className={!imagesData[event.old_player] ? cl.default : ''}
          src={imagesData[event.old_player] || PortraitImg}
          alt='Portrait'
        />
      </div>
    </div>
  );
};

export default ContentCardReplacementItem;
