import React from 'react';
import cl from './ContentTable.module.scss';
import ContentTableHeader from './ContentTableHeader';

const ROWS_DATA = [
  {
    id: 260,
    time: '08:00',
    stadium: 'Russtar Arena',
    home: 'Moskvich',
    score: '6 : 4',
    guests: 'RusStar-Yuth',
    isVideo: false,
    inn: 9
  },
  {
    id: 277,
    time: '09:00',
    stadium: 'Russtar Arena',
    home: 'RusStar-Yuth',
    score: '5 : 16',
    guests: 'Moskvich',
    isVideo: false,
    inn: 8
  },
  {
    id: 278,
    time: '10:00',
    stadium: 'Russtar Arena',
    home: 'Wolves (SSHOR No. 42)',
    score: '1 : 16',
    guests: 'RusStar',
    isVideo: false,
    inn: 8
  },
  {
    id: 279,
    time: '11:00',
    stadium: 'Russtar Arena',
    home: 'Wolves (SSHOR No. 42)',
    score: '1 : 12',
    guests: 'RusStar',
    isVideo: false,
    inn: 8
  },
  {
    id: 280,
    time: '12:00',
    stadium: 'Russtar Arena',
    home: 'CVS Catawba Valley Stars',
    score: '1 : 8',
    guests: 'RUS RUSSIA',
    isVideo: false,
    inn: 3
  },
  {
    id: 359,
    time: '13:00',
    stadium: 'Russtar Arena',
    home: 'Wolves (SSHOR No. 42)',
    score: '1 : 12',
    guests: 'RusStar',
    isVideo: true,
    inn: 8
  },
  {
    id: 380,
    time: '14:00',
    stadium: 'Russtar Arena',
    home: 'Moskvich',
    score: '6 : 4',
    guests: 'RusStar-Yuth',
    isVideo: false,
    inn: 9
  },
  {
    id: 383,
    time: '15:00',
    stadium: 'Russtar Arena',
    home: 'SPB St. Petersburg National Team',
    score: '6 : 4',
    guests: 'Sharks',
    isVideo: false,
    inn: 1
  }
];

const ContentTable = () => {
  

  return (
    <div className={cl.wrapper}>
			<ContentTableHeader />
			
			<div className={cl.table}>

			</div>
    </div>
  );
};

export default ContentTable;
