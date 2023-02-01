import React, { useEffect, useRef, useState, useContext, createContext } from 'react';
import cl from './TotalInfo.module.scss';

const AnimationContext = createContext(0);

const GroupItem = ({ data }) => {
  const valueCoef = useContext(AnimationContext);

  const { name, value } = data;
  const isValueNumber = typeof value === 'number';
  const dataValue = isValueNumber ? `${(value * valueCoef).toFixed(0)}%` : value;

  return (
    <div
      className={cl.groupItem}
      style={
        isValueNumber
          ? {
              background: `linear-gradient(to left, hsla(${169 + 0.41 * value * valueCoef}, 30%, ${
                88 - 0.15 * value * valueCoef
              }%, 1) ${value * valueCoef}%, rgba(234, 234, 234, 0.4) 0)`
            }
          : null
      }>
      <p>{name}</p>
      <p>{dataValue}</p>
    </div>
  );
};

const Group = ({ data }) => {
  const { title, items } = data;

  return (
    <div className={cl.group}>
      <p className={cl.title}>{title}</p>
      {items.map((item, i) => (
        <GroupItem key={i} data={item} />
      ))}
    </div>
  );
};

const TotalInfo = () => {
  const [valueCoef, setValueCoef] = useState(0);

  const wrapperRef = useRef();

  // useEffect(() => {
  //   let observer = new IntersectionObserver(entries => {
  //     entries.forEach(entry => {
  //       const { isIntersecting } = entry;

  //       if (isIntersecting) {
  //         setValueCoef(prev => prev + 0.01);
  //       } else {
  //         // setValueCoef(0);
  //       }
  //     });
  //   });
  //   observer.observe(wrapperRef.current);

  //   return () => {
  //     observer.disconnect();
  //   };
  // }, []);

  // useEffect(() => {
  //   if (valueCoef === 0) return;

	// 	const getTimeoutDelay = coef => {
	// 		if (coef < 0.5) return 4
	// 		if (coef < 0.75) return 8
	// 		if (coef < 0.9) return 16
	// 		if (coef < 0.95) return 32
	// 		if (coef < 0.98) return 64
	// 		return 128
	// 	}

  //   const timeout = setTimeout(() => {
  //     setValueCoef(prev => (prev < 1 ? prev + 0.01 : 1));
  //   }, getTimeoutDelay(valueCoef));

  //   return () => {
  //     clearTimeout(timeout);
  //   };
  // }, [valueCoef]);

  const leftColumnGroups = [
    {
      title: 'Total info',
      items: [
        { name: 'IP / G', value: 'N/N' },
        { name: 'Total pitches (800 pitches)', value: 100 },
        { name: 'Pitches / Batter', value: 'N/N' },
        { name: 'Left / Right Handed Batters', value: 'N/N' }
      ]
    },
    {
      title: 'Batter appearance results',
      items: [
        { name: 'SO (40 batters)', value: 7 },
        { name: 'BB/HBP (10 batters) ', value: 7 },
        { name: 'H (30 batters)', value: 30 },
        { name: 'PO (60 batters)', value: 30 },
        { name: 'E (10 batters) ', value: 7 }
      ]
    },
    {
      title: 'Outs distribution',
      items: [
        { name: 'FO (10 putots)', value: '' },
        { name: 'GO (10 putots)', value: '' },
        { name: 'FC (10 outs)', value: '' }
      ]
    }
  ];
  const centerColumnGroups = [
    {
      title: 'Pitches distribution',
      items: [
        { name: 'Balls (500 pitches)', value: 50 },
        { name: 'Strikes (500 pitches)', value: 50 }
      ]
    },
    {
      title: ' ',
      items: [
        { name: 'Swing (300 pitches)', value: 50 },
        { name: 'Not swing (500 pitches)', value: 50 }
      ]
    },
    {
      title: 'Batter swing results',
      items: [
        { name: 'Miss (150 swings)', value: 50 },
        { name: 'Contact (150 swings)', value: 50 }
      ]
    },
    {
      title: 'Hits distribution',
      items: [{ name: 'Base hits (50 contacts)', value: 30 }]
    },
    {
      title: ' ',
      items: [
        { name: 'Fly (60 contacts)', value: 40 },
        { name: 'Line (30 contacts)', value: 20 },
        { name: 'Grounds (60 contacts)', value: 80 }
      ]
    }
  ];
  const rightColumnGroups = [
    {
      title: 'Counts distribution',
      items: [
        { name: '0-0 (150 pitches)', value: 15 },
        { name: '0-1 (130 pitches)', value: 13 },
        { name: '1-1 (120 pitches)', value: 12 },
        { name: '1-2 (110 pitches)', value: 11 },
        { name: '1-0 (95 pitches)', value: 9 },
        { name: '2-2 (80 pitches)', value: 8 },
        { name: '0-2 (70 pitches)', value: 7 },
        { name: '2-1 (55 pitches)', value: 5 },
        { name: '3-2 (45 pitches)', value: 4 },
        { name: '2-0 (35 pitches)', value: 3 },
        { name: '3-1 (22 pitches)', value: 2 },
        { name: '3-0 (10 pitches)', value: 1 }
      ]
    }
  ];

  return (
    <AnimationContext.Provider value={1}>
      <div className={cl.totalInfoWrapper} ref={wrapperRef}>
        <div>
          {leftColumnGroups.map((group, i) => (
            <Group key={i} data={group} />
          ))}
        </div>
        <div>
          {centerColumnGroups.map((group, i) => (
            <Group key={i} data={group} />
          ))}
        </div>
        <div>
          {rightColumnGroups.map((group, i) => (
            <Group key={i} data={group} />
          ))}
        </div>
      </div>
    </AnimationContext.Provider>
  );
};

export default TotalInfo;
