import React from 'react';
import cl from '../ContentCardReplacement.module.scss';
import PortraitImg from 'images/portrait.png';
import { useSelector } from 'react-redux';
import ContentCardPortrait from '../../ContentCardPortrait/ContentCardPortrait';
import classNames from 'classnames';
import ItemTextBlock from './ItemTextBlock';
import ItemRightPortrait from './ItemRightPortrait';

const ContentCardReplacementItem = ({ event, header = null }) => {
  const imagesData = useSelector(state => state.game.imagesData);
  const isVideo = useSelector(state => state.game.isVideo);

  const leftImgClass = !imagesData[event.new_player] ? cl.default : '';
  const leftImgSrc = imagesData[event.new_player] || PortraitImg;
  
  const replaceClasses = classNames(cl.replace, { [cl.noVideo]: !isVideo });
  return (
    <div className={replaceClasses}>
      <ContentCardPortrait className={leftImgClass} src={leftImgSrc} cl={cl} />
      <ItemTextBlock cl={cl} header={header} event={event} isVideo={isVideo} />
      <ItemRightPortrait cl={cl} event={event} imagesData={imagesData}/>
    </div>
  );
};

export default ContentCardReplacementItem;
