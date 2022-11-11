const defaultState = {
  innings: [],
  preview: {},
  inningNumber: 1,
  situations: ['All'],
  situationFilter: 'All',
  currentCard: {}, 
  currentTab: 'pitch', 
  currentMoment: {},
  playersInfo: {},
  imagesData: {},
  filteredCards: [],
  playbackMode: 'pause',
  viewMode: 'mode-1',
  currentGameId: null,
  activeCardList: 'cards',
  boxActiveButton: 'guests',
  isVideo: false,
  pitchState: 'Field',
  errorMsg: null,
	playerCardFilter: '',
	videoPlaybackRate: 1,
	videoState: null,
	isFilteredPlayer: true,
	isCameraSelector: false,
	moments: [],
	isFullscreen: false,
	videoCurrentTime: 0
};

const SET_FULL_DATA = 'SET_FULL_DATA';
const SET_INNING_NUMBER = 'SET_INNING_NUMBER';
const SET_SITUATIONS = 'SET_SITUATIONS';
const SET_SITUATION_FILTER = 'SET_SITUATION_FILTER';
const SET_CURRENT_CARD = 'SET_CURRENT_CARD';
const SET_CURRENT_TAB = 'SET_CURRENT_TAB';
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
const SET_PITCH_STATE = 'SET_PITCH_STATE';
const RESET_DATA = 'RESET_DATA';
const SET_ERROR_MSG = 'SET_ERROR_MSG';
const SET_PLAYER_CARD_FILTER = 'SET_PLAYER_CARD_FILTER';
const SET_VIDEO_PLAYBACK_RATE = 'SET_VIDEO_PLAYBACK_RATE';
const SET_VIDEO_STATE = 'SET_VIDEO_STATE';
const SET_IS_FILTERED_PLAYER = 'SET_IS_FILTERED_PLAYER';
const SET_IS_CAMERA_SELECTOR = 'SET_IS_CAMERA_SELECTOR';
const SET_MOMENTS = 'SET_MOMENTS';
const SET_IS_FULLSCREEN = 'SET_IS_FULLSCREEN';
const SET_VIDEO_CURRENT_TIME = 'SET_VIDEO_CURRENT_TIME';

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
    case SET_CURRENT_TAB:
      return { ...state, currentTab: action.payload };
    case SET_CURRENT_MOMENT:
      return { ...state, currentMoment: action.payload };
    case SET_PLAYERS_INFO:
      return { ...state, playersInfo: action.payload };
    case SET_IMAGES_DATA:
      return { ...state, imagesData: { ...state.imagesData, ...action.payload } };
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
    case SET_PITCH_STATE:
      return { ...state, pitchState: action.payload };
    case RESET_DATA:
      return defaultState;
    case SET_ERROR_MSG:
      return { ...state, errorMsg: action.payload };
    case SET_PLAYER_CARD_FILTER:
      return { ...state, playerCardFilter: action.payload };
    case SET_VIDEO_PLAYBACK_RATE:
      return { ...state, videoPlaybackRate: action.payload };
    case SET_VIDEO_STATE:
      return { ...state, videoState: action.payload };
    case SET_IS_FILTERED_PLAYER:
      return { ...state, isFilteredPlayer: action.payload };
    case SET_IS_CAMERA_SELECTOR:
      return { ...state, isCameraSelector: action.payload };
    case SET_MOMENTS:
      return { ...state, moments: action.payload };
    case SET_IS_FULLSCREEN:
      return { ...state, isFullscreen: action.payload };
    case SET_VIDEO_CURRENT_TIME:
      return { ...state, videoCurrentTime: action.payload };
    default:
      return state;
  }
};

export const setFullData = payload => ({ type: SET_FULL_DATA, payload });
export const setInningNumber = payload => ({ type: SET_INNING_NUMBER, payload });
export const setSituations = payload => ({ type: SET_SITUATIONS, payload });
export const setSituationFilter = payload => ({ type: SET_SITUATION_FILTER, payload });
export const setCurrentCard = payload => ({ type: SET_CURRENT_CARD, payload });
export const setCurrentTab = payload => ({ type: SET_CURRENT_TAB, payload });
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
export const setPitchState = payload => ({ type: SET_PITCH_STATE, payload });
export const resetData = () => ({ type: RESET_DATA });
export const setErrorMsg = payload => ({ type: SET_ERROR_MSG, payload });
export const setPlayerCardFilter = payload => ({ type: SET_PLAYER_CARD_FILTER, payload });
export const setVideoPlaybackRate = payload => ({ type: SET_VIDEO_PLAYBACK_RATE, payload });
export const setVideoState = payload => ({ type: SET_VIDEO_STATE, payload });
export const setIsFilteredPlayer = payload => ({ type: SET_IS_FILTERED_PLAYER, payload });
export const setIsCameraSelector = payload => ({ type: SET_IS_CAMERA_SELECTOR, payload });
export const setMoments = payload => ({ type: SET_MOMENTS, payload });
export const setIsFullscreen = payload => ({ type: SET_IS_FULLSCREEN, payload });
export const setVideoCurrentTime = payload => ({ type: SET_VIDEO_CURRENT_TIME, payload });
