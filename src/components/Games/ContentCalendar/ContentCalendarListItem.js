import cl from './ContentCalendar.module.scss';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

const ContentCalendarListItem = ({ date, handleClick, ...props }) => {
  return (
    <li className={cl.item} {...props} onClick={date && handleClick(date)}>
      {date && (
        <>
          <p>{DAYS[date.getDay()]}</p>
          <p>{`${MONTHS[date.getMonth()]} ${date.getDate()}`}</p>
        </>
      )}
    </li>
  );
};

export default ContentCalendarListItem;
