import React from 'react';
import PortraitImg from 'images/portrait.png';
import ContentCardPortrait from 'components/Game/ContentCardPortrait/ContentCardPortrait';

const ItemRightPortrait = ({ cl, event, imagesData }) => {
  const rightImgClass = !imagesData[event.old_player] ? cl.default : '';
  const rightImgSrc = imagesData[event.old_player] || PortraitImg;

  const rightSide = event.old_player ? (
    <ContentCardPortrait className={rightImgClass} src={rightImgSrc} cl={cl} />
  ) : (
    <div className={cl.portrait}></div>
  );

  return <>{rightSide}</>;
};

export default ItemRightPortrait;
