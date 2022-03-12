const defaultState = {
  teamData: null
};

const SET_TEAM_DATA = 'SET_TEAM_DATA';

export const teamGamesReducer = (state = defaultState, action) => {
  switch (action.type) {

    case SET_TEAM_DATA:
      return { ...state, teamData: action.payload };
    default:
      return state;
  }
};

export const setTeamData = payload => ({ type: SET_TEAM_DATA, payload });