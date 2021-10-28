import { useState, useRef } from 'react';

const useScrollHorizontally = () => {
  const scrollRef = useRef();
  const [leftScrollDelta, setLeftScrollDelta] = useState(0);
  const [fullScrollWidth, setFullScrollWidth] = useState(0);

  const scrollHorizontally = e => {
    e = window.event || e;
    var delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
    scrollRef.current.scrollLeft += delta * 32;
    setLeftScrollDelta(scrollRef.current.scrollLeft);
    setFullScrollWidth(scrollRef.current.scrollWidth);
    e.preventDefault();
  };

  const scrollFixation = () => {
    setLeftScrollDelta(scrollRef.current.scrollLeft);
    setFullScrollWidth(scrollRef.current.scrollWidth);
  };

  const addListeners = scroll => {
    if (scroll.addEventListener) {
      scroll.addEventListener('mousewheel', scrollHorizontally, false);
      scroll.addEventListener('scroll', scrollFixation, false);
      scroll.addEventListener('DOMMouseScroll', scrollHorizontally, false);
    } else {
      scroll.attachEvent('onmousewheel', scrollHorizontally);
    }
  };

  const removeListeners = scroll => {
    if (scroll.removeEventListener) {
      scroll.removeEventListener('mousewheel', scrollHorizontally, false);
      scroll.removeEventListener('scroll', scrollFixation, false);
      scroll.removeEventListener('DOMMouseScroll', scrollHorizontally, false);
    } else {
      scroll.detachEvent('onmousewheel', scrollHorizontally);
    }
  };

  return [scrollRef, leftScrollDelta, setLeftScrollDelta,fullScrollWidth, addListeners, removeListeners, scrollFixation];
};

export default useScrollHorizontally;
