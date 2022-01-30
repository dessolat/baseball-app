import React, { useLayoutEffect, useRef } from 'react';
import cl from './ContentCardReplacement.module.scss';
import PortraitImg from 'images/portrait.png';

const ContentCardReplacement = ({ events }) => {
  const ref = useRef(null);

  // useLayoutEffect(() => {
  // 	if (ref.current === null) return

  //   ref.current.innerHTML = text + '.';
  // }, [text]);
  const getShortName = name => (name.length > 8 ? name.slice(0, 17) + '…' : name);

  let teamName;
  return (
    <div>
      {events.map((event, i) => {
        if (event.team !== teamName) {
          teamName = event.team;

          return (
            <>
              <p className={cl.title}>{getShortName(event.team)} replacements:</p>
              <div className={cl.replace} key={i}>
                <div className={cl.portrait}>
                  <img className={cl.default} src={PortraitImg} alt='Portrait' />
                </div>
                <p className={cl.text}>{event.description}</p>
                <div className={cl.portrait}>
                  <img className={cl.default} src={PortraitImg} alt='Portrait' />
                </div>
              </div>
            </>
          );
        }

				return <div className={cl.replace} key={i}>
				<div className={cl.portrait}>
					<img className={cl.default} src={PortraitImg} alt='Portrait' />
				</div>
				<p className={cl.text}>{event.description}</p>
				<div className={cl.portrait}>
					<img className={cl.default} src={PortraitImg} alt='Portrait' />
				</div>
			</div>

        // return i === 0 || event.team !== teamName ? (
        //   <>
        //     <p className={cl.title}>{getShortName(event.team)} replacements:</p>
        //     <div className={cl.replace} key={i}>
        //       <div className={cl.portrait}>
        //         <img className={cl.default} src={PortraitImg} alt='Portrait' />
        //       </div>
        //       <p className={cl.text}>{event.description}</p>
        //       <div className={cl.portrait}>
        //         <img className={cl.default} src={PortraitImg} alt='Portrait' />
        //       </div>
        //     </div>
        //   </>
        // ) : (
        //   <div className={cl.replace} key={i}>
        //     <div className={cl.portrait}>
        //       <img className={cl.default} src={PortraitImg} alt='Portrait' />
        //     </div>
        //     <p className={cl.text}>{event.description}</p>
        //     <div className={cl.portrait}>
        //       <img className={cl.default} src={PortraitImg} alt='Portrait' />
        //     </div>
        //   </div>
        // );
      })}
    </div>
  );
};

export default ContentCardReplacement;
