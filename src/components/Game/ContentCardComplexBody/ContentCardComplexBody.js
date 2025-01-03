import React from 'react';
import cl from './ContentCardComplexBody.module.scss';
import 'scss/colorWords.scss';
import ContentCardReplacement from '../ContentCardReplacement/ContentCardReplacement';
import RectText from 'components/UI/icons/Rects/RectText';
import RectScore from 'components/UI/icons/Rects/RectScore';
import { useSelector } from 'react-redux';
import ContentCardSigns from '../ContentCardSigns/ContentCardSigns';
import BodyTop from './BodyTop';
import classNames from 'classnames';

const ContentCardComplexBody = ({ sit, noSigns, innerRects }) => {
  const isVideo = useSelector(state => state.game.isVideo);

  const isRectScore = sit.icons.score_own !== undefined;

  const bottomClasses = classNames(cl.bottom, {
    [cl.noVideo]: !isVideo
  });
  return (
    <>
      {sit.icons.rect_text !== 'Replacement' ? (
        <div className={cl.body}>
          <BodyTop cl={cl} sit={sit} innerRects={innerRects} />
          {!innerRects && <div className={bottomClasses}>
            <RectText icons={sit.icons} />
            {isRectScore && <RectScore icons={sit.icons} />}
            {!noSigns && <ContentCardSigns table={sit.table} />}
          </div>}
        </div>
      ) : (
        <ContentCardReplacement events={sit.events} />
      )}
    </>
  );
};

export default ContentCardComplexBody;
