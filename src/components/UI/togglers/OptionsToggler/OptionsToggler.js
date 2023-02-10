import classNames from 'classnames';
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

  return (
    <ul className={wrapperClasses} {...props}>
      {optionsArr.map((option, i) => {
        const optionClasses = classNames(cl.option, { [cl.active]: option === currentOption });

        return (
          <li key={i} className={optionClasses} onClick={handleOptionClick(option)}>
            {option}
          </li>
        );
      })}
      {children && <li className={cl.children}>{children}</li>}
    </ul>
  );
};

export default OptionsToggler;
