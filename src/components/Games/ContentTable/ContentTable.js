import React from 'react';
import { useSelector } from 'react-redux';
import cl from './ContentTable.module.scss';

const ContentTable = () => {
	const currentLeague = useSelector(state => state.games.currentLeague)

  return <div className={cl.wrapper}>
		<div className={cl.header}>
			<h2 className={cl.teamName}>{currentLeague.name}</h2>
			<p className={cl.calendar}>Calendar</p>
		</div>
	</div>;
};

export default ContentTable;
