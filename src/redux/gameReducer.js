const defaultState = [];

const SET_FULL_DATA = 'SET_FULL_DATA';

export const gameReducer = (state = defaultState, action) => {
  switch (action) {
    case SET_FULL_DATA:
      return action.payload;
    default:
      return state;
  }
};

export const setFullData = data => ({ type: SET_FULL_DATA, payload: data });
