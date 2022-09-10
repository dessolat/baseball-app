import React from 'react';
import cl from './ContentCardReplacement.module.scss';
import PortraitImg from 'images/portrait.png';
import { useSelector } from 'react-redux';
import ContentCardPortrait from '../ContentCardPortrait/ContentCardPortrait';
import SwitchArrow from 'icons/switch_arrow.svg';

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
        {/* <p className={cl.text}>{event.description}</p> */}
        <div className={cl.text}>
          <div className={cl.textRow}>
            <p className={cl.leftSide}>{event.left_row1_text || event.left_row1_index}</p>
            <img className={cl.switchArrow} src={SwitchArrow} alt='switch-arrow' />
            <p className={cl.rightSide} style={event.right_row1_index ? { fontWeight: 700 } : null}>
              {event.right_row1_text || event.right_row1_index}
            </p>
          </div>
          {(event.left_row2_index || event.left_row2_text) && (
            <div className={cl.textRow}>
              <p
                className={cl.leftSide}
                style={event.left_row2_index ? { fontWeight: 700, textAlign: 'right' } : null}>
                {event.left_row2_text || event.left_row2_index}
              </p>
              <img className={cl.switchArrow} src={SwitchArrow} alt='switch-arrow' />
              <p className={cl.rightSide} style={event.right_row2_index ? { fontWeight: 700 } : null}>
                {event.right_row2_text || event.right_row2_index}
              </p>
            </div>
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
