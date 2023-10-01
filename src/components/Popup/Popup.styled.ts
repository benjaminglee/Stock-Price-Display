import styled, { keyframes } from 'styled-components';
import { colors } from '../../styles/constants';

const fadeInAnimation = keyframes`
  from {
    opacity: .6;
    scale:.85;
    transform: translateY(-50px);
  }
  50% {
    opacity: 1;
    /* transform: translateY(2px); */
  }
  to {
    transform: translateY(0);
    scale:1;
  }
`;

const backdropFadeInAnimation = keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
}
`;

const StyledPopup = styled.div`
  .popupBackdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(255, 255, 255, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    animation: ${backdropFadeInAnimation} 0.3s ease;
  }

  .mainContent {
    width: 80%;
    max-width: 660px;
    border-radius: 12px;
    background: ${colors.darkGrey};
    padding: 40px 15px;
    position: relative;
    animation: ${fadeInAnimation} 0.3s ease;
    z-index: 10;
    color: ${colors.lightGrey};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-size: 20px;
  }
  .spinner {
    margin-top: 20px;
  }
`;

export default StyledPopup;
