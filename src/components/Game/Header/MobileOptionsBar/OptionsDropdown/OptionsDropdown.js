import BtnImg from 'icons/options_button_icon.svg';
import cl from './OptionsDropdown.module.scss';
import useComponentVisible from 'hooks/useComponentVisible';
import CrossClose from 'components/UI/buttons/CrossClose/CrossClose';
import SimpleToggler from 'components/UI/togglers/SimpleToggler/SimpleToggler';
import ComponentsTogglers from './ComponentsTogglers';
import PlayModesTogglers from './PlayModesTogglers';

const OptionsDropdown = () => {
  const {
    ref: menuRef,
    isComponentVisible: isOpen,
    setIsComponentVisible: setIsOpen
  } = useComponentVisible(false);

  const handleBtnClick = () => setIsOpen(prev => !prev);
  const handleCrossClick = () => setIsOpen(false);
  return (
    <div className={cl.dropdownWrapper} ref={menuRef}>
      <button className={cl.optionsDropdown} onClick={handleBtnClick}>
        <img src={BtnImg} alt='options' />
      </button>
      {isOpen && (
        <div className={cl.optionsPanel}>
          <ComponentsTogglers />
          <PlayModesTogglers />
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
