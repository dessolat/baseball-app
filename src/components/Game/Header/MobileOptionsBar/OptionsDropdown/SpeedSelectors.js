import classNames from 'classnames';
import cl from './OptionsDropdown.module.scss';
import { setVideoLengthMode, setVideoPlaybackRate } from 'redux/gameReducer';
import { useDispatch, useSelector } from 'react-redux';

const SpeedOption = ({ speed, handleOptionClick }) => {
  const videoPlaybackRate = useSelector(state => state.game.videoPlaybackRate);

  const optionsClasses = classNames(cl.speedOption, {
    [cl.active]: videoPlaybackRate === speed
  });
  return (
    <div className={optionsClasses} onClick={handleOptionClick(speed)}>
      {speed}
    </div>
  );
};

const VideoMode = ({ mode, handleModeClick }) => {
  const videoLengthMode = useSelector(state => state.game.videoLengthMode);
console.log(videoLengthMode);
  return (
    <label className={cl.row}>
      <input type='radio' onClick={handleModeClick(mode)} checked={videoLengthMode === mode} />
      <p>{mode}</p>
    </label>
  );
};

const SpeedSelectors = () => {
  const dispatch = useDispatch();

  const handleVideoModeClick = name => () => dispatch(setVideoLengthMode(name));

  const handleSpeedOptionClick = option => () => {
    dispatch(setVideoPlaybackRate(option));
  };

  const speedsArr = [0.25, 1, 2];
  const videoModes = ['Full', 'Short', 'Super Short'];
  return (
    <div className={cl.speedSelectors}>
      <div className={cl.playbackSpeed}>
        <p>Speed</p>
        <div className={cl.speedValues}>
          {speedsArr.map((speed, i) => (
            <SpeedOption key={i} speed={speed} handleOptionClick={handleSpeedOptionClick} />
          ))}
        </div>
      </div>
      <div className={cl.timeIntervalTogglers}>
        {videoModes.map((videoMode, i) => (
          <VideoMode key={i} mode={videoMode} handleModeClick={handleVideoModeClick} />
        ))}
      </div>
    </div>
  );
};

export default SpeedSelectors;
