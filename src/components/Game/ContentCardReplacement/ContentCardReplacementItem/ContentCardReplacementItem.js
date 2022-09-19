import React from 'react';
import cl from '../ContentCardReplacement.module.scss';
import PortraitImg from 'images/portrait.png';
import { useSelector } from 'react-redux';
import ContentCardPortrait from '../../ContentCardPortrait/ContentCardPortrait';
import classNames from 'classnames';
import ItemTextBlock from './ItemTextBlock';

const ContentCardReplacementItem = ({ event, header = null }) => {
  const imagesData = useSelector(state => state.game.imagesData);
  const isVideo = useSelector(state => state.game.isVideo);

  const leftImgClass = !imagesData[event.new_player] ? cl.default : '';
  const leftImgSrc = imagesData[event.new_player] || PortraitImg;
  const rightImgClass = !imagesData[event.old_player] ? cl.default : '';
  const rightImgSrc = imagesData[event.old_player] || PortraitImg;

  const replaceClasses = classNames(cl.replace, { [cl.noVideo]: !isVideo });
  const rightSide = event.old_player ? (
    <ContentCardPortrait className={rightImgClass} src={rightImgSrc} cl={cl} />
  ) : (
    <div className={cl.portrait}></div>
  );
  return (
    <div
      className={replaceClasses}
      // style={event.old_player === null && !isVideo ? { justifyContent: 'flex-start' } : null}
    >
      <ContentCardPortrait className={leftImgClass} src={leftImgSrc} cl={cl} />
      <ItemTextBlock cl={cl} header={header} event={event} isVideo={isVideo} />
      {rightSide}
    </div>
  );
};

export default ContentCardReplacementItem;
