import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setStatsPlayerFilterValue } from 'redux/statsReducer';
import cl from './ContentPlayerFilterField.module.scss';
import classNames from 'classnames';

const ContentPlayerFilterField = ({ mobile = false, styles = null }) => {
	const playerFilter = useSelector(state => state.stats.statsPlayerFilterValue)
  const [tempPlayerFilter, setTempPlayerFilter] = useState(playerFilter);

  const filterTimeoutRef = useRef();

	const dispatch = useDispatch()

  const handleFilterFieldChange = e => {
    const value = e.target.value;
    setTempPlayerFilter(value);
    clearTimeout(filterTimeoutRef.current);

    filterTimeoutRef.current = setTimeout(() => {
      dispatch(setStatsPlayerFilterValue(value));
    }, 400);
  };

	const inputClasses = classNames(cl.filterField, {
		[cl.mobile]: mobile
	})
  return (
    <input
      className={inputClasses}
      value={tempPlayerFilter}
      onChange={handleFilterFieldChange}
      placeholder={'Search of player'}
      style={styles}></input>
  );
};

export default ContentPlayerFilterField;
