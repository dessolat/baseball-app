import React, { useState, useRef } from 'react';
import cl from './ContentPlayerFilterField.module.scss';

const ContentPlayerFilterField = ({ setPlayerFilter, mobile = false }) => {
  const [tempPlayerFilter, setTempPlayerFilter] = useState('');

  const filterTimeoutRef = useRef();

  const handleFilterFieldChange = e => {
    const value = e.target.value;
    setTempPlayerFilter(value);
    clearTimeout(filterTimeoutRef.current);

    filterTimeoutRef.current = setTimeout(() => {
      setPlayerFilter(value);
    }, 1000);
  };

	const styles = [cl.filterField]
	mobile && styles.push(cl.mobile)
  return (
    <input
      className={styles.join(' ')}
      value={tempPlayerFilter}
      onChange={handleFilterFieldChange}
      placeholder={'Search of player'}>
				{/* <img src={filterIcon} /> */}
			</input>
  );
};

export default ContentPlayerFilterField;
