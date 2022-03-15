const defaultState = {
  statsData: []
};

const SET_STATS_DATA = 'SET_STATS_DATA';

export const playerStatsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_STATS_DATA:
      return { ...state, statsData: action.payload };
    default:
      return state;
  }
};

export const setStatsData = payload => ({ type: SET_STATS_DATA, payload });