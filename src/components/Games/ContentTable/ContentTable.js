import React from 'react';
import { useSelector } from 'react-redux';
import ContentCalendar from '../ContentCalendar/ContentCalendar';
import cl from './ContentTable.module.scss';

const ContentTable = () => {
	const currentLeague = useSelector(state => state.games.currentLeague)

  return <div className={cl.wrapper}>
		<div className={cl.header}>
			<h2 className={cl.teamName}>{currentLeague.name}</h2>
			<ContentCalendar />
		</div>
	</div>;
};

export default ContentTable;
