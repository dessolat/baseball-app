import React from 'react';
import { inningsData, gameInfoData, teamNames } from '../data';
import GameHeader from '../components/GameHeader/GameHeader';

const Game = () => {
  return (
    <div>
      <GameHeader inningsData={inningsData} gameInfoData={gameInfoData} teamNames={teamNames} />
    </div>
  );
};

export default Game;
