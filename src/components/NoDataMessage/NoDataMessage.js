import cl from './NoDataMessage.module.scss'

const NoDataMessage = ({ text }) => <p className={cl.noDataFound}>{text}</p>;

export default NoDataMessage;
