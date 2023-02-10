import cl from './GraphsHeader.module.scss';
import OptionsToggler from 'components/UI/togglers/OptionsToggler/OptionsToggler';

const GraphsHeader = ({ optionsArr, title, subTitle, currentOption, setCurrentOption, noSelector = false, ...props }) => {
  const optionsTogglerStyles = {
    position: 'absolute',
    right: '.4375rem',
    top: '50%',
    transform: 'translateY(-50%)'
  };

  const handleOptionClick = option => () => setCurrentOption(option);
  return (
    <div className={cl.graphsHeader} {...props}>
      <h3>{title}</h3>
      <p className={cl.title}>{subTitle}</p>
      {!noSelector && <OptionsToggler
        style={optionsTogglerStyles}
        optionsArr={optionsArr}
        currentOption={currentOption}
        handleOptionClick={handleOptionClick}
      />}
    </div>
  );
};

export default GraphsHeader;
