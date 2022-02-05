import React from 'react';
import cl from './Games.module.scss';
import { Link } from 'react-router-dom';

const Games = () => {
  return (
    <section className={cl.games}>
      <h1>Games page</h1>
			<Link to='/game/279'>279</Link>
			<Link to='/game/280'>280</Link>
			<Link to='/game/359'>359</Link>
			<Link to='/game/380'>380</Link>
			<Link to='/game/383'>383</Link>
    </section>
  );
};

export default Games;
