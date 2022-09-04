import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMobileTableMode } from 'redux/teamGamesReducer';

const ContentHeaderModeLink = ({ title, cl }) => {
  const mobileTableMode = useSelector(state => state.teamGames.mobileTableMode);
  const dispatch = useDispatch();

  const handleModeClick = mode => () => dispatch(setMobileTableMode(mode));
  const getClassName = title => (mobileTableMode === title ? cl.active : null);

  return (
    <button onClick={handleModeClick(title)} className={getClassName(title)}>
      {title}
    </button>
  );
};

export default ContentHeaderModeLink;
