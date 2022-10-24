import React from 'react';
import cl from './ModalCameraSelector.module.scss';
import ModalCross from 'images/modal_cross.png';
import { setIsCameraSelector } from 'redux/gameReducer';
import { useDispatch } from 'react-redux';
import CameraList from './CameraList';

const ModalCameraSelector = () => {
  const dispatch = useDispatch();

  return (
    <div className={cl.modalCameraSelectorWrapper}>
      <div className={cl.modalCameraSelectorInnerWrapper}>
        <CameraList />
        <button
          className={cl.modalCrossBtn}
          onClick={() => {
            dispatch(setIsCameraSelector(false));
          }}>
          <img src={ModalCross} alt='modal-cross' />
        </button>
      </div>
    </div>
  );
};

export default ModalCameraSelector;
