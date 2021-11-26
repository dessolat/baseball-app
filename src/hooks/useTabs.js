import { useMemo } from 'react';

const useTabs = tab => useMemo(() => {
	const tabsArr = ['lineup', 'box', 'videos'];

	return !tabsArr.includes(tab)
}, [tab])

export default useTabs