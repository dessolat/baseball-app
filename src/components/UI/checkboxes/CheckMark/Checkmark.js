import CheckmarkBlank from 'icons/checkmark_blank.svg';
import CheckmarkFilled from 'icons/checkmark_filled.svg';

const Checkmark = ({ isActive }) => {
  return <img src={isActive ? CheckmarkFilled : CheckmarkBlank} alt='Checkmark' width='16px' />;
};

export default Checkmark;
