import React, { useState, useRef, useEffect } from 'react';
import cl from './PlaysEvents.module.scss';
import PlaysEventsItem from './PlaysEventsItem';

const PlaysEventsList = ({ moments, currentMoment, handleClick }) => {
	const [classes, setClasses] = useState([cl.list])
  const ref = useRef(null);

  useEffect(() => {
		if (ref.current === null) return;
		
		ref.current.scrollHeight > ref.current.clientHeight ? setClasses([cl.list, cl.listBottomShadow]) : setClasses([cl.list])
  }, [moments]);
	
  return (
    <ul className={classes.join(' ')} ref={ref}>
      {moments.length !== 0 &&
        moments.map((moment, i) => (
          <PlaysEventsItem key={i} moment={moment} currentMoment={currentMoment} handleClick={handleClick} />
        ))}
    </ul>
  );
};

export default PlaysEventsList;
