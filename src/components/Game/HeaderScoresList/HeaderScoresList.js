import React, { useEffect } from 'react';
import cl from './HeaderScoresList.module.scss';
import HeaderScoresListItem from './HeaderScoresListItem';

const HeaderScoresList = ({ data }) => {
  useEffect(() => {
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

    return () => {
      if (document.getElementById('scores-table-scroll').removeEventListener) {
        document
          .getElementById('scores-table-scroll')
          .removeEventListener('mousewheel', scrollHorizontally, false);
        document
          .getElementById('scores-table-scroll')
          .removeEventListener('DOMMouseScroll', scrollHorizontally, false);
      } else {
        document.getElementById('scores-table-scroll').detachEvent('onmousewheel', scrollHorizontally);
      }
    };
  }, []);

  return (
    <div className={cl.scoresTable} id='scores-table-scroll'>
      {data.map(inning => (
        <HeaderScoresListItem key={inning.inning_number} inning={inning} />
      ))}
    </div>
  );
};

export default HeaderScoresList;
