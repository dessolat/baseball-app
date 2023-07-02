import React from 'react';
import RectText from 'components/UI/icons/Rects/RectText';
import RectScore from 'components/UI/icons/Rects/RectScore';
import ContentCardSigns from '../ContentCardSigns/ContentCardSigns';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

const HeaderBottom = ({ cl, eventsSummary, isRectText, sit, noSigns }) => {
  const isVideo = useSelector(state => state.game.isVideo);

  const isRectScore = sit.icons.score_own !== undefined;

  const bottomClasses = classNames(cl.bottom, {
    [cl.noVideo]: !isVideo
  });

  const bottomStyles =
    eventsSummary.length === 0 && !isVideo ? { position: 'absolute', top: '1.6rem', right: 0 } : null;
  return (
    <div className={bottomClasses} style={bottomStyles}>
      {isRectText && <RectText icons={sit.icons} />}
      {isRectScore && <RectScore icons={sit.icons} />}
      {!noSigns && <ContentCardSigns table={sit.table} />}
    </div>
  );
};

export default HeaderBottom;
