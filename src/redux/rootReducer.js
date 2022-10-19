import { combineReducers } from 'redux';
import { gameReducer } from './gameReducer';
import { gamesReducer } from './gamesReducer';
import { playerStatsReducer } from './playerStatsReducer';
import { sharedReducer } from './sharedReducer';
import { statsReducer } from './statsReducer';
import { teamGamesReducer } from './teamGamesReducer';
import { threeReducer } from './threeReducer';

const rootReducer = combineReducers({
  game: gameReducer,
  games: gamesReducer,
  teamGames: teamGamesReducer,
	stats: statsReducer,
	playerStats: playerStatsReducer,
  shared: sharedReducer,
	three: threeReducer
});

export default rootReducer;
