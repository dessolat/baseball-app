import React from 'react';
import { useSelector } from 'react-redux';
import cl from './ContentPitcher.module.scss';
import { Link } from 'react-router-dom';
// import PlaysEventsTotal from '../PlaysEvents/PlaysEventsTotal';

const ContentPitcher = () => {
  const currentCard = useSelector(state => state.game.currentCard);
  const moments = useSelector(state => state.game.moments);

  const { balls_count: ballsCount, strikes_count: strikesCount } =
    (moments.length > 0 ? moments.slice(-1)[0].pitcher : currentCard.moments?.slice(-1)[0].pitcher) || '';

  const { pitches_name: pitcherName, pitcher_id: pitcherId } =
    currentCard.moments?.slice(-1)[0]?.pitcher || {};

  const isPitcher = currentCard.moments;

  const ballsEnding = ballsCount > 1 ? 's' : '';
  const strikesEnding = strikesCount > 1 ? 's' : '';
  return (
    <div>
      <p className={cl.playerName}>
        Pitcher: {isPitcher && <Link to={`/stats/player/${pitcherId}`}>{pitcherName}</Link>}
      </p>

      {/* <PlaysEventsTotal moments={moments}/> */}
      <p className={cl.playerName}>
        Total:{' '}
        {isPitcher && (
          <span>
            {ballsCount + strikesCount} ({ballsCount} ball{ballsEnding}, {strikesCount} strike
            {strikesEnding})
          </span>
        )}
      </p>
    </div>
  );
};

export default ContentPitcher;
