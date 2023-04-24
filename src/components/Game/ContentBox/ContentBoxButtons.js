import { useEffect, useState, useRef } from 'react';
import { buttons } from './ContentBox.module.scss';
import ContentBoxButton from './ContentBoxButton';

const ContentBoxButtons = () => {
  const [buttonsTopPosition, setButtonsTopPosition] = useState({ left: 0, top: 0 });
  const buttonsRef = useRef();

  useEffect(() => {
    function handleWindowResize() {
      const parentElement = buttonsRef.current.parentElement;

      setButtonsTopPosition({
        top: parentElement.getBoundingClientRect().top,
        left: parentElement.getBoundingClientRect().left
      });
    }

		handleWindowResize()

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <div
      className={buttons}
      style={{ top: `calc(${buttonsTopPosition.top}px + 6.3rem)`, left: `${buttonsTopPosition.left}px` }}
      ref={buttonsRef}
      // style={{top: `calc(6.3rem + ${buttonsTopPosition}px)`}}
    >
      <ContentBoxButton team={'guests'} />
      <ContentBoxButton team={'owners'} />
    </div>
  );
};

export default ContentBoxButtons;
