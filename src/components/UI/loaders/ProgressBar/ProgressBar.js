import cl from './ProgressBar.module.scss';

const ProgressBar = ({ progress, ...props }) => (
  <div className={cl.wrapper} {...props}>
    <div
      className={cl.progress}
      style={{
        width: `${progress}%`
      }}></div>
  </div>
);

export default ProgressBar;
