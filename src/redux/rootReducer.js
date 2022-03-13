import { combineReducers } from 'redux';
import { gameReducer } from './gameReducer';
import { gamesReducer } from './gamesReducer';
import { sharedReducer } from './sharedReducer';
import { statsReducer } from './statsReducer';
import { teamGamesReducer } from './teamGamesReducer';

const rootReducer = combineReducers({
  game: gameReducer,
  games: gamesReducer,
  teamGames: teamGamesReducer,
	stats: statsReducer,
  shared: sharedReducer
});

export default rootReducer;
