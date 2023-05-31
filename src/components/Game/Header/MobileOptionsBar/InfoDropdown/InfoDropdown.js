import cl from './InfoDropdown.module.scss';
import useComponentVisible from 'hooks/useComponentVisible';
import CrossClose from 'components/UI/buttons/CrossClose/CrossClose';
import classNames from 'classnames';
import ArrowDown from 'components/UI/icons/ArrowDown';

const InfoDropdown = ({ panelStyles = null, mobileLandscapeVisible = false }) => {
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
      <button className={cl.infoDropdown} onClick={handleBtnClick}>
        Info <ArrowDown />
      </button>
      {isOpen && (
        <div className={cl.infoPanel} style={panelStyles}>

          <CrossClose
            handleCrossClick={handleCrossClick}
            style={{ left: 10, top: 10, width: 30, height: 30 }}
          />
        </div>
      )}
    </div>
  );
};

export default InfoDropdown;
