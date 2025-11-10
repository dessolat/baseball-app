import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import cl from './HeaderLogo.module.scss';
import { getDomen } from 'utils';

const HeaderLogo = ({ side = 'guests' }) => {
  const [isLoaded, setLoaded] = useState(false);

  const { guests, owners } = useSelector(state => state.game.preview);

  const imgStyles = !isLoaded ? { display: 'none' } : {};
  const pHolderStyles = isLoaded ? { display: 'none' } : {};

  const imgLogoUrl = side === 'guests' ? guests.logo : owners.logo;
  const imgSrc = `${getDomen()}/logo/${imgLogoUrl}`;

  const textClass = side === 'guests' ? cl.leftLogoText : cl.rightLogoText;
  const imgClass = side === 'guests' ? cl.leftLogo : cl.rightLogo;

  const teamName = side === 'guests' ? guests.name : owners.name;
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
