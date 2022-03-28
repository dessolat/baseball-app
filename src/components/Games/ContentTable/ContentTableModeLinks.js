import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setMobileTableMode } from 'redux/gamesReducer';
import cl from './ContentTable.module.scss';

const ContentTableModeLinks = () => {
	const isMobile = useSelector(state => state.shared.isMobile)
	const mobileTableMode = useSelector(state => state.games.mobileTableMode)
	const dispatch = useDispatch()

	const handleModeClick = mode => () => dispatch(setMobileTableMode(mode))
	return (
		<div className={cl.tableModes}>ContentTableModeLinks</div>
	)
}

export default ContentTableModeLinks