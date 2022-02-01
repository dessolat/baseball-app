import React from 'react';
import cl from './ContentCardReplacement.module.scss';
import PortraitImg from 'images/portrait.png';
import { useSelector } from 'react-redux';
import ContentCardPortrait from '../ContentCardPortrait/ContentCardPortrait';

const ContentCardReplacementItem = ({ event }) => {
  const imagesData = useSelector(state => state.game.imagesData);

  const leftImgClass = !imagesData[event.new_player] ? cl.default : '';
  const leftImgSrc = imagesData[event.new_player] || PortraitImg;
  const rightImgClass = !imagesData[event.old_player] ? cl.default : '';
  const rightImgSrc = imagesData[event.old_player] || PortraitImg;

  return (
    <div className={cl.replace}>
      <ContentCardPortrait className={leftImgClass} src={leftImgSrc} cl={cl} />
      <p className={cl.text}>{event.description}</p>
      <ContentCardPortrait
        className={rightImgClass}
        src={rightImgSrc}
        cl={cl}
        style={event.old_player === null ? { display: 'none' } : null}
      />
    </div>
  );
};

export default ContentCardReplacementItem;
