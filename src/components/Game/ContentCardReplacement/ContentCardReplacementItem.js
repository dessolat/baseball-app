import React from 'react';
import cl from './ContentCardReplacement.module.scss';
import PortraitImg from 'images/portrait.png';
import { useSelector } from 'react-redux';
import ContentCardPortrait from '../ContentCardPortrait/ContentCardPortrait';

const ContentCardReplacementItem = ({ event, header = null }) => {
  const imagesData = useSelector(state => state.game.imagesData);
  const isVideo = useSelector(state => state.game.isVideo);

  const leftImgClass = !imagesData[event.new_player] ? cl.default : '';
  const leftImgSrc = imagesData[event.new_player] || PortraitImg;
  const rightImgClass = !imagesData[event.old_player] ? cl.default : '';
  const rightImgSrc = imagesData[event.old_player] || PortraitImg;

  const replaceClasses = [cl.replace];
  !isVideo && replaceClasses.push(cl.noVideo);
  return (
    <div className={replaceClasses.join(' ')}>
      <ContentCardPortrait className={leftImgClass} src={leftImgSrc} cl={cl} />
      <div className={cl.textBlock}>
				{header !== null && <p className={cl.textBold}>{header}</p>}
        <p className={cl.text}>{event.description}</p>
      </div>
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
