import React from 'react';
import { useSelector } from 'react-redux';
import cl from './ContentPitcher.module.scss';
// import PlaysEventsTotal from '../PlaysEvents/PlaysEventsTotal';

const ContentPitcher = () => {
  const currentCard = useSelector(state => state.game.currentCard);
  const moments = useSelector(state => state.game.moments);

  const { balls_count, strikes_count } =
    (moments.length > 0 ? moments.slice(-1)[0].pitcher : currentCard.moments?.slice(-1)[0].pitcher) || '';

  const pitcherName = currentCard.moments?.slice(-1)[0]?.pitcher.pitches_name;
  const isPitcher = currentCard.moments;

  return (
    <div>
      <p className={cl.playerName}>Pitcher: {isPitcher && <span>{pitcherName}</span>}</p>

      {/* <PlaysEventsTotal moments={moments}/> */}
      <p className={cl.playerName}>
        Total:{' '}
        {isPitcher && (
          <>
            <span>
              {balls_count + strikes_count} ({balls_count} ball, {strikes_count} strike)
            </span>
          </>
        )}
      </p>
    </div>
  );
};

export default ContentPitcher;
