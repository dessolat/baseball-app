const defaultState = {
  innings: [],
  preview: {},
  inningNumber: 1,
  situations: ['All'],
  situationFilter: 'All',
  currentCard: {},
	filteredCards: [],
  playbackMode: 'play',
  viewMode: 'mode-1',
  gameId: 0
};

const SET_FULL_DATA = 'SET_FULL_DATA';
const SET_INNING_NUMBER = 'SET_INNING_NUMBER';
const SET_SITUATIONS = 'SET_SITUATIONS';
const SET_SITUATION_FILTER = 'SET_SITUATION_FILTER';
const SET_CURRENT_CARD = 'SET_CURRENT_CARD';
const SET_FILTERED_CARDS = 'SET_FILTERED_CARDS';
const SET_PLAYBACK_MODE = 'SET_PLAYBACK_MODE';
const SET_VIEW_MODE = 'SET_VIEW_MODE';
const SET_GAME_ID = 'SET_GAME_ID';

export const gameReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_FULL_DATA:
      return { ...state, innings: action.payload.innings, preview: action.payload.preview };
    case SET_INNING_NUMBER:
      return { ...state, inningNumber: action.payload };
    case SET_SITUATIONS:
      return { ...state, situations: action.payload };
    case SET_SITUATION_FILTER:
      return { ...state, situationFilter: action.payload };
    case SET_CURRENT_CARD:
      return { ...state, currentCard: action.payload };
    case SET_FILTERED_CARDS:
      return { ...state, filteredCards: action.payload };
    case SET_PLAYBACK_MODE:
      return { ...state, playbackMode: action.payload };
    case SET_VIEW_MODE:
      return { ...state, viewMode: action.payload };
    case SET_GAME_ID:
      return { ...state, gameId: action.payload };
    default:
      return state;
  }
};

export const setFullData = payload => ({ type: SET_FULL_DATA, payload });
export const setInningNumber = payload => ({ type: SET_INNING_NUMBER, payload });
export const setSituations = payload => ({ type: SET_SITUATIONS, payload });
export const setSituationFilter = payload => ({ type: SET_SITUATION_FILTER, payload });
export const setCurrentCard = payload => ({ type: SET_CURRENT_CARD, payload });
export const setFilteredCards = payload => ({ type: SET_FILTERED_CARDS, payload });
export const setPlaybackMode = payload => ({ type: SET_PLAYBACK_MODE, payload });
export const setViewMode = payload => ({ type: SET_VIEW_MODE, payload });
export const setGameId = payload => ({ type: SET_GAME_ID, payload });
