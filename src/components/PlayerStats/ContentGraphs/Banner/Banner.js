import { AnimationContext, PlayerYearsContext } from 'context';
import React, { useEffect, useRef, useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import cl from './Banner.module.scss';
import BannerColumns from './BannerColumns';

const Banner = () => {
  const [valueCoef, setValueCoef] = useState(0);

  const wrapperRef = useRef();
  const firstMountRef = useRef(true);

	const { playerYears } = useContext(PlayerYearsContext);

  const { playerStatsData: statsData, playerCurrentTeam: currentTeam } = useSelector(s => s.playerStats);
  const { currentLeague } = useSelector(state => state.games);

  const { total, total_annual, teams, leagues } = statsData.pitcher_banner;

  useEffect(() => {
    let observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const { isIntersecting } = entry;

        if (isIntersecting) {
          setValueCoef(prev => prev + 0.01);
        } else {
          // setValueCoef(0);
        }
      });
    });
    observer.observe(wrapperRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (valueCoef === 0) return;

		const getTimeoutDelay = coef => {
			if (coef < 0.5) return 9
			if (coef < 0.75) return 6
			return 3
			// if (coef < 0.9) return 16
			// if (coef < 0.95) return 32
			// return 64
		}

		const getValueAddition = coef => {
			if (coef < 0.5) return 0.03
			if (coef < 0.75) return 0.02
			return 0.01
		}

    const timeout = setTimeout(() => {
      setValueCoef(prev => (prev < 1 ? prev + getValueAddition(valueCoef) : 1));
    }, getTimeoutDelay(valueCoef));

    return () => {
      clearTimeout(timeout);
    };
  }, [valueCoef]);

	useEffect(() => {
		if (firstMountRef.current === true) {
			firstMountRef.current = false
			return
		}

    setValueCoef(0);

    setTimeout(() => {
      setValueCoef(prev => prev + 0.01);
    }, 10);
  }, [playerYears, currentTeam, currentLeague.id]);

	const getParentObj = () => {
    if (playerYears === 'All years' && currentTeam === 'All teams') return total;
    if (playerYears === 'All years' && currentTeam !== 'All teams')
      return teams.find(team => team.name === currentTeam);
    if (currentLeague.id === -1 && currentTeam === 'All teams') return total_annual[playerYears];
    if (currentLeague.id === -1 && currentTeam !== 'All teams')
      return teams.find(team => team.name === currentTeam).annual[playerYears];

    const curLeague = leagues.find(league => league.id === currentLeague.id);
    return curLeague.teams.find(team => team.name === currentTeam);
  };

  const parentObj = getParentObj();
  return parentObj ? (
    <AnimationContext.Provider value={valueCoef}>
      <div className={cl.bannerWrapper} ref={wrapperRef}>
        <BannerColumns setAnimationCoef={setValueCoef} parentObj={parentObj}/>
      </div>
    </AnimationContext.Provider>
  ) : <></>;
};

export default Banner;
