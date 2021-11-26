import React from 'react'
import cl from './Plays.module.scss'

const Plays = () => {
	return (
		<div className={cl.plays}>
			<div className={cl.events}></div>
			<div className={cl.speed}></div>
			<div className={cl.spin}></div>
			<div className={cl.field}></div>
			<div className={cl.footer}></div>
		</div>
	)
}

export default Plays
