import React from 'react';
import cl from './FiltersViewModes.module.scss';

const FiltersViewModes = ({handleModeClick, viewMode}) => {
  return (
    <div className={cl.viewModes}>
      <button className={viewMode === 'mode-1' ? cl.active : ''} name='mode-1' onClick={handleModeClick}>
        <div></div>
      </button>
      <button className={viewMode === 'mode-2' ? cl.active : ''} name='mode-2' onClick={handleModeClick}>
        <div></div>
        <div></div>
      </button>
      <button className={viewMode === 'mode-3' ? cl.active : ''} name='mode-3' onClick={handleModeClick}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </button>
      <button className={viewMode === 'mode-4' ? cl.active : ''} name='mode-4' onClick={handleModeClick}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </button>
    </div>
  );
};

export default FiltersViewModes;
