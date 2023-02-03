import React, { useEffect, useRef, useState, createContext } from 'react';
import cl from './TotalInfo.module.scss';
import TotalInfoColumns from './TotalInfoColumns';

export const AnimationContext = createContext(0);

const TotalInfo = () => {
  const [valueCoef, setValueCoef] = useState(0);

  const wrapperRef = useRef();

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
			if (coef < 0.5) return 4
			if (coef < 0.75) return 8
			if (coef < 0.9) return 16
			if (coef < 0.95) return 32
			if (coef < 0.98) return 64
			return 128
		}

    const timeout = setTimeout(() => {
      setValueCoef(prev => (prev < 1 ? prev + 0.01 : 1));
    }, getTimeoutDelay(valueCoef));

    return () => {
      clearTimeout(timeout);
    };
  }, [valueCoef]);

  

  return (
    <AnimationContext.Provider value={valueCoef}>
      <div className={cl.totalInfoWrapper} ref={wrapperRef}>
        <TotalInfoColumns />
      </div>
    </AnimationContext.Provider>
  );
};

export default TotalInfo;
