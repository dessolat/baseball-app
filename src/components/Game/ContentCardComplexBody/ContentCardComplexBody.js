import React, { useLayoutEffect, useRef, useMemo } from 'react';
import cl from './ContentCardComplexBody.module.scss';
import 'scss/colorWords.scss';
import ContentCardReplacement from '../ContentCardReplacement/ContentCardReplacement';
import RectText from 'components/UI/icons/Rects/RectText';
import RectScore from 'components/UI/icons/Rects/RectScore';
import { useSelector } from 'react-redux';
import ContentCardSigns from '../ContentCardSigns/ContentCardSigns';

const ContentCardComplexBody = ({ sit }) => {
  const ref = useRef(null);

	const isVideo = useSelector(state => state.game.isVideo)

  const eventsSummary = useMemo(
    () => sit.events.reduce((sum, event) => [...sum, event.description], []),
    [sit.events]
  );

  useLayoutEffect(() => {
    if (ref.current === null) return;
    ref.current.innerHTML = eventsSummary.join('.') + '.';
  }, [eventsSummary, sit.icons.rect_text]);

  const isRectScore = sit.icons.score_own !== undefined;
  const cardText = eventsSummary.join('.') + '.';

	const bottomClasses = [cl.bottom]
	!isVideo && bottomClasses.push(cl.noVideo)
	return (
    <>
      {sit.icons.rect_text !== 'Replacement' ? (
        <div className={cl.body}>
          <p className={cl.text} ref={ref}>
            {cardText}
          </p>
          <div className={bottomClasses.join(' ')}>
            <RectText icons={sit.icons} />
            {isRectScore && <RectScore icons={sit.icons} />}
						<ContentCardSigns table={sit.table}/>
          </div>
        </div>
      ) : (
        <ContentCardReplacement events={sit.events} />
      )}
    </>
  );
};

export default ContentCardComplexBody;
