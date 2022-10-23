import React from 'react';
import cl from './ModalCameraSelector.module.scss';
import ModalCross from 'images/modal_cross.png';
import { setIsCameraSelector } from 'redux/gameReducer';
import { useDispatch } from 'react-redux';

const ModalCameraSelector = () => {
  const dispatch = useDispatch();

  return (
    <div className={cl.modalCameraSelectorWrapper}>
      <div className={cl.camerasContainer}></div>
      <button
        className={cl.modalCrossBtn}
        onClick={() => {
          dispatch(setIsCameraSelector(false));
        }}>
        <img src={ModalCross} alt='modal-cross' />
      </button>
    </div>
  );
};

export default ModalCameraSelector;
