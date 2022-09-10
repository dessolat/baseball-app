import React from 'react';
import cl from '../ContentCardReplacement.module.scss';
import PortraitImg from 'images/portrait.png';
import { useSelector } from 'react-redux';
import ContentCardPortrait from '../../ContentCardPortrait/ContentCardPortrait';
import ItemRow from './ItemRow';

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
    <div
      className={replaceClasses.join(' ')}
      style={event.old_player === null && !isVideo ? { justifyContent: 'flex-start' } : null}>
      <ContentCardPortrait className={leftImgClass} src={leftImgSrc} cl={cl} />
      <div className={cl.textBlock}>
        {header !== null && !isVideo && <p className={cl.textBold}>{header}</p>}
        <div className={cl.text}>
          <ItemRow event={event} rowNumber={1} cl={cl} />
          {/* <div className={cl.textRow}>
            <p className={cl.leftSide}>{event.left_row1_text || event.left_row1_index}</p>
            <img className={cl.switchArrow} src={SwitchArrow} alt='switch-arrow' />
            <p className={cl.rightSide} style={firstRowRightStyles}>
              {event.right_row1_text || event.right_row1_index}
            </p>
          </div> */}
          {event.rows_numbers === 2 && (
            <ItemRow event={event} rowNumber={2} cl={cl} />
            // <div className={cl.textRow}>
            //   <p className={cl.leftSide} style={secondRowLeftStyles}>
            //     {event.left_row2_text || event.left_row2_index}
            //   </p>
            //   <img className={cl.switchArrow} src={SwitchArrow} alt='switch-arrow' />
            //   <p className={cl.rightSide}>{event.right_row2_text || event.right_row2_index}</p>
            // </div>
          )}
        </div>
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
