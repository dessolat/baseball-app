import classNames from 'classnames';
import { getPitchColorByName } from 'utils';
import cl from './OptionsToggler.module.scss';

const OptionsToggler = ({
  optionsArr,
  currentOption,
  handleOptionClick,
  vertical = false,
  children,
  ...props
}) => {
  const wrapperClasses = classNames(cl.wrapper, {
    [cl.vertical]: vertical
  });

  const isDataArray = Array.isArray(optionsArr);
  const existData = isDataArray ? optionsArr : Object.keys(optionsArr);
	const sortedData = existData.slice(1).sort((a,b) => a > b ? 1 : -1)
	sortedData.unshift(existData[0])
  return (
    <ul className={wrapperClasses} {...props}>
      {sortedData.map((option, i, arr) => {
        const optionClasses = classNames(cl.option, {
          [cl.active]: option === currentOption,
          [cl.lastListItem]: children && arr.length === i + 1
        });

        const isStyles = isDataArray || optionsArr.option === null || option === currentOption;
        const itemStyles = isStyles ? null : { backgroundColor: getPitchColorByName(option) };
        return (
          <li key={i} className={optionClasses} onClick={handleOptionClick(option)} style={itemStyles}>
            {option}
          </li>
        );
      })}
      {children && <li className={cl.children}>{children}</li>}
    </ul>
  );
};

export default OptionsToggler;
