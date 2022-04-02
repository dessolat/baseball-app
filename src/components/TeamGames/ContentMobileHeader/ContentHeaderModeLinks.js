import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMobileTableMode } from 'redux/teamGamesReducer';
import cl from './ContentMobileHeader.module.scss';

const ContentHeaderModeLinks = () => {
  const isMobile = useSelector(state => state.shared.isMobile);
  const mobileTableMode = useSelector(state => state.teamGames.mobileTableMode);
  const dispatch = useDispatch();

  const handleModeClick = mode => () => dispatch(setMobileTableMode(mode));
  const getClassName = title => mobileTableMode === title ? cl.active : null;
  return (
    <div className={cl.tableModes}>
      <button onClick={handleModeClick('Players')} className={getClassName('Players')}>
        Players
      </button>
      <button onClick={handleModeClick('Calendar')} className={getClassName('Calendar')}>
        Calendar
      </button>
    </div>
  );
};

export default ContentHeaderModeLinks;
