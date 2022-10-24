import React from 'react';
import cl from './ModalCameraSelector.module.scss';
import ModalCross from 'images/modal_cross.png';
import { setIsCameraSelector } from 'redux/gameReducer';
import { useDispatch } from 'react-redux';
import CameraList from './CameraList';

const ModalCameraSelector = () => {
  const dispatch = useDispatch();

  const handleCloseBtnClick = () => dispatch(setIsCameraSelector(false));
  return (
    <div className={cl.modalCameraSelectorWrapper} onClick={handleCloseBtnClick}>
      <div className={cl.modalCameraSelectorInnerWrapper} onClick={e => e.stopPropagation()}>
        <CameraList />
        <button className={cl.modalCrossBtn} onClick={handleCloseBtnClick}>
          <img src={ModalCross} alt='modal-cross' />
        </button>
      </div>
    </div>
  );
};

export default ModalCameraSelector;
