import React from 'react';
import cl from './HeaderLogo.module.scss';

const HeaderLogo = ({ teamName, side = 'left', images }) => {
  const leftClasses = images[teamName] ? cl.leftLogo : cl.leftLogoText;
  const rightClasses = images[teamName] ? cl.rightLogo : cl.rightLogoText;
  const classes = side === 'left' ? leftClasses : rightClasses;
  const logo = images[teamName] ? (
    <img src={images[teamName]} className={classes} alt='attack-team' />
  ) : (
    <h2 className={classes}>{teamName.slice(0, 2).toUpperCase()}</h2>
  );

  return <>{logo}</>;
};

export default HeaderLogo;
