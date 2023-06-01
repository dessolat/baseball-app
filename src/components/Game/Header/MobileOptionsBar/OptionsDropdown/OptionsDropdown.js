import BtnImg from 'icons/options_button_icon.svg';
import cl from './OptionsDropdown.module.scss';
import useComponentVisible from 'hooks/useComponentVisible';
import CrossClose from 'components/UI/buttons/CrossClose/CrossClose';
import SimpleToggler from 'components/UI/togglers/SimpleToggler/SimpleToggler';
import ComponentsTogglers from './ComponentsTogglers';
import PlayModesTogglers from './PlayModesTogglers';
import SpeedSelectors from './SpeedSelectors';
import classNames from 'classnames';

const OptionsDropdown = ({ panelStyles = null, mobileLandscapeVisible = false }) => {
  const {
    ref: menuRef,
    isComponentVisible: isOpen,
    setIsComponentVisible: setIsOpen
  } = useComponentVisible(false);

  const handleBtnClick = () => setIsOpen(prev => !prev);
  const handleCrossClick = () => setIsOpen(false);

  const wrapperClasses = classNames(cl.dropdownWrapper, {
    [cl.mobileLandscapeVisible]: mobileLandscapeVisible
  });
  return (
    <div className={wrapperClasses} ref={menuRef}>
      <button className={cl.optionsDropdown} onClick={handleBtnClick}>
        <img src={BtnImg} alt='options' />
      </button>
      {isOpen && (
        <div className={cl.optionsPanel} style={panelStyles}>
          <ComponentsTogglers />
          <div className={cl.landscapeWrapper}>
            <PlayModesTogglers />
            <SpeedSelectors />
          </div>
          <div className={cl.effectsToggler}>
            <div className={cl.row}>
              <span className={cl.title}>Effects</span>
              <SimpleToggler checked={false} onChange={() => {}} />
            </div>
          </div>
          <CrossClose
            handleCrossClick={handleCrossClick}
            style={{ left: 10, top: 10, width: 30, height: 30 }}
          />
        </div>
      )}
    </div>
  );
};

export default OptionsDropdown;
