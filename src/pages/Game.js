import React, { useState } from 'react';
import { inningsData, gameInfoData, teamNames, situationsList } from '../data';
import Header from 'components/Game/Header/Header';
import Filters from 'components/Game/Filters/Filters';
import Content from 'components/Game/Content/Content';

const Game = () => {
  const [situationFilter, setSituationFilter] = useState('All');
  const [viewMode, setViewMode] = useState('mode-1');

  return (
    <div>
      <Header inningsData={inningsData} gameInfoData={gameInfoData} teamNames={teamNames} />
      <div className='container'>
        <Filters
          situationFilter={situationFilter}
          setSituationFilter={setSituationFilter}
          viewMode={viewMode}
          setViewMode={setViewMode}
          situations={situationsList}
        />
        <Content viewMode={viewMode} />
      </div>
    </div>
  );
};

export default Game;
