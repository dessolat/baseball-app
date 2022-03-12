import { combineReducers } from 'redux';
import { gameReducer } from './gameReducer';
import { gamesReducer } from './gamesReducer';
import { sharedReducer } from './sharedReducer';

const rootReducer = combineReducers({ game: gameReducer, games: gamesReducer, shared: sharedReducer });

export default rootReducer