const defaultState = {
  statsData: [],
	tableMode: 'Batting'
};

const SET_STATS_DATA = 'SET_STATS_DATA';
const SET_TABLE_MODE = 'SET_TABLE_MODE';

export const statsReducer = (state = defaultState, action) => {
  switch (action.type) {

    case SET_STATS_DATA:
      return { ...state, statsData: action.payload };
    case SET_TABLE_MODE:
      return { ...state, tableMode: action.payload };
    default:
      return state;
  }
};

export const setStatsData = payload => ({ type: SET_STATS_DATA, payload });
export const setTableMode = payload => ({ type: SET_TABLE_MODE, payload });