import cl from './OptionsDropdown.module.scss';
import FirstLastMoment from 'components/UI/buttons/FirstLastMoment/FirstLastMoment';
import ForwardRepeat from 'components/UI/buttons/ForwardRepeat/ForwardRepeat';

const PlayModesTogglers = () => {
  return (
    <div className={cl.playModesTogglers}>
      <div className={cl.buttonWrapper}>
        <ForwardRepeat
          playbackMode='play'
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            flexGap: 5
          }}
        />
      </div>
      <div className={cl.buttonWrapper}>
        <FirstLastMoment isLastMomentMode={false} />
      </div>
    </div>
  );
};

export default PlayModesTogglers;
