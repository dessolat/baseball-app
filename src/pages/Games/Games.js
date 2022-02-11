import Header from 'components/Games/Header/Header';
import React from 'react';
import cl from './Games.module.scss';

const TABLES_DATA = {
  summary: {
    headers: [],
    rows: []
  },
  wins_losses: {
    headers: [],
    rows: []
  },
  batting: {
    headers: [],
    rows: []
  }
};
const Games = () => {
  return (
    <Header />
  );
};

export default Games;
