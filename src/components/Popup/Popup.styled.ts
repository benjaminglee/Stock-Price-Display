import styled, { keyframes } from 'styled-components';

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
  .backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    animation: ${backdropFadeInAnimation} 0.3s ease;
  }

  .mainContent {
    width: 85%;
    max-width: 600px;
    border-radius: 12px;
    background: white;
    padding: 40px 15px;
    border: 2px solid rgb(232, 232, 232);
    position: relative;
    animation: ${fadeInAnimation} 0.3s ease;
  }
`;

export default StyledPopup;
