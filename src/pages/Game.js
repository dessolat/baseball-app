import React, { useState } from 'react';
import { inningsData, gameInfoData, teamNames, situationsList } from '../data';
import GameHeader from '../components/GameHeader/GameHeader';
import GameFiltersPanel from '../components/GameFiltersPanel/GameFiltersPanel';

const Game = () => {
  const [situationFilter, setSituationFilter] = useState('All');
	const [viewMode, setViewMode] = useState('mode-1')

  return (
    <div>
      <GameHeader inningsData={inningsData} gameInfoData={gameInfoData} teamNames={teamNames} />
      <GameFiltersPanel
        situationFilter={situationFilter}
        setSituationFilter={setSituationFilter}
				viewMode={viewMode}
				setViewMode={setViewMode}
        situationsList={situationsList}
      />
    </div>
  );
};

export default Game;
