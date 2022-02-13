const defaultState = {
  currentLeague: { id: 1, name: 'All' },
	currentYear: new Date().getFullYear()
};

const SET_CURRENT_LEAGUE = 'SET_CURRENT_LEAGUE';
const SET_CURRENT_YEAR = 'SET_CURRENT_YEAR';

export const gamesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_CURRENT_LEAGUE:
      return { ...state, currentLeague: action.payload };
    case SET_CURRENT_YEAR:
      return { ...state, currentYear: action.payload };

    default:
      return state;
  }
};

export const setCurrentLeague = payload => ({ type: SET_CURRENT_LEAGUE, payload });
export const setCurrentYear = payload => ({ type: SET_CURRENT_YEAR, payload });
