import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setVideoLengthMode } from 'redux/gameReducer';
import ModeListItem from './ModeListItem';
import cl from './VideoOptions.module.scss';

const ModeList = props => {
  const videoLengthMode = useSelector(state => state.game.videoLengthMode);

  const dispatch = useDispatch();

  const MODES = ['Full', 'Short', 'Super Short'];

  const handleModeClick = name => () => dispatch(setVideoLengthMode(name));
  return (
    <ul className={cl.modeList} {...props}>
      {MODES.map((mode, i) => (
        <ModeListItem key={i} mode={mode} currentMode={videoLengthMode} handleModeClick={handleModeClick} />
      ))}
    </ul>
  );
};

export default ModeList;
