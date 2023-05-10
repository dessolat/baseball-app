import classNames from 'classnames';
import cl from './CrossClose.module.scss';

const CrossClose = ({ handleCrossClick, addedClass = null, ...props }) => {
  const wrapperClasses = classNames(cl.btn, {
    [addedClass]: addedClass
  });

  return (
    <button {...props} className={wrapperClasses} onClick={handleCrossClick}>
      <svg viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <line x1='1' x2='29' y1='1' y2='29' stroke='black' strokeWidth='2' fill='black' />
        <line x1='1' x2='29' y1='29' y2='1' stroke='black' strokeWidth='2' fill='black' />
      </svg>
    </button>
  );
};

export default CrossClose;
