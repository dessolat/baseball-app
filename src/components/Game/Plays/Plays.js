import React, { useState } from 'react';
import cl from './Plays.module.scss';
import PlaysEvents from '../PlaysEvents/PlaysEvents';
import PlaysFooter from '../PlaysFooter/PlaysFooter';
import PlaysContent from '../PlaysContent/PlaysContent';

const Plays = () => {
  const [footerTab, setFooterTab] = useState('pitch');
	const classes = [cl.plays]
	// footerTab === 'pitch' && classes.push(cl.pitch)
	classes.push(cl.pitch)

  return (
    <div className={classes.join(' ')}>
      <PlaysEvents />
      <PlaysContent footerTab={footerTab} />
      <PlaysFooter footerTab={footerTab} setFooterTab={setFooterTab} />
    </div>
  );
};

export default Plays;
