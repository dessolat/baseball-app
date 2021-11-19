import { useState, useRef } from 'react';

const useScrollHorizontally = () => {
  const scrollRef = useRef(0);
  const [isLeftScroll, setIsLeftScroll] = useState(false);
  const [isRightScroll, setIsRightScroll] = useState(false);

  const scrollHorizontally = e => {
    e = window.event || e;
    var delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
    scrollRef.current.scrollLeft += delta * 32;
    setIsLeftScroll(scrollRef.current.scrollLeft !== 0);
    setIsRightScroll(
      scrollRef.current.scrollLeft + scrollRef.current.clientWidth < scrollRef.current.scrollWidth
    );
    e.preventDefault();
  };

  const scrollFixation = () => {
    if (scrollRef.current === null) return 
		setIsLeftScroll(scrollRef.current.scrollLeft !== 0);
    setIsRightScroll(
      scrollRef.current.scrollLeft + scrollRef.current.clientWidth < scrollRef.current.scrollWidth
    );
  };

  const addListeners = () => {
    if (scrollRef.current.addEventListener) {
      scrollRef.current.addEventListener('mousewheel', scrollHorizontally, false);
      scrollRef.current.addEventListener('scroll', scrollFixation, false);
      scrollRef.current.addEventListener('DOMMouseScroll', scrollHorizontally, false);
    } else {
      scrollRef.current.attachEvent('onmousewheel', scrollHorizontally);
    }
  };

  const removeListeners = ref => {
    if (ref.removeEventListener) {
      ref.removeEventListener('mousewheel', scrollHorizontally, false);
      ref.removeEventListener('scroll', scrollFixation, false);
      ref.removeEventListener('DOMMouseScroll', scrollHorizontally, false);
    } else {
      ref.detachEvent('onmousewheel', scrollHorizontally);
    }
  };

  return [scrollRef, isLeftScroll, isRightScroll, addListeners, removeListeners, scrollFixation];
};

export default useScrollHorizontally;
