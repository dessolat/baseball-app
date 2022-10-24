import React from 'react';
import cl from './ModalCameraSelector.module.scss';
import ModalCross from 'images/modal_cross.png';
import { setIsCameraSelector } from 'redux/gameReducer';
import { useDispatch } from 'react-redux';

const ModalCameraSelector = () => {
  const dispatch = useDispatch();

  const CAMERAS = [
    { number: 1, isActive: true, title: 'Base left main' },
    { number: 2, isActive: false, title: 'Base right main' },
    { number: 3, isActive: true, title: 'Base left add' },
    { number: 4, isActive: false, title: 'Base right add' },
    { number: 5, isActive: false, title: 'Bat left' },
    { number: 6, isActive: false, title: 'Bat right' },
    { number: 7, isActive: true, title: 'Pitch' },
    { number: 8, isActive: true, title: 'IP' }
  ];
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
