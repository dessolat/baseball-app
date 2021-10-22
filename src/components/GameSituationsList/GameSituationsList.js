import React, { forwardRef } from 'react';
import GameSituationsListItem from '../GameSituationsListItem';
import cl from './GameSituationsList.module.scss';

const GameSituationsList = forwardRef((props, ref) => {
	const {situationFilter, situations, handleClick} = props

  return (
    <ul ref={ref} className={cl.situationsList}>
      {situations.map((situation, i) => (
        <GameSituationsListItem
          key={i}
          situationFilter={situationFilter}
          situation={situation}
          handleClick={handleClick}
          cl={cl}
        />
      ))}
    </ul>
  );
});

export default GameSituationsList;