import ArrowDown from 'components/UI/icons/ArrowDown';
import React from 'react';
import { Link } from 'react-router-dom';
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

      <table className={cl.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Time</th>
            <th>
              <div>
                Stadium <ArrowDown />
              </div>
            </th>
            <th>
              <div>
                Home <ArrowDown />
              </div>
            </th>
            <th> </th>
            <th>
              <div>
                Guests <ArrowDown />
              </div>
            </th>
            <th> </th>
            <th>Inn</th>
          </tr>
        </thead>
        <tbody>
          {ROWS_DATA.map(row => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.time}</td>
              <td>{row.stadium}</td>
              <td>{row.home}</td>
              <td>{row.score}</td>
              <td>{row.guests}</td>
              <td className={cl.links}>
                <div>
                  <Link to={`/game/${row.id}?tab=box`}>Box</Link>
                  <Link to={`/game/${row.id}?tab=plays`}>Plays</Link>
                  {row.isVideo && <Link to={`/game/${row.id}?tab=videos`}>Videos</Link>}
                </div>
              </td>
              <td>{row.inn} inn</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContentTable;
