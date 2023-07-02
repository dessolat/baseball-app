import React, { useMemo } from 'react';
import cl from './ContentCardComplexHeader.module.scss';
import 'scss/colorWords.scss';
import ContentCardReplacement from '../ContentCardReplacement/ContentCardReplacement';
import HeaderTop from './HeaderTop';
import HeaderBottom from './HeaderBottom';

const ContentCardComplexHeader = ({ player, sit, noCardTitle, noSigns, innerRects }) => {
  const eventsSummary = useMemo(
    () =>
      sit.icons.rect_text !== 'Replacement'
        ? sit.events.reduce((sum, event) => [...sum, event.description], [])
        : [],
    // eslint-disable-next-line
    [sit.events]
  );

  const isRectText = sit.icons.rect_text !== 'Replacement';

  return (
    <div className={cl.header}>
      <HeaderTop
        cl={cl}
        eventsSummary={eventsSummary}
        player={player}
        sit={sit}
        noCardTitle={noCardTitle}
        innerRects={innerRects}
      />
      {!innerRects && (
        <HeaderBottom
          cl={cl}
          eventsSummary={eventsSummary}
          isRectText={isRectText}
          sit={sit}
          noSigns={noSigns}
        />
      )}

      {!isRectText && <ContentCardReplacement events={sit.events} />}
    </div>
  );
};

export default ContentCardComplexHeader;
