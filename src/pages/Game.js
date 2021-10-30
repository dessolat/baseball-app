import React, { useState, useEffect } from 'react';
import { inningsData, gameInfoData, teamNames, filterSituationsList, contentSituationsList } from '../data';
import fullData from 'baseball.json'
import Header from 'components/Game/Header/Header';
import Filters from 'components/Game/Filters/Filters';
import Content from 'components/Game/Content/Content';

const Game = () => {
  const [situationFilter, setSituationFilter] = useState('All');
  const [inningNumber, setInningNumber] = useState(null);
  const [viewMode, setViewMode] = useState('mode-1');
  // const [activeSituation, setActiveSituation] = useState(null)

  // useEffect(() => {
  //   const handleKeyDown = e => {
  //     if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;

  //     console.log(e.key);
  //   };

  //   document.addEventListener('keydown', handleKeyDown);

  //   return () => {
  //     document.removeEventListener('keydown', handleKeyDown);
  //   };
  // }, []);
	
  return (
    <>
      <Header
				{...fullData}
        // inningsData={inningsData}
        // gameInfoData={gameInfoData}
        // teamNames={teamNames}
        inningNumber={inningNumber}
        setInningNumber={setInningNumber}
      />
      <Filters
        situationFilter={situationFilter}
        setSituationFilter={setSituationFilter}
        viewMode={viewMode}
        setViewMode={setViewMode}
        situations={filterSituationsList}
      />
      <Content viewMode={viewMode} contentSituationsList={contentSituationsList} />
    </>
  );
};

export default Game;
