import BtnImg from 'icons/options_button_icon.svg';
import cl from './MobileOptionsBar.module.scss';
import useComponentVisible from 'hooks/useComponentVisible';
import CrossClose from 'components/UI/buttons/CrossClose/CrossClose';

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
          <CrossClose handleCrossClick={handleCrossClick} style={{ left: 10, top: 10 }} />
        </div>
      )}
    </div>
  );
};

export default OptionsDropdown;
