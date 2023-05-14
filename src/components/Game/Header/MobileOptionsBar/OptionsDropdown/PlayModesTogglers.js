import cl from './OptionsDropdown.module.scss';
import FirstLastMoment from 'components/UI/buttons/FirstLastMoment/FirstLastMoment';
import ForwardRepeat from 'components/UI/buttons/ForwardRepeat/ForwardRepeat';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLastMomentMode, setPlaybackMode } from 'redux/gameReducer';

const PlayModesTogglers = () => {
  const playbackMode = useSelector(s => s.game.playbackMode);
  const isLastMomentMode = useSelector(s => s.game.isLastMomentMode);

  const dispatch = useDispatch();

  const playbackModeClick = e => {
    console.log(e);
    const newMode =
      e.currentTarget.name === 'play-pause' ? (playbackMode === 'play' ? 'pause' : 'play') : 'playOnline';
    dispatch(setPlaybackMode(newMode));
  };

  const handlefirstLastBtn = () => dispatch(setIsLastMomentMode());

  const getClassName = name => {
    if (
      (playbackMode !== 'playOnline' && name === 'play-pause') ||
      (playbackMode === 'playOnline' && name === 'play-online')
    )
      return cl.active;
    return '';
  };
  return (
    <div className={cl.playModesTogglers}>
      <label className={cl.buttonWrapper}>
        <ForwardRepeat
          playbackMode={playbackMode}
          className={getClassName('play-pause')}
          onClick={playbackModeClick}
          name='play-pause'
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            flexGap: 5
          }}
        />
      </label>
      <label className={cl.buttonWrapper}>
        <FirstLastMoment isLastMomentMode={isLastMomentMode} onClick={handlefirstLastBtn} />
      </label>
    </div>
  );
};

export default PlayModesTogglers;
