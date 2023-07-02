import RectScore from 'components/UI/icons/Rects/RectScore';
import RectText from 'components/UI/icons/Rects/RectText';
import React, { useLayoutEffect, useRef, useMemo } from 'react';

const BodyTop = ({ cl, sit, innerRects = false }) => {
  const ref = useRef(null);

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
  return (
    <div>
      <p className={cl.text} ref={ref}>
        {cardText}
      </p>
      {innerRects && (
        <div className={cl.rects}>
          <RectText icons={sit.icons} />
          {isRectScore && <RectScore icons={sit.icons} />}
        </div>
      )}
    </div>
  );
};

export default BodyTop;
