import { useMemo } from 'react';

const useTabs = tab => useMemo(() => {
	const tabsArr = ['lineup', 'box', 'plays'];

	return !tabsArr.includes(tab)
}, [tab])

export default useTabs