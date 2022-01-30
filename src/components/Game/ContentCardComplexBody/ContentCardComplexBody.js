import React, { useLayoutEffect, useRef, useMemo } from 'react';
import cl from './ContentCardComplexBody.module.scss';
import 'scss/colorWords.scss';
import BallsStrikes from 'components/UI/icons/BallsStrikes/BallsStrikes';
import Bases from 'components/UI/icons/Bases/Bases';
import ContentCardReplacement from '../ContentCardReplacement/ContentCardReplacement';
import RectText from 'components/UI/icons/Rects/RectText';
import RectScore from 'components/UI/icons/Rects/RectScore';
import Outs from 'components/UI/icons/Outs/Outs';

const ContentCardComplexBody = ({ sit }) => {
  const { r1, r2, r3, outs, balls, strikes } = sit.table;
  const ref = useRef(null);

  const eventsSummary = useMemo(
    () => sit.events.reduce((sum, event) => [...sum, event.description], []),
    [sit.events]
  );

  useLayoutEffect(() => {
    if (ref.current === null) return;
    // if (sit.icons.rect_text === 'Replacement') return;
    ref.current.innerHTML = eventsSummary.join('.') + '.';
  }, [eventsSummary, sit.icons.rect_text]);

  const isRectScore = sit.icons.score_own !== undefined;
  const cardText = eventsSummary.join('.') + '.';
  return (
    <>
      {sit.icons.rect_text !== 'Replacement' ? (
        <div className={cl.body}>
          <p className={cl.text} ref={ref}>
            {cardText}
          </p>
          <div className={cl.bottom}>
            <RectText icons={sit.icons} />
            {isRectScore && <RectScore icons={sit.icons} />}
            <div className={cl.ellipses}>
              <Outs outs={outs} />
              <BallsStrikes balls={balls} strikes={strikes} />
            </div>
            <Bases r1={r1} r2={r2} r3={r3} />
          </div>
        </div>
      ) : (
        <ContentCardReplacement events={sit.events} />
      )}
    </>
  );
};

export default ContentCardComplexBody;
