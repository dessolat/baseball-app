import React from 'react';
import cl from './ContentCardComplexBody.module.scss';
import Ellipses from 'components/UI/icons/Ellipses/Ellipses';
import RectanglesEllipses from 'components/UI/icons/RectanglesEllipses/RectanglesEllipses';
import ContentCardReplacement from '../ContentCardReplacement/ContentCardReplacement'

const ContentCardComplexBody = ({ sit }) => {
  const { r1, r2, r3, outs, balls, strikes } = sit.table;
  const eventsSummary = [];
  sit.events.forEach(event => eventsSummary.push(event.description));

  return (
		<>
    {sit.icons.rect_text !== 'Replacement' ? <div>
      <p className={cl.text}>{eventsSummary.join('.')}</p>
      <div className={cl.bottom}>
        <RectanglesEllipses r1={r1} r2={r2} r3={r3} outs={outs} />
        <div className={cl.rectText + ' ' + cl[sit.icons.rect_color]}>
          {sit.icons.rect_text.toUpperCase()}
        </div>
        {sit.icons.score_own !== undefined && (
          <div className={cl.rectText + ' ' + cl[sit.icons.rect_color]}>{sit.icons.score_gue + ' - ' + sit.icons.score_own}</div>
        )}
        <Ellipses balls={balls} strikes={strikes} />
      </div>
    </div> : <ContentCardReplacement text={eventsSummary.join('.')}/>}
		</>
		
  );
};

export default ContentCardComplexBody;
