import BtnImg from 'icons/options_button_icon.svg';
import cl from './MobileOptionsBar.module.scss';

const OptionsBtn = () => {
  return (
    <button className={cl.optionsBtn}>
      <img src={BtnImg} alt='options' />
    </button>
  );
};

export default OptionsBtn;
