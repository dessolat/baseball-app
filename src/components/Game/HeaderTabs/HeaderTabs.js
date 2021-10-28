import useQuery from 'hooks/useQuery';
import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import cl from './HeaderTabs.module.scss'

const HeaderTabs = () => {
	const tab = useQuery().get('tab')
	// const loc = useLocation()
	const {url} = useRouteMatch()
	// console.log(loc)
	// console.log(mat)
  return (
    <ul className={cl.headerTabs}>
      <li>
        <Link to={`${url}?tab=lineup`} className={tab === 'lineup' ? cl.active : ''}>
          Lineup
        </Link>
      </li>
      <li>
        <Link to={`${url}?tab=box`} className={tab === 'box' ? cl.active : ''}>
          Box
        </Link>
      </li>
      <li>
        <Link to={`${url}?tab=plays`} className={tab === 'plays' ? cl.active : ''}>
          Plays
        </Link>
      </li>
      <li>
        <Link to={`${url}?tab=videos`} className={tab === 'videos' ? cl.active : ''}>
          Videos
        </Link>
      </li>
    </ul>
  );
};

export default HeaderTabs;
