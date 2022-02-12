const defaultState = {
  currentLeague: { id: 1, name: 'All' }
};

const SET_CURRENT_LEAGUE = 'SET_CURRENT_LEAGUE';

export const gamesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_CURRENT_LEAGUE:
      return { ...state, currentLeague: action.payload };

    default:
      return state;
  }
};

export const setCurrentLeague = payload => ({ type: SET_CURRENT_LEAGUE, payload });
