import React, { useLayoutEffect, useRef, useMemo } from 'react';
import cl from './ContentCardComplexHeader.module.scss';
import 'scss/colorWords.scss';
import PortraitImg from 'images/portrait.png';
import ContentCardReplacement from '../ContentCardReplacement/ContentCardReplacement';
import RectText from 'components/UI/icons/Rects/RectText';
import RectScore from 'components/UI/icons/Rects/RectScore';
import { useSelector } from 'react-redux';
import ContentCardPortrait from '../ContentCardPortrait/ContentCardPortrait';
import ContentCardTitle from '../ContentCardTitle/ContentCardTitle';
import classNames from 'classnames';
import ContentCardSigns from '../ContentCardSigns/ContentCardSigns';

const ContentCardComplexHeader = ({ player, sit }) => {
  const ref = useRef(null);
  const imagesData = useSelector(state => state.game.imagesData);
  const isVideo = useSelector(state => state.game.isVideo);

  const eventsSummary = useMemo(
    () =>
      sit.icons.rect_text !== 'Replacement'
        ? sit.events.reduce((sum, event) => [...sum, event.description], [])
        : [],
    // eslint-disable-next-line
    [sit.events]
  );

  useLayoutEffect(() => {
    ref.current.innerHTML = eventsSummary.length > 0 ? eventsSummary.join('.') + '.' : '';
  }, [eventsSummary, sit.icons.rect_text]);

  const cardText = eventsSummary.length > 0 ? eventsSummary.join('.') + '.' : '';

  const isRectText = sit.icons.rect_text !== 'Replacement';
  const isRectScore = sit.icons.score_own !== undefined;

  const imgSrc = imagesData[player.who_id] || PortraitImg;

  const imgClasses = classNames({ [cl.default]: !imagesData[player.who_id] });
  const bottomClasses = classNames(cl.bottom, {
    [cl.noVideo]: !isVideo
  });

  const bottomStyles =
    eventsSummary.length === 0 && !isVideo ? { position: 'absolute', top: '1.6rem', right: 0 } : null;
  return (
    <div className={cl.header}>
      <div className={cl.top}>
        <ContentCardTitle player={player} />
        <div className={cl.portraitTextWrapper}>
          <ContentCardPortrait className={imgClasses} src={imgSrc} cl={cl} />
          <p className={cl.text} ref={ref}>
            {cardText}
          </p>
        </div>
      </div>

      <div className={bottomClasses} style={bottomStyles}>
        {isRectText && <RectText icons={sit.icons} />}
        {isRectScore && <RectScore icons={sit.icons} />}
        <ContentCardSigns table={sit.table}/>
      </div>

      {!isRectText && <ContentCardReplacement events={sit.events} />}
    </div>
  );
};

export default ContentCardComplexHeader;
