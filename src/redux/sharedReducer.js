const defaultState = {
  currentLeague: { id: -1, name: 'All' },
  currentYear: new Date().getFullYear(),
  currentDate: new Date(),
	currentLeaguesScroll: 0
};

const SET_CURRENT_LEAGUE = 'SET_CURRENT_LEAGUE';
const SET_CURRENT_YEAR = 'SET_CURRENT_YEAR';
const SET_CURRENT_DATE = 'SET_CURRENT_DATE';
const SET_CURRENT_LEAGUES_SCROLL = 'SET_CURRENT_LEAGUES_SCROLL';

export const sharedReducer = (state = defaultState, action) => {
  switch (action.type) {

    case SET_CURRENT_LEAGUE:
      return { ...state, currentLeague: action.payload };
    case SET_CURRENT_YEAR:
      return { ...state, currentYear: action.payload };
    case SET_CURRENT_DATE:
      return { ...state, currentDate: action.payload };
    case SET_CURRENT_LEAGUES_SCROLL:
      return { ...state, currentLeaguesScroll: action.payload };
    default:
      return state;
  }
};

export const setCurrentLeague = payload => ({ type: SET_CURRENT_LEAGUE, payload });
export const setCurrentYear = payload => ({ type: SET_CURRENT_YEAR, payload });
export const setCurrentDate = payload => ({ type: SET_CURRENT_DATE, payload });
export const setCurrentLeaguesScroll = payload => ({ type: SET_CURRENT_LEAGUES_SCROLL, payload });