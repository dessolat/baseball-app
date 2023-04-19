import { tooltip } from './HittingField.module.scss';

const Tooltip = ({ text }) => {
  return <div className={tooltip}>{text}</div>;
};

export default Tooltip;
