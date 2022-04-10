const defaultState = {
  playerStatsData: {},
	playerCurrentTeam: '',
	tableType: 'Batting'
};

const SET_PLAYER_STATS_DATA = 'SET_PLAYER_STATS_DATA';
const SET_PLAYER_CURRENT_TEAM = 'SET_PLAYER_CURRENT_TEAM';
const SET_TABLE_TYPE = 'SET_TABLE_TYPE';

export const playerStatsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_PLAYER_STATS_DATA:
      return { ...state, playerStatsData: action.payload };
    case SET_PLAYER_CURRENT_TEAM:
      return { ...state, playerCurrentTeam: action.payload };
    case SET_TABLE_TYPE:
      return { ...state, tableType: action.payload };
    default:
      return state;
  }
};

export const setPlayerStatsData = payload => ({ type: SET_PLAYER_STATS_DATA, payload });
export const setPlayerCurrentTeam = payload => ({ type: SET_PLAYER_CURRENT_TEAM, payload });
export const setTableType = payload => ({ type: SET_TABLE_TYPE, payload });