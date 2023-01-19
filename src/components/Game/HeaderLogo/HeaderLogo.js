import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import cl from './HeaderLogo.module.scss';

const HeaderLogo = ({ teamName, side = 'left', images }) => {
  const [isLoaded, setLoaded] = useState(false);

  const { guests, owners } = useSelector(state => state.game.preview);

  const imgStyles = !isLoaded ? { display: 'none' } : {};
  const pHolderStyles = isLoaded ? { display: 'none' } : {};
	
  const imgLogoUrl = side === 'left' ? guests.logo : owners.logo;
	const imgSrc = `http://baseball-gametrack.ru/api/logo/${imgLogoUrl}`
	
	const textClass = side === 'left' ? cl.leftLogoText : cl.rightLogoText
	const imgClass = side === 'left' ? cl.leftLogo : cl.rightLogo
	
	// ! Old img method

  // const leftClasses = images[teamName] ? cl.leftLogo : cl.leftLogoText;
  // const rightClasses = images[teamName] ? cl.rightLogo : cl.rightLogoText;
  // const classes = side === 'left' ? leftClasses : rightClasses;
	
  // const logo = images[teamName] ? (
  //   <img src={images[teamName]} className={classes} alt='attack-team' style={imgStyles} />
  // ) : (
  //   <h2 className={classes} style={pHolderStyles}>
  //     {teamName.slice(0, 2).toUpperCase()}
  //   </h2>
  // );

  // <>{logo}</>;
  return (
    <>
      <img
        src={imgSrc}
        className={imgClass}
        alt='attack-team'
        style={imgStyles}
        onLoad={() => setLoaded(true)}
      />
      <h2 className={textClass} style={pHolderStyles}>
        {teamName.slice(0, 2).toUpperCase()}
      </h2>
    </>
  );
};

export default HeaderLogo;
