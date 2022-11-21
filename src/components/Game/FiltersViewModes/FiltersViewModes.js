import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setIsCameraSelector, setSeekValue, setViewMode } from 'redux/gameReducer';
import cl from './FiltersViewModes.module.scss';
import GearIcon from 'icons/gear_icon.png';
import ModalCameraSelector from '../ModalCameraSelector/ModalCameraSelector';

const FiltersViewModes = () => {
  const activeNumberRef = useRef(1);

  const viewMode = useSelector(state => state.game.viewMode);
  const isCameraSelector = useSelector(state => state.game.isCameraSelector);

  const dispatch = useDispatch();

  const handleModeClick = e => {
    if (e.currentTarget.name === viewMode) {
      dispatch(setIsCameraSelector(true));
			return
    }
    dispatch(setViewMode(e.currentTarget.name));
    dispatch(setSeekValue(null));
    activeNumberRef.current = +e.currentTarget.name.slice(-1);
  };
  const getClassName = mode => (viewMode === mode ? cl.active : '');

  return (
    <>
      <div className={cl.viewModes}>
        <button className={getClassName('mode-1')} name='mode-1' onClick={handleModeClick}>
          <div className={cl.camera}>Auto</div>
          <img src={GearIcon} alt='gear-icon' />
        </button>
        <button className={getClassName('mode-2')} name='mode-2' onClick={handleModeClick}>
          <div className={cl.camera}>1</div>
          <div className={cl.camera}>3</div>
          <div className={cl.camera}>5</div>
          <div className={cl.camera}>7</div>
          <img src={GearIcon} alt='gear-icon' />
        </button>
        <button className={getClassName('mode-3')} name='mode-3' onClick={handleModeClick}>
          <div className={cl.camera}>2</div>
          <div className={cl.camera}>6</div>
          <div className={cl.camera}>4</div>
          <div className={cl.camera}>8</div>
          <img src={GearIcon} alt='gear-icon' />
        </button>
      </div>
      {isCameraSelector && <ModalCameraSelector activeNumber={activeNumberRef.current} />}
    </>
  );
};

export default FiltersViewModes;
