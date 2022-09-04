import React from 'react'

const RowInningsInfo = ({lastInn}) => {
	return (
		<div>{lastInn !== null ? `${lastInn} inn` : '—'} </div>
	)
}

export default RowInningsInfo