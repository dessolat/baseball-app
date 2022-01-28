import React from 'react';
import cl from './ContentBoxFooter.module.scss';

const ContentBoxFooter = ({ footer }) => {
  const { location, stadium, weather, att, t, umpires, scorers, tc } = footer || {};

  return (
    <div className={cl.footer}>
      <div className={cl.footerContainer}>
        <div>
          <p>Location: {location}</p>
          <p>Stadium: {stadium}</p>
          <p>Weather: {weather}</p>
          <p>Att: {att}</p>
          <p>T: {t}</p>
          <p>HP Umpire: {umpires ? umpires[0] : ' '}</p>
        </div>
        <div>
          <p>1B Umpire: {umpires ? umpires[1] : ' '}</p>
          <p>Scorer: {scorers ? scorers[0] : ' '}</p>
          <p>Scorer: {scorers ? scorers[1] : ' '}</p>
          <p>Scorer: {scorers ? scorers[2] : ' '}</p>
          <p>TC: {tc ? tc[0] : ' '}</p>
          <p>TC: {tc ? tc[1] : ' '}</p>
        </div>
      </div>
    </div>
  );
};

export default ContentBoxFooter;
