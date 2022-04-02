const defaultState = {
  teamData: [],
	mobileTableMode: 'Players'
};

const SET_TEAM_DATA = 'SET_TEAM_DATA';
const SET_MOBILE_TEAM_GAMES_TABLE_MODE = 'SET_MOBILE_TEAM_GAMES_TABLE_MODE';

export const teamGamesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_TEAM_DATA:
      return { ...state, teamData: action.payload };
    case SET_MOBILE_TEAM_GAMES_TABLE_MODE:
      return { ...state, mobileTableMode: action.payload };
    default:
      return state;
  }
};

export const setTeamData = payload => ({ type: SET_TEAM_DATA, payload });
export const setMobileTableMode = payload => ({ type: SET_MOBILE_TEAM_GAMES_TABLE_MODE, payload });