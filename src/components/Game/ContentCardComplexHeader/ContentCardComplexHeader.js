import React, { useLayoutEffect, useRef, useMemo } from 'react';
import cl from './ContentCardComplexHeader.module.scss';
import 'scss/colorWords.scss';
import PortraitImg from 'images/portrait.png';
import BallsStrikes from 'components/UI/icons/BallsStrikes/BallsStrikes';
import Bases from 'components/UI/icons/Bases/Bases';
import ContentCardReplacement from '../ContentCardReplacement/ContentCardReplacement';
import RectText from 'components/UI/icons/Rects/RectText';
import RectScore from 'components/UI/icons/Rects/RectScore';
import { useSelector } from 'react-redux';
import Outs from 'components/UI/icons/Outs/Outs';
import ContentCardPortrait from '../ContentCardPortrait/ContentCardPortrait';
import ContentCardTitle from '../ContentCardTitle/ContentCardTitle';

const ContentCardComplexHeader = ({ player, sit }) => {
  const ref = useRef(null);
  const imagesData = useSelector(state => state.game.imagesData);
  const isVideo = useSelector(state => state.game.isVideo);

  const { r1, r2, r3, outs, balls, strikes } = sit.table;

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

  const imgClassName = !imagesData[player.who_id] ? cl.default : '';
  const imgSrc = imagesData[player.who_id] || PortraitImg;

  const bottomClasses = [cl.bottom];
  !isVideo && bottomClasses.push(cl.noVideo);
  return (
    <div className={cl.header}>
      <div className={cl.top}>
        <ContentCardTitle player={player} />
        <div className={cl.portraitTextWrapper}>
          <ContentCardPortrait className={imgClassName} src={imgSrc} cl={cl} />
          <p className={cl.text} ref={ref}>
            {cardText}
          </p>
        </div>
      </div>

      <div
        className={bottomClasses.join(' ')}
        style={
          eventsSummary.length === 0 && !isVideo ? { position: 'absolute', top: '1.6rem', right: 0 } : null
        }>
        {isRectText && <RectText icons={sit.icons} />}
        {isRectScore && <RectScore icons={sit.icons} />}
        <div className={cl.ellipses}>
          <Outs outs={outs} />
          <BallsStrikes balls={balls} strikes={strikes} />
        </div>
        <Bases r1={r1} r2={r2} r3={r3} />
      </div>

      {!isRectText && <ContentCardReplacement events={sit.events} />}
    </div>
  );
};

export default ContentCardComplexHeader;
