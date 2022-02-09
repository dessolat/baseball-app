const defaultState = {
  innings: [],
  preview: {},
  inningNumber: 1,
  situations: ['All'],
  situationFilter: 'All',
  currentCard: {},
	currentMoment: {},
	playersInfo: {},
	imagesData: {},
	filteredCards: [],
  playbackMode: 'pause',
  viewMode: 'mode-1',
  currentGameId: null,
	activeCardList: 'cards',
	boxActiveButton: 'guests',
	isVideo: false
};

const SET_FULL_DATA = 'SET_FULL_DATA';
const SET_INNING_NUMBER = 'SET_INNING_NUMBER';
const SET_SITUATIONS = 'SET_SITUATIONS';
const SET_SITUATION_FILTER = 'SET_SITUATION_FILTER';
const SET_CURRENT_CARD = 'SET_CURRENT_CARD';
const SET_CURRENT_MOMENT = 'SET_CURRENT_MOMENT';
const SET_PLAYERS_INFO = 'SET_PLAYERS_INFO';
const SET_IMAGES_DATA = 'SET_IMAGES_DATA';
const SET_FILTERED_CARDS = 'SET_FILTERED_CARDS';
const SET_PLAYBACK_MODE = 'SET_PLAYBACK_MODE';
const SET_VIEW_MODE = 'SET_VIEW_MODE';
const SET_CURRENT_GAME_ID = 'SET_CURRENT_GAME_ID';
const SET_ACTIVE_CARD_LIST = 'SET_ACTIVE_CARD_LIST';
const SET_BOX_ACTIVE_BUTTON = 'SET_BOX_ACTIVE_BUTTON';
const SET_IS_VIDEO = 'SET_IS_VIDEO';
const RESET_DATA = 'RESET_DATA';

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
    case SET_CURRENT_MOMENT:
      return { ...state, currentMoment: action.payload };
    case SET_PLAYERS_INFO:
      return { ...state, playersInfo: action.payload };
    case SET_IMAGES_DATA:
      return { ...state, imagesData: {...state.imagesData, ...action.payload} };
    case SET_FILTERED_CARDS:
      return { ...state, filteredCards: action.payload };
    case SET_PLAYBACK_MODE:
      return { ...state, playbackMode: action.payload };
    case SET_VIEW_MODE:
      return { ...state, viewMode: action.payload };
    case SET_CURRENT_GAME_ID:
      return { ...state, currentGameId: action.payload };
    case SET_ACTIVE_CARD_LIST:
      return { ...state, activeCardList: action.payload };
    case SET_BOX_ACTIVE_BUTTON:
      return { ...state, boxActiveButton: action.payload };
    case SET_IS_VIDEO:
      return { ...state, isVideo: action.payload };
    case RESET_DATA:
      return defaultState;
    default:
      return state;
  }
};

export const setFullData = payload => ({ type: SET_FULL_DATA, payload });
export const setInningNumber = payload => ({ type: SET_INNING_NUMBER, payload });
export const setSituations = payload => ({ type: SET_SITUATIONS, payload });
export const setSituationFilter = payload => ({ type: SET_SITUATION_FILTER, payload });
export const setCurrentCard = payload => ({ type: SET_CURRENT_CARD, payload });
export const setCurrentMoment = payload => ({ type: SET_CURRENT_MOMENT, payload });
export const setPlayersInfo = payload => ({ type: SET_PLAYERS_INFO, payload });
export const setImagesData = payload => ({ type: SET_IMAGES_DATA, payload });
export const setFilteredCards = payload => ({ type: SET_FILTERED_CARDS, payload });
export const setPlaybackMode = payload => ({ type: SET_PLAYBACK_MODE, payload });
export const setViewMode = payload => ({ type: SET_VIEW_MODE, payload });
export const setCurrentGameId = payload => ({ type: SET_CURRENT_GAME_ID, payload });
export const setActiveCardList = payload => ({ type: SET_ACTIVE_CARD_LIST, payload });
export const setBoxActiveButton = payload => ({ type: SET_BOX_ACTIVE_BUTTON, payload });
export const setIsVideo = payload => ({ type: SET_IS_VIDEO, payload });
export const resetData = () => ({ type: RESET_DATA });
