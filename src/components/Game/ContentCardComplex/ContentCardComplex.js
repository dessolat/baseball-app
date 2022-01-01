import React from 'react';
import ContentCardComplexFooter from '../ContentCardComplexFooter/ContentCardComplexFooter';
import ContentCardComplexBody from '../ContentCardComplexBody/ContentCardComplexBody';
import ContentCardComplexHeader from '../ContentCardComplexHeader/ContentCardComplexHeader';

const ContentCardComplex = ({ player, situationsArr }) => {
  const lastMoment = player.moments.slice(-1)[0];
  const isFooter = !lastMoment.icons?.rect_text || lastMoment.icons?.rect_text === 'Replacement';

  return (
    <>
      <ContentCardComplexHeader player={player} sit={situationsArr[0]} />
      {situationsArr.slice(1).map((sit, i) => (
        <ContentCardComplexBody key={i} sit={sit} />
      ))}
      {isFooter && <ContentCardComplexFooter lastMoment={lastMoment} />}
    </>
  );
};

export default ContentCardComplex;
