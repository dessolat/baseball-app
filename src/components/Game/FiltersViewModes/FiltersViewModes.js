import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setViewMode } from 'redux/gameReducer';
import cl from './FiltersViewModes.module.scss';

const FiltersViewModes = () => {
  const viewMode = useSelector(state => state.game.viewMode);
  const dispatch = useDispatch();

  const handleModeClick = e => dispatch(setViewMode(e.currentTarget.name));
  const getClassName = mode => (viewMode === mode ? cl.active : '');

  return (
    <div className={cl.viewModes}>
      <button className={getClassName('mode-1')} name='mode-1' onClick={handleModeClick}>
        <div></div>
      </button>
      <button className={getClassName('mode-2')} name='mode-2' onClick={handleModeClick}>
        <div></div>
        <div></div>
      </button>
      {/* <button className={getClassName('mode-3')} name='mode-3' onClick={handleModeClick}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </button> */}
      <button className={getClassName('mode-4')} name='mode-4' onClick={handleModeClick}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </button>
    </div>
  );
};

export default FiltersViewModes;
