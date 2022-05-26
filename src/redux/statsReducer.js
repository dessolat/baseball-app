const defaultState = {
  statsData: [],
  tableMode: 'Batting',
  sortField: { Batting: 'G', 'Fielding / Running': 'G', Pitching: 'G' },
  sortDirection: 'desc'
};

const SET_STATS_DATA = 'SET_STATS_DATA';
const SET_TABLE_MODE = 'SET_TABLE_MODE';
const SET_SORT_FIELD = 'SET_SORT_FIELD';
const SET_SORT_DIRECTION = 'SET_SORT_DIRECTION';

export const statsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_STATS_DATA:
      return { ...state, statsData: action.payload };
    case SET_TABLE_MODE:
      return { ...state, tableMode: action.payload };
    case SET_SORT_FIELD:
      return { ...state, sortField: { ...state.sortField, [state.tableMode]: action.payload } };
    case SET_SORT_DIRECTION:
      return { ...state, sortDirection: action.payload };
    default:
      return state;
  }
};

export const setStatsData = payload => ({ type: SET_STATS_DATA, payload });
export const setTableMode = payload => ({ type: SET_TABLE_MODE, payload });
export const setSortField = payload => ({ type: SET_SORT_FIELD, payload });
export const setSortDirection = payload => ({ type: SET_SORT_DIRECTION, payload });
