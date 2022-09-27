import React, { useLayoutEffect, useRef, useMemo } from 'react';

const BodyTop = ({ cl, sit }) => {
  const ref = useRef(null);

	const eventsSummary = useMemo(
		() => sit.events.reduce((sum, event) => [...sum, event.description], []),
		[sit.events]
	);

  useLayoutEffect(() => {
    if (ref.current === null) return;
    ref.current.innerHTML = eventsSummary.join('.') + '.';
  }, [eventsSummary, sit.icons.rect_text]);

  const cardText = eventsSummary.join('.') + '.';
  return (
    <p className={cl.text} ref={ref}>
      {cardText}
    </p>
  );
};

export default BodyTop;
