import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { getShortName } from 'utils';
import cl from './ContentCardReplacement.module.scss';
import ContentCardReplacementItem from './ContentCardReplacementItem/ContentCardReplacementItem';

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
          const headerTitle = `${getShortName(event.team, 18)} replacements`;

          return (
            <Fragment key={i}>
              {isVideo && <p className={cl.title}>{headerTitle}</p>}
              <ContentCardReplacementItem event={event} header={headerTitle} />
            </Fragment>
          );
        }

        return (
          <Fragment key={i}>
            <ContentCardReplacementItem event={event} />
          </Fragment>
        );
      })}
    </div>
  );
};

export default ContentCardReplacement;
