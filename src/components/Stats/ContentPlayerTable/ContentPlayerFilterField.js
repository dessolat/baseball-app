import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setStatsPlayerFilterValue } from 'redux/statsReducer';
import cl from './ContentPlayerFilterField.module.scss';

const ContentPlayerFilterField = ({ mobile = false, styles = null }) => {
  const [tempPlayerFilter, setTempPlayerFilter] = useState('');

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

  const inputStyles = [cl.filterField];
  mobile && inputStyles.push(cl.mobile);
  return (
    <input
      className={inputStyles.join(' ')}
      value={tempPlayerFilter}
      onChange={handleFilterFieldChange}
      placeholder={'Search of player'}
      style={styles}></input>
  );
};

export default ContentPlayerFilterField;
