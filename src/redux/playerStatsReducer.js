const defaultState = {
  playerStatsData: {},
  playerCurrentTeam: 'All teams',
  tableType: 'Batting',
  sortField: { Batting: 'AB', Fielding: 'CH', Running: 'SB', Pitching: 'GS' }
};

const SET_PLAYER_STATS_DATA = 'SET_PLAYER_STATS_DATA';
const SET_PLAYER_CURRENT_TEAM = 'SET_PLAYER_CURRENT_TEAM';
const SET_TABLE_TYPE = 'SET_TABLE_TYPE';
const SET_PLAYER_SORT_FIELD = 'SET_PLAYER_SORT_FIELD';

export const playerStatsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_PLAYER_STATS_DATA:
      return { ...state, playerStatsData: action.payload };
    case SET_PLAYER_CURRENT_TEAM:
      return { ...state, playerCurrentTeam: action.payload };
    case SET_TABLE_TYPE:
      return { ...state, tableType: action.payload };
    case SET_PLAYER_SORT_FIELD:
      return { ...state, sortField: { ...state.sortField, [state.tableType]: action.payload } };
    default:
      return state;
  }
};

export const setPlayerStatsData = payload => ({ type: SET_PLAYER_STATS_DATA, payload });
export const setPlayerCurrentTeam = payload => ({ type: SET_PLAYER_CURRENT_TEAM, payload });
export const setTableType = payload => ({ type: SET_TABLE_TYPE, payload });
export const setSortField = payload => ({ type: SET_PLAYER_SORT_FIELD, payload });
