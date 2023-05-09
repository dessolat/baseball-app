import BtnImg from 'icons/options_button_icon.svg';
import cl from './MobileOptionsBar.module.scss';
import useComponentVisible from 'hooks/useComponentVisible';

const OptionsDropdown = () => {
  const {
    ref: menuRef,
    isComponentVisible: isOpen,
    setIsComponentVisible: setIsOpen
  } = useComponentVisible(false);

  const handleBtnClick = () => setIsOpen(prev => !prev);
  return (
    <div className={cl.dropdownWrapper} ref={menuRef}>
      <button className={cl.optionsDropdown} onClick={handleBtnClick}>
        <img src={BtnImg} alt='options' />
      </button>
      {isOpen && <div className={cl.optionsPanel}></div>}
    </div>
  );
};

export default OptionsDropdown;
