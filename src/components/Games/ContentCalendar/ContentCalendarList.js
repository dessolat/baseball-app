import React, { forwardRef } from 'react';
import cl from './ContentCalendar.module.scss';
import ContentCalendarListItem from './ContentCalendarListItem';

const ContentCalendarList = ({ currentDate, handleClick }, ref) => {
  const dates = [];
  for (let i = 0; i < 15; i++) {
    const tempDate = new Date(currentDate);
    tempDate.setDate(tempDate.getDate() - 6 + i);
    dates.push(tempDate);
  }

  return (
    <div className={cl.wrapper}>
      <ul className={cl.list} ref={ref}>
        {dates.map((date, i) => (
          <ContentCalendarListItem
            key={i}
            date={date}
            handleClick={handleClick}
            style={
              currentDate.toDateString() === date.toDateString()
                ? { fontWeight: 'bold', color: 'black' }
                : null
            }
          />
        ))}
      </ul>
    </div>
  );
};

export default forwardRef(ContentCalendarList);
