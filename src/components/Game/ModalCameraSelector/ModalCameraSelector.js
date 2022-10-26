import React from 'react';
import cl from './ModalCameraSelector.module.scss';
import ModalCross from 'images/modal_cross.png';
import { setIsCameraSelector } from 'redux/gameReducer';
import { useDispatch } from 'react-redux';
import CameraList from './CameraList';
import Cross from 'components/UI/buttons/Cross/Cross';

const ModalCameraSelector = ({ activeNumber }) => {
  const dispatch = useDispatch();

  const handleCloseBtnClick = () => dispatch(setIsCameraSelector(false));
  return (
    <div className={cl.modalCameraSelectorWrapper} onClick={handleCloseBtnClick}>
      <div className={cl.modalCameraSelectorInnerWrapper} onClick={e => e.stopPropagation()}>
        <CameraList />
        <Cross imgSrc={ModalCross} handleClick={handleCloseBtnClick} alt='close-btn' />
      </div>
    </div>
  );
};

export default ModalCameraSelector;
