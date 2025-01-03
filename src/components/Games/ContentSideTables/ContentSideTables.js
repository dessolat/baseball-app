import cl from './ContentSideTables.module.scss';
import { useSelector } from 'react-redux';
import PctTable from './PctTable/PctTable';
import SwitchTable from './SwitchTable/SwitchTable';
import classNames from 'classnames';

const ContentSideTables = () => {
  const currentLeague = useSelector(state => state.games.currentLeague);
  const isMobile = useSelector(state => state.shared.isMobile);
  const mobileTableMode = useSelector(state => state.games.mobileTableMode);

  const isTables = currentLeague.id !== -1;

  const sideClasses = classNames(cl.side, {
    [cl.addHeight]: mobileTableMode === 'Team tablo/Leader'
  });

  const styles = !isTables
    ? { height: isMobile ? 'auto' : '70vh' }
    : { maxHeight: isMobile ? 'auto' : '75vh' };
  return (
    <div className={sideClasses} style={styles}>
      {isTables && (
        <>
          {(!isMobile || mobileTableMode === 'Team tablo/Leader') && (
            <>
              <PctTable />
              <SwitchTable />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ContentSideTables;
