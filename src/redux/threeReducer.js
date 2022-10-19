const defaultState = {
  count: 7,
	isStars: true,
	isEvents: true
};

const SET_COUNT = 'SET_COUNT';
const SET_IS_STARS = 'SET_IS_STARS';
const SET_IS_EVENTS = 'SET_IS_EVENTS';

export const threeReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_COUNT:
      return { ...state, count: action.payload };
    case SET_IS_STARS:
      return { ...state, isStars: action.payload };
    case SET_IS_EVENTS:
      return { ...state, isEvents: action.payload };
    default:
      return state;
  }
};

export const setCount = payload => ({ type: SET_COUNT, payload });
export const setIsStars = payload => ({ type: SET_IS_STARS, payload });
export const setIsEvents = payload => ({ type: SET_IS_EVENTS, payload });