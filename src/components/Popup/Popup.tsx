import StyledPopup from './Popup.styled';
import { TailSpin } from 'react-loader-spinner';
import { colors } from '../../styles/constants';

const Popup = () => {
  return (
    <StyledPopup>
      <div className="popupBackdrop">
        <div className="mainContent">
          Reconnecting to server...
          <div className="spinnerWrapper">
            <TailSpin wrapperClass="spinner" color={colors.green} />
          </div>
        </div>
      </div>
    </StyledPopup>
  );
};

export default Popup;
