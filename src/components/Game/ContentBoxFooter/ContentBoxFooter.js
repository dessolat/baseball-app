import React from 'react';
import cl from './ContentBoxFooter.module.scss';

const ContentBoxFooter = ({ footer }) => {
  const { location, stadium, weather, att, t, umpires, scorers, tc } = footer || {};

  return (
    <div className={cl.footer}>
      <div className={cl.footerContainer}>
        <div>
          <p>Location: <span>{location}</span></p>
          <p>Stadium: <span>{stadium}</span></p>
          <p>Weather: <span>{weather}</span></p>
          <p>Att: <span>{att}</span></p>
          <p>Time: <span>{t}</span></p>
          <p>HP Umpire: <span>{umpires ? umpires[0] : ' '}</span></p>
        </div>
        <div>
          <p>1B Umpire: <span>{umpires ? umpires[1] : ' '}</span></p>
          <p>Scorer: <span>{scorers ? scorers[0] : ' '}</span></p>
          <p>Scorer: <span>{scorers ? scorers[1] : ' '}</span></p>
          <p>Scorer: <span>{scorers ? scorers[2] : ' '}</span></p>
          <p>TC: <span>{tc ? tc[0] : ' '}</span></p>
          <p>TC: <span>{tc ? tc[1] : ' '}</span></p>
        </div>
      </div>
    </div>
  );
};

export default ContentBoxFooter;
