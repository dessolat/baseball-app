import useScrollingArrows from 'hooks/useScrollingArrows';
import cl from './MobileScrollingWrapper.module.scss';
import classNames from 'classnames';
import Arrow from 'components/UI/buttons/Arrow/Arrow';

const MobileScrollingWrapper = ({ className = null, children, ...props }) => {
  const [isLeftArrow, isRightArrow, innerWrapperRef, horizontalScrollHandler] = useScrollingArrows();

  const leftArrowClasses = classNames(cl.arrowBtn, cl.leftArrowBtn);
  const rightArrowClasses = classNames(cl.arrowBtn, cl.rightArrowBtn);

  const isFooter = Array.isArray(children);
  return (
    <div className={cl.wrapper + ' ' + className} {...props}>
      {isLeftArrow && <Arrow direction='left' className={leftArrowClasses} />}
      <div className={cl.innerWrapper} onScroll={horizontalScrollHandler} ref={innerWrapperRef}>
        {isFooter ? children[0] : children}
      </div>
      {isRightArrow && <Arrow direction='right' className={rightArrowClasses} />}
      {isFooter && children[1]}
    </div>
  );
};

export default MobileScrollingWrapper;
