import { PlayerYearsContext } from 'context';
import { createContext, useContext, useEffect, useState, useRef, Fragment } from 'react';
import { useSelector } from 'react-redux';
import cl from './PlayerStatsAnimationContext.module.scss';

const ctx = createContext();

const PlayerStatsAnimationProvider = ({ children }) => {
  const [valueCoef, setValueCoef] = useState(0);

  const wrapperRef = useRef(null);
  const firstMountRef = useRef(true);

  const { playerYears } = useContext(PlayerYearsContext);

  const { playerCurrentTeam: currentTeam } = useSelector(s => s.playerStats);
  const { currentLeague } = useSelector(s => s.games);

  useEffect(() => {
    if (wrapperRef.current === null) return;

    let observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const { isIntersecting } = entry;

        if (isIntersecting) {
          setValueCoef(prev => prev + 0.01);
        } else {
          setValueCoef(0);
        }
      });
    });
    observer.observe(wrapperRef.current);

    return observer.disconnect;
  }, []);

  useEffect(() => {
    if (valueCoef === 0) return;

    const getTimeoutDelay = coef => {
      if (coef < 0.5) return 9;
      if (coef < 0.75) return 6;
      return 3;
    };

    const getValueAddition = coef => {
      if (coef < 0.5) return 0.03;
      if (coef < 0.75) return 0.02;
      return 0.01;
    };

    const timeout = setTimeout(() => {
      setValueCoef(prev => (prev < 1 ? prev + getValueAddition(valueCoef) : 1));
    }, getTimeoutDelay(valueCoef));

    return () => {
      clearTimeout(timeout);
    };
  }, [valueCoef]);

  useEffect(() => {
    if (firstMountRef.current === true) {
      firstMountRef.current = false;
      return;
    }

    setValueCoef(0);

    setTimeout(() => {
      setValueCoef(prev => prev + 0.01);
    }, 10);
  }, [playerYears, currentTeam, currentLeague.id]);

  return (
    <ctx.Provider value={valueCoef}>
      <div className={cl.bannerWrapper} ref={wrapperRef}>
        {children}
      </div>
    </ctx.Provider>
  );
};

export const usePlayerStatsAnimationCtx = () => useContext(ctx);

export default PlayerStatsAnimationProvider;
