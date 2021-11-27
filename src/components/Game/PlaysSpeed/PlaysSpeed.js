import React from 'react'
import cl from './PlaysSpeed.module.scss'

const PlaysSpeed = () => {
	return (
		<div className={cl.speed}>
			<p className={cl.subHeader}>Release speed</p>
			<div className={cl.chart}></div>
		</div>
	)
}

export default PlaysSpeed
