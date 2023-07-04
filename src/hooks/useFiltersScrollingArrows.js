import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

const useScrollingArrows = () => {
  const [isLeftArrow, setIsLeftArrow] = useState(false);
  const [isRightArrow, setIsRightArrow] = useState(false);

  const innerWrapperRef = useRef(null);

	const situations = useSelector(s => s.game.situations)
	const currentTab = useSelector(s => s.game.currentTab)
	const mobileWidth = useSelector(s => s.shared.mobileWidth)

  useEffect(() => {
    if (innerWrapperRef.current === null) return;

    setIsLeftArrow(innerWrapperRef.current.scrollLeft <= 0 ? false : true);
    setIsRightArrow(
      innerWrapperRef.current.scrollLeft + innerWrapperRef.current.clientWidth <
        innerWrapperRef.current.scrollWidth
        ? true
        : false
    );
  }, [situations, mobileWidth, currentTab]);

  const horizontalScrollHandler = e => {
    setIsLeftArrow(e.target.scrollLeft <= 0 ? false : true);
    setIsRightArrow(e.target.scrollLeft + e.target.clientWidth < e.target.scrollWidth ? true : false);
  };

  return [isLeftArrow, isRightArrow, innerWrapperRef, horizontalScrollHandler];
};

export default useScrollingArrows;
