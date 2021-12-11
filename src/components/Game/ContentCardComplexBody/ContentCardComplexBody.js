import React, { useLayoutEffect, useRef, useMemo } from 'react';
import cl from './ContentCardComplexBody.module.scss';
import BallsStrikes from 'components/UI/icons/BallsStrikes/BallsStrikes';
import Bases from 'components/UI/icons/Bases/Bases';
import ContentCardReplacement from '../ContentCardReplacement/ContentCardReplacement';
import RectText from 'components/UI/icons/Rects/RectText';
import RectScore from 'components/UI/icons/Rects/RectScore';
import Outs from 'components/UI/icons/Outs/Outs';

const ContentCardComplexBody = ({ sit }) => {
  const { r1, r2, r3, outs, balls, strikes } = sit.table;
  const ref = useRef(null);

	const textClasses = [cl.text, cl[sit.icons.rect_color]];
  const eventsSummary = useMemo(
    () => sit.events.reduce((sum, event) => [...sum, event.description], []),
    [sit.events]
  );

	useLayoutEffect(() => {
		if (sit.icons.rect_text === 'Replacement') return
    ref.current.innerHTML = eventsSummary.join('.') + '.';
  }, [eventsSummary, sit.icons.rect_text]);

  return (
    <>
      {sit.icons.rect_text !== 'Replacement' ? (
        <div>
          <p className={textClasses.join(' ')} ref={ref}>{eventsSummary.join('.') + '.'}</p>
          <div className={cl.bottom}>
            <Bases r1={r1} r2={r2} r3={r3} />
						<Outs outs={outs} />
            <RectText icons={sit.icons} />
            {sit.icons.score_own !== undefined && <RectScore icons={sit.icons} />}
            <BallsStrikes balls={balls} strikes={strikes} />
          </div>
        </div>
      ) : (
        <ContentCardReplacement text={eventsSummary.join('.') + '.'} />
      )}
    </>
  );
};

export default ContentCardComplexBody;
