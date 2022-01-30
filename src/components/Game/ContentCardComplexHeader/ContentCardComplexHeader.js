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

const ContentCardComplexHeader = ({ player, sit }) => {
  const ref = useRef(null);
  const imagesData = useSelector(state => state.game.imagesData);

  const { r1, r2, r3, outs, balls, strikes } = sit.table;

  const eventsSummary = useMemo(
    () => sit.events.reduce((sum, event) => [...sum, event.description], []),
    [sit.events]
  );

  useLayoutEffect(() => {
    ref.current.innerHTML = eventsSummary.join('.') + '.';
  }, [eventsSummary, sit.icons.rect_text]);

  const titleText = `${player.hit_order}. ${player.who}`;
  const cardText = eventsSummary.join('.') + '.';

	const isRectText = sit.icons.rect_text !== 'Replacement'
	const isRectScore = sit.icons.score_own !== undefined
  return (
    <div>
      <div className={cl.top}>
        <p className={cl.playerName}>{titleText}</p>
        <div className={cl.portraitTextWrapper}>
          <div className={cl.portrait}>
            <img
              className={!imagesData[player.who] ? cl.default : ''}
              src={imagesData[player.who] || PortraitImg}
              alt='Portrait'
            />
          </div>
          <p className={cl.text} ref={ref}>
            {cardText}
          </p>
        </div>
      </div>

      <div className={cl.bottom}>
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
