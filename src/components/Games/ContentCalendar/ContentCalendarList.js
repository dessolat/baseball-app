import { forwardRef } from 'react';
import cl from './ContentCalendar.module.scss';
import ContentCalendarListItem from './ContentCalendarListItem';

const ContentCalendarList = ({ currentDate, handleClick, availableDates }, ref) => {
  const dates = [];

  const currentDateIndex = availableDates.findIndex(date => date === currentDate.toJSON().slice(0, 10));

  for (let i = 0; i < 15; i++) {
    const availableDate =
      availableDates[currentDateIndex - 6 + i] !== undefined
        ? availableDates[currentDateIndex - 6 + i]
        : null;
    const tempDate = availableDate ? new Date(availableDate) : null;
    dates.push(tempDate);
  }

  return (
    <div className={cl.wrapper}>
      <ul className={cl.list} ref={ref}>
        {dates.map((date, i) => {
          const itemStyles =
            date === null
              ? { opacity: 0 }
              : currentDate.toDateString() === date.toDateString()
              ? { fontWeight: 'bold', color: 'black' }
              : null;
          return <ContentCalendarListItem key={i} date={date} handleClick={handleClick} style={itemStyles} />;
        })}
      </ul>
    </div>
  );
};

export default forwardRef(ContentCalendarList);
