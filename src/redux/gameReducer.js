import fullData from 'baseball.json';

const defaultState = {
  innings: fullData.innings,
  preview: fullData.preview,
  inningNumber: null,
  situationFilter: 'All',
  viewMode: 'mode-1'
};

const SET_FULL_DATA = 'SET_FULL_DATA';
const SET_INNING_NUMBER = 'SET_INNING_NUMBER';
const SET_SITUATION_FILTER = 'SET_SITUATION_FILTER';
const SET_VIEW_MODE = 'SET_VIEW_MODE'

export const gameReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_FULL_DATA:
      return { ...state, innings: action.payload.innings, preview: action.payload.preview };
    case SET_INNING_NUMBER:
      return { ...state, inningNumber: action.payload };
    case SET_SITUATION_FILTER:
      return { ...state, situationFilter: action.payload };
    case SET_VIEW_MODE:
      return { ...state, viewMode: action.payload };
    default:
      return state;
  }
};

export const setFullData = payload => ({ type: SET_FULL_DATA, payload });
export const setInningNumber = payload => ({ type: SET_INNING_NUMBER, payload });
export const setSituationFilter = payload => ({ type: SET_SITUATION_FILTER, payload });
export const setViewMode = payload => ({ type: SET_VIEW_MODE, payload });
