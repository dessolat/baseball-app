import fullData from 'baseball.json';

const defaultState = { innings: fullData.innings, preview: fullData.preview, inningNumber: null };

const SET_FULL_DATA = 'SET_FULL_DATA';
const SET_INNING_NUMBER = 'SET_INNING_NUMBER';

export const gameReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_FULL_DATA:
      return { ...state, innings: action.payload.innings, preview: action.payload.preview };
    case SET_INNING_NUMBER:
      return { ...state, inningNumber: action.payload };
    default:
      return state;
  }
};

export const setFullData = data => ({ type: SET_FULL_DATA, payload: data });
export const setInningNumber = number => ({ type: SET_INNING_NUMBER, payload: number });
