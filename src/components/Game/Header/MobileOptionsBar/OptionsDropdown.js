import BtnImg from 'icons/options_button_icon.svg';
import cl from './MobileOptionsBar.module.scss';
import useComponentVisible from 'hooks/useComponentVisible';
import CrossClose from 'components/UI/buttons/CrossClose/CrossClose';
import SimpleToggler from 'components/UI/togglers/SimpleToggler/SimpleToggler';
import FirstLastMoment from 'components/UI/buttons/FirstLastMoment/FirstLastMoment';
import ForwardRepeat from 'components/UI/buttons/ForwardRepeat/ForwardRepeat';
import { useDispatch, useSelector } from 'react-redux';
import { toggleIsMobileScoreboard, toggleIsMobileTimeline } from 'redux/sharedReducer';

const OptionsDropdown = () => {
  const {
    ref: menuRef,
    isComponentVisible: isOpen,
    setIsComponentVisible: setIsOpen
  } = useComponentVisible(false);

	const isMobileScoreboard = useSelector(s => s.shared.isMobileScoreboard)
	const isMobileTimeline = useSelector(s => s.shared.isMobileTimeline)

	const dispatch = useDispatch()

  const handleBtnClick = () => setIsOpen(prev => !prev);
  const handleCrossClick = () => setIsOpen(false);
  return (
    <div className={cl.dropdownWrapper} ref={menuRef}>
      <button className={cl.optionsDropdown} onClick={handleBtnClick}>
        <img src={BtnImg} alt='options' />
      </button>
      {isOpen && (
        <div className={cl.optionsPanel}>
          <div className={cl.componentsTogglers}>
            <div className={cl.row}>
              <span className={cl.title}>Scoreboard</span>
              <SimpleToggler checked={isMobileScoreboard} onChange={() => dispatch(toggleIsMobileScoreboard())} />
            </div>
            <div className={cl.row}>
              <span className={cl.title}>Timeline</span>
              <SimpleToggler checked={isMobileTimeline} onChange={() => dispatch(toggleIsMobileTimeline())} />
            </div>
          </div>
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
          <div className={cl.speedSelectors}>
            <div className={cl.playbackSpeed}>
              <p>Speed</p>
              <div className={cl.speedValues}>
                <div>0.25</div>
                <div style={{ borderBottom: '2px solid var(--side-color)', width: 14 }}>1</div>
                <div>2</div>
              </div>
            </div>
            <div className={cl.timeIntervalTogglers}>
              <label className={cl.row}>
                <input type='radio' checked={false} />
                <p>Full</p>
              </label>
              <label className={cl.row}>
                <input type='radio' checked={true} />
                <p>Short</p>
              </label>
              <label className={cl.row}>
                <input type='radio' checked={false} />
                <p>Super Short</p>
              </label>
            </div>
          </div>
          <div className={cl.effectsToggler}>
            <div className={cl.row}>
              <span className={cl.title}>Effects</span>
              <SimpleToggler checked={false} onChange={() => {}} />
            </div>
          </div>
          <CrossClose handleCrossClick={handleCrossClick} style={{ left: 10, top: 10 }} />
        </div>
      )}
    </div>
  );
};

export default OptionsDropdown;
