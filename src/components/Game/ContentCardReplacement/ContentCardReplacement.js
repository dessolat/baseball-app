import React from 'react';
import { useSelector } from 'react-redux';
import { getShortName } from 'utils';
import cl from './ContentCardReplacement.module.scss';
import ContentCardReplacementItem from './ContentCardReplacementItem';

const ContentCardReplacement = ({ events }) => {
	const isVideo = useSelector(state => state.game.isVideo);
  // const ref = useRef(null);

  // useLayoutEffect(() => {
  // 	if (ref.current === null) return

  //   ref.current.innerHTML = text + '.';
  // }, [text]);

  let teamName;
  return (
    <div>
      {events.map((event, i) => {
        if (event.team !== teamName) {
          teamName = event.team;

          return (
            <React.Fragment key={i}>
              {isVideo && <p className={cl.title}>{getShortName(event.team, 18)} replacements:</p>}
              <ContentCardReplacementItem event={event} header={`${getShortName(event.team, 18)} replacements:`}/>
            </React.Fragment>
          );
        }

        return (
          <React.Fragment key={i}>
            <ContentCardReplacementItem event={event} />
          </React.Fragment>
        );

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
