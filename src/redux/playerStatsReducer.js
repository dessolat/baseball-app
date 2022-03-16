const defaultState = {
  playerStatsData: {}
};

const SET_PLAYER_STATS_DATA = 'SET_PLAYER_STATS_DATA';

export const playerStatsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_PLAYER_STATS_DATA:
      return { ...state, playerStatsData: action.payload };
    default:
      return state;
  }
};

export const setPlayerStatsData = payload => ({ type: SET_PLAYER_STATS_DATA, payload });