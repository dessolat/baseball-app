import cl from './InfoDropdown.module.scss';
import useComponentVisible from 'hooks/useComponentVisible';
import classNames from 'classnames';
import ArrowDown from 'components/UI/icons/ArrowDown';
import InfoPanel from './InfoPanel';

const InfoDropdown = ({ panelStyles = null, mobileLandscapeVisible = false }) => {
  const {
    ref: menuRef,
    isComponentVisible: isOpen,
    setIsComponentVisible: setIsOpen
  } = useComponentVisible(false);

  const handleBtnClick = () => setIsOpen(prev => !prev);

  const wrapperClasses = classNames(cl.dropdownWrapper, {
    [cl.mobileLandscapeVisible]: mobileLandscapeVisible
  });
  return (
    <div className={wrapperClasses} ref={menuRef}>
      <button className={cl.infoDropdown} onClick={handleBtnClick}>
        Info <ArrowDown />
      </button>
      {isOpen && <InfoPanel panelStyles={panelStyles} setIsOpen={setIsOpen} />}
    </div>
  );
};

export default InfoDropdown;
