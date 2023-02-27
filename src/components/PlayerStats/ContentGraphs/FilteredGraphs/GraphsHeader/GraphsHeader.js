import cl from './GraphsHeader.module.scss';
import OptionsToggler from 'components/UI/togglers/OptionsToggler/OptionsToggler';
import classNames from 'classnames';
import TimeDynamicCheckbox from 'components/UI/checkboxes/TimeDynamicCheckbox/TimeDynamicCheckbox';

const GraphsHeader = ({
  optionsArr,
	availableOptions,
  title,
  subTitle,
  currentOption,
  setCurrentOption,
  currentOption2 = null,
  setCurrentOption2 = null,
  noSelector = false,
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

  const titleClasses = classNames(cl.title, {
    [cl.highTitle]: currentOption2 !== null
  });
  return (
    <div className={cl.graphsHeader} {...props}>
      <h3>{title}</h3>
      <p className={titleClasses}>{subTitle}</p>
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
        />
      )}
    </div>
  );
};

export default GraphsHeader;
