const defaultState = {
	games: [],
	leagues: [],
  currentLeague: { id: -1, name: 'All' },
  currentYear: new Date().getFullYear(),
  currentDate: new Date(),
  currentGameType: 'Baseball',
  currentStadium: 'All',
  currentHome: 'All',
  currentGuests: 'All',
  leaguesImages: {}
};

const SET_CURRENT_LEAGUE = 'SET_CURRENT_LEAGUE';
const SET_CURRENT_YEAR = 'SET_CURRENT_YEAR';
const SET_CURRENT_DATE = 'SET_CURRENT_DATE';
const SET_CURRENT_GAME_TYPE = 'SET_CURRENT_GAME_TYPE';
const SET_CURRENT_STADIUM = 'SET_CURRENT_STADIUM';
const SET_CURRENT_HOME = 'SET_CURRENT_HOME';
const SET_CURRENT_GUESTS = 'SET_CURRENT_GUESTS';
const ADD_LEAGUE_IMAGE = 'ADD_LEAGUE_IMAGE';
const RESET_TABLE_FILTERS = 'RESET_TABLE_FILTERS';

export const gamesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_CURRENT_LEAGUE:
      return { ...state, currentLeague: action.payload };
    case SET_CURRENT_YEAR:
      return { ...state, currentYear: action.payload };
    case SET_CURRENT_DATE:
      return { ...state, currentDate: action.payload };
    case SET_CURRENT_GAME_TYPE:
      return { ...state, currentGameType: action.payload };
    case SET_CURRENT_STADIUM:
      return { ...state, currentStadium: action.payload };
    case SET_CURRENT_HOME:
      return { ...state, currentHome: action.payload };
    case SET_CURRENT_GUESTS:
      return { ...state, currentGuests: action.payload };
    case ADD_LEAGUE_IMAGE:
      return { ...state, leaguesImages: { ...state.leaguesImages, ...action.payload } };
    case RESET_TABLE_FILTERS:
      return { ...state, currentStadium: 'All', currentHome: 'All', currentGuests: 'All' };
    default:
      return state;
  }
};

export const setCurrentLeague = payload => ({ type: SET_CURRENT_LEAGUE, payload });
export const setCurrentYear = payload => ({ type: SET_CURRENT_YEAR, payload });
export const setCurrentDate = payload => ({ type: SET_CURRENT_DATE, payload });
export const setCurrentGameType = payload => ({ type: SET_CURRENT_GAME_TYPE, payload });
export const setCurrentStadium = payload => ({ type: SET_CURRENT_STADIUM, payload });
export const setCurrentHome = payload => ({ type: SET_CURRENT_HOME, payload });
export const setCurrentGuests = payload => ({ type: SET_CURRENT_GUESTS, payload });
export const addLeagueImage = payload => ({ type: ADD_LEAGUE_IMAGE, payload });
export const resetTableFilters = () => ({ type: RESET_TABLE_FILTERS });
