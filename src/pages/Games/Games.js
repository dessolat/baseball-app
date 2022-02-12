import Content from 'components/Games/Content/Content';
import Header from 'components/Games/Header/Header';
import React from 'react';
import cl from './Games.module.scss';

const LEAGUES = [
	{id: 1, name: 'All'},
	{id: 2, name: 'Pervenstvo Russian Unior (19 years)'},
	{id: 3, name: 'Russian championship'},
	{id: 4, name: 'Russian championship'},
	{id: 5, name: 'Russian championship'},
	{id: 6, name: 'Russian championship'},
	{id: 7, name: 'Russian championship'},
	{id: 8, name: 'Russian championship'},
	{id: 9, name: 'Russian championship'}
]

const Games = () => {
  return (
    <>
      <Header leagues={LEAGUES}/>
      <Content />
    </>
  );
};

export default Games;
