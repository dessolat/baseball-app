import classNames from 'classnames';
import cl from './OptionsToggler.module.scss';

const OptionsToggler = ({ optionsArr, currentOption, handleOptionClick, ...props }) => {
  return (
    <ul className={cl.wrapper} {...props}>
      {optionsArr.map((option, i) => {
        const optionClasses = classNames(cl.option, { [cl.active]: option === currentOption });

        return (
          <li key={i} className={optionClasses} onClick={handleOptionClick(option)}>
            {option}
          </li>
        );
      })}
    </ul>
  );
};

export default OptionsToggler;
