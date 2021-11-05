import fullData from 'baseball.json';

const defaultState = { innings: fullData.innings, preview: fullData.preview };

const SET_FULL_DATA = 'SET_FULL_DATA';

export const gameReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_FULL_DATA:
      return { ...state, innings: action.payload.innings, preview: action.payload.preview };
    default:
      return state;
  }
};

export const setFullData = data => ({ type: SET_FULL_DATA, payload: data });
