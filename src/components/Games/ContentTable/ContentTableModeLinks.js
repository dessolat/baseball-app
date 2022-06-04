import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMobileTableMode } from 'redux/gamesReducer';
import { setSearchParam } from 'utils';
import cl from './ContentTable.module.scss';

const ContentTableModeLinks = () => {
  const mobileTableMode = useSelector(state => state.games.mobileTableMode);
  const dispatch = useDispatch();

  const handleModeClick = mode => () => {
    dispatch(setMobileTableMode(mode));
		setSearchParam('mode', mode)
  };
  return (
    <div className={cl.tableModes}>
			{mobileTableMode !== 'Calendar' && <button onClick={handleModeClick('Calendar')}>Calendar</button>}
      {mobileTableMode !== 'Team tablo/Leader' && (
        <button onClick={handleModeClick('Team tablo/Leader')}>Team tablo/Leader</button>
      )}
      {/* {mobileTableMode !== 'Leaders' && <button onClick={handleModeClick('Leaders')}>Leaders</button>} */}
    </div>
  );
};

export default ContentTableModeLinks;
