import React from 'react'
import { Link } from 'react-router-dom'
import cl from './NavBar.module.scss'

const NavBar = () => {
	return (
		<nav className={cl.navbar}>
			<Link to='/games'>Schedule</Link>
			<Link to='/stats/player'>Stats</Link>
		</nav>
	)
}

export default NavBar
