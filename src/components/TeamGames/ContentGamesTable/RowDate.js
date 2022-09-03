import React from 'react';
import { useSelector } from 'react-redux';

const MONTHS = {
  '01': 'january',
  '02': 'february',
  '03': 'march',
  '04': 'april',
  '05': 'may',
  '06': 'june',
  '07': 'july',
  '08': 'august',
  '09': 'september',
  10: 'october',
  11: 'november',
  12: 'december'
};

const RowDate = ({ date }) => {
  const isMobile = useSelector(state => state.shared.isMobile);

  return (
    <div>
      {date.slice(8, 10) +
        ' ' +
        (!isMobile ? MONTHS[date.slice(5, 7)].slice(0, 3) : MONTHS[date.slice(5, 7)])}
    </div>
  );
};

export default RowDate;
