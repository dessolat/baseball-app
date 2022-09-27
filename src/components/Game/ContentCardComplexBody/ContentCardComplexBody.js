import React from 'react';
import cl from './ContentCardComplexBody.module.scss';
import 'scss/colorWords.scss';
import ContentCardReplacement from '../ContentCardReplacement/ContentCardReplacement';
import RectText from 'components/UI/icons/Rects/RectText';
import RectScore from 'components/UI/icons/Rects/RectScore';
import { useSelector } from 'react-redux';
import ContentCardSigns from '../ContentCardSigns/ContentCardSigns';
import BodyTop from './BodyTop';

const ContentCardComplexBody = ({ sit }) => {
  const isVideo = useSelector(state => state.game.isVideo);

  const isRectScore = sit.icons.score_own !== undefined;

  const bottomClasses = [cl.bottom];
  !isVideo && bottomClasses.push(cl.noVideo);
  return (
    <>
      {sit.icons.rect_text !== 'Replacement' ? (
        <div className={cl.body}>
          <BodyTop cl={cl} sit={sit} />
          <div className={bottomClasses.join(' ')}>
            <RectText icons={sit.icons} />
            {isRectScore && <RectScore icons={sit.icons} />}
            <ContentCardSigns table={sit.table} />
          </div>
        </div>
      ) : (
        <ContentCardReplacement events={sit.events} />
      )}
    </>
  );
};

export default ContentCardComplexBody;
