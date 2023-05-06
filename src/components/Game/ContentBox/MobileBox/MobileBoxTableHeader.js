import { forwardRef } from 'react';
import cl from './ContentMobileBox.module.scss';

const MobileBoxTableHeader = ({ getTableHeaders }, ref) => {
  return (
    <div className={cl.fullHeader}>
      <div className={cl.leftHeader}>
        <div></div>
        <div></div>
      </div>
      <div className={cl.rightHeader} ref={ref}>
        {getTableHeaders()}
      </div>
    </div>
  );
};

export default forwardRef(MobileBoxTableHeader);
