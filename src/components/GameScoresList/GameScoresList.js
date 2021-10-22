import React, { useEffect } from 'react';
import cl from './GameScoresList.module.scss';
import GameScoresListItem from '../GameScoresListItem';

const GameScoresList = ({ data }) => {
  useEffect(() => {
    (function () {
      function scrollHorizontally(e) {
        e = window.event || e;
        var delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
        document.getElementById('scores-table-scroll').scrollLeft += delta * 32;
        e.preventDefault();
      }
      if (document.getElementById('scores-table-scroll').addEventListener) {
        document
          .getElementById('scores-table-scroll')
          .addEventListener('mousewheel', scrollHorizontally, false);
        document
          .getElementById('scores-table-scroll')
          .addEventListener('DOMMouseScroll', scrollHorizontally, false);
      } else {
        document.getElementById('scores-table-scroll').attachEvent('onmousewheel', scrollHorizontally);
      }
    })();
  }, []);

  return (
    <div className={cl.scoresTable} id='scores-table-scroll'>
      {data.map(inning => (
        <GameScoresListItem key={inning.inning_number} inning={inning} />
      ))}
    </div>
  );
};

export default GameScoresList;
