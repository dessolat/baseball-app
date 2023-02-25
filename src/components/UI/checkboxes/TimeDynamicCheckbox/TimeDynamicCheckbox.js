import cl from './TimeDynamicCheckbox.module.scss';
import classNames from 'classnames';
import { getPitchColorByName } from 'utils';

const TimeDynamicCheckbox = ({
  optionsArr,
  availableOptions,
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
  const filteredData = existData.filter(
    pitchType => availableOptions.includes(pitchType.name) || pitchType.name === 'All Pitches'
  );
  const sortedData = filteredData.slice(1).sort((a, b) => (a.name > b.name ? 1 : -1));
  sortedData.unshift(existData[0]);
  return (
    <ul className={wrapperClasses} {...props}>
      {sortedData.map((option, i, arr) => {
        const optionClasses = classNames(cl.option, {
          [cl.inActive]: !option.checked,
          [cl.lastListItem]: children && arr.length === i + 1,
          [cl.whiteColor]: option.name === 'All Pitches'
        });

        const itemStyles = { backgroundColor: getPitchColorByName(option.name) };
        return (
          <li key={i} className={optionClasses} onClick={handleOptionClick(option)} style={itemStyles}>
            {option.name}
          </li>
        );
      })}
      {children && <li className={cl.children}>{children}</li>}
    </ul>
  );
};

export default TimeDynamicCheckbox;
