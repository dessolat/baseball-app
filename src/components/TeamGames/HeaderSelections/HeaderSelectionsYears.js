import React from 'react';
import Dropdown from 'components/UI/dropdown/GamesDropdown/Dropdown';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentYear, setCurrentDate } from 'redux/sharedReducer';
import { setCurrentLeague } from 'redux/gamesReducer';
import { getYears } from 'utils';

const HeaderSelectionsYears = ({yearsClass}) => {
  const currentYear = useSelector(state => state.shared.currentYear);

	const dispatch = useDispatch();

  const handleClick = option => {
    const tempDate = new Date(option, 0, 1);
    tempDate.setHours(0, tempDate.getTimezoneOffset() * -1, 0, 0);

    dispatch(setCurrentDate(tempDate));
    dispatch(setCurrentYear(option));
    dispatch(setCurrentLeague({ id: -1, title: 'All' }));
  };

	const yearsArr = getYears()
  return (
    <div className={yearsClass}>
      <Dropdown title={currentYear} options={yearsArr} currentOption={currentYear} handleClick={handleClick} />
    </div>
  );
};

export default HeaderSelectionsYears;
