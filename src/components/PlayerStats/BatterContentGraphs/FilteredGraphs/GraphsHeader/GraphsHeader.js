import cl from './GraphsHeader.module.scss';
import OptionsToggler from 'components/UI/togglers/OptionsToggler/OptionsToggler';
import classNames from 'classnames';
import TimeDynamicCheckbox from 'components/UI/checkboxes/TimeDynamicCheckbox/TimeDynamicCheckbox';
import UpDownArrow from 'components/UI/buttons/UpDownArrow/UpDownArrow';
import ArrowDown from 'components/UI/icons/ArrowDown';

const GraphsHeader = ({
  optionsArr,
  availableOptions,
  title,
  subTitle,
  handleMobileDatasetFilterClick = null,
  currentOption,
  setCurrentOption,
  currentOption2 = null,
  setCurrentOption2 = null,
  currentOption3 = null,
  setCurrentOption3 = null,
  noSelector = false,
  graphsArrow = false,
  classColor = false,
  addedClass = null,
  ...props
}) => {
  const optionsTogglerStyles = {
    position: 'absolute',
    right: '.4375rem',
    top: currentOption2 !== null ? '30%' : '50%',
    transform: currentOption2 !== null ? 'translateY(-55%)' : 'translateY(-50%)'
  };

  const optionsToggler2Styles = {
    position: 'absolute',
    right: '.4375rem',
    bottom: '30%',
    transform: 'translateY(55%)'
  };

  const handleOptionClick = option => () => setCurrentOption(option);
  const handleOption2Click = option => () => {
    setCurrentOption2(prev =>
      prev.map(curOption =>
        curOption.name === option.name ? { ...curOption, checked: !curOption.checked } : curOption
      )
    );
  };

  const handleArrowClick = () => {
    setCurrentOption3(prev => (prev === 'opened' ? 'closed' : 'opened'));
  };

  const titleClasses = classNames(cl.title, {
    [cl.highTitle]: currentOption2 !== null
  });
  return (
    <div className={cl.graphsHeader + ' ' + addedClass} {...props}>
      <h3 className={cl.header}>{title}</h3>
      {handleMobileDatasetFilterClick && (
        <button className={cl.datasetBtn} onClick={handleMobileDatasetFilterClick}>
          Dataset filter <ArrowDown />
        </button>
      )}
      <p className={titleClasses}>{subTitle}</p>
      {graphsArrow && (
        <UpDownArrow
          style={{ height: '25%' }}
          up={currentOption3 === 'opened'}
          handleClick={handleArrowClick}
        />
      )}
      {!noSelector && (
        <OptionsToggler
          style={optionsTogglerStyles}
          optionsArr={optionsArr}
          currentOption={currentOption}
          handleOptionClick={handleOptionClick}
          noSort={currentOption2 !== null}
        />
      )}
      {currentOption2 !== null && (
        <TimeDynamicCheckbox
          style={optionsToggler2Styles}
          optionsArr={currentOption2}
          availableOptions={availableOptions}
          handleOptionClick={handleOption2Click}
          classColor={classColor}
        />
      )}
    </div>
  );
};

export default GraphsHeader;
