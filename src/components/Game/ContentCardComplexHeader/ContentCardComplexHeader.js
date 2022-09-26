import React, { useMemo } from 'react';
import cl from './ContentCardComplexHeader.module.scss';
import 'scss/colorWords.scss';
import ContentCardReplacement from '../ContentCardReplacement/ContentCardReplacement';
import RectText from 'components/UI/icons/Rects/RectText';
import RectScore from 'components/UI/icons/Rects/RectScore';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import ContentCardSigns from '../ContentCardSigns/ContentCardSigns';
import HeaderTop from './HeaderTop';

const ContentCardComplexHeader = ({ player, sit }) => {
  const isVideo = useSelector(state => state.game.isVideo);

  const eventsSummary = useMemo(
    () =>
      sit.icons.rect_text !== 'Replacement'
        ? sit.events.reduce((sum, event) => [...sum, event.description], [])
        : [],
    // eslint-disable-next-line
    [sit.events]
  );

  const isRectText = sit.icons.rect_text !== 'Replacement';
  const isRectScore = sit.icons.score_own !== undefined;

  const bottomClasses = classNames(cl.bottom, {
    [cl.noVideo]: !isVideo
  });

  const bottomStyles =
    eventsSummary.length === 0 && !isVideo ? { position: 'absolute', top: '1.6rem', right: 0 } : null;
  return (
    <div className={cl.header}>
      <HeaderTop cl={cl} eventsSummary={eventsSummary} player={player} sit={sit} />
      <div className={bottomClasses} style={bottomStyles}>
        {isRectText && <RectText icons={sit.icons} />}
        {isRectScore && <RectScore icons={sit.icons} />}
        <ContentCardSigns table={sit.table} />
      </div>

      {!isRectText && <ContentCardReplacement events={sit.events} />}
    </div>
  );
};

export default ContentCardComplexHeader;
