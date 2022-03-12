import React from 'react';
import cl from './HeaderSelections.module.scss';
import Dropdown from 'components/UI/dropdown/GamesDropdown/Dropdown';
import { useDispatch } from 'react-redux';
import { setCurrentYear, setCurrentDate } from 'redux/sharedReducer';
// import { useParams } from 'react-router-dom';
import ArrowDown from 'components/UI/icons/ArrowDown';
import PortraitImg from 'images/portrait.png';

const YEARS = ['All years', 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014];

const HeaderSelections = ({ playerYears, setPlayerYears }) => {
  // const { playerName } = useParams();

  const dispatch = useDispatch();

  const handleClick = option => {
    setPlayerYears(option);

    if (option === 'All years') return;

    const tempDate = new Date(option, 0, 1);
    tempDate.setHours(0, tempDate.getTimezoneOffset() * -1, 0, 0);

    dispatch(setCurrentDate(tempDate));
    dispatch(setCurrentYear(option));
  };

  return (
    <div className={cl.selections}>
      <div className={cl.playerInfo}>
        <img src={PortraitImg} alt='' srcset='' />
        <div className={cl.fullName}>
          Name
          <p>Surname</p>
        </div>
      </div>
      <div className={cl.bottom}>
        <div className={cl.years}>
          <Dropdown
            title={playerYears}
            options={YEARS}
            currentOption={playerYears}
            handleClick={handleClick}
						listStyles={{textAlign: 'center'}}
						itemStyles={{padding: 0}}
          />
        </div>
        <div className={cl.batting}>
          Name team 
          <ArrowDown />
        </div>
      </div>
    </div>
  );
};

export default HeaderSelections;
