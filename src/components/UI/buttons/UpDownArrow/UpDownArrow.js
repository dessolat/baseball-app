import cl from './UpDownArrow.module.scss';

const UpDownArrow = ({ up, handleClick, ...props }) => {
  const path = up ? `M0,25L25,0L50,25` : `M0,0L25,25L50,0`;
  return (
    <button className={cl.wrapper} onClick={handleClick} {...props}>
      <svg viewBox='0 0 50 25' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'>
        <path d={path} stroke='gray' strokeWidth='1' fill='none' />
      </svg>
    </button>
  );
};

export default UpDownArrow;
