import { combineReducers } from 'redux';
import { gameReducer } from './gameReducer';
import { gamesReducer } from './gamesReducer';

const rootReducer = combineReducers({ game: gameReducer, games: gamesReducer });

export default rootReducer