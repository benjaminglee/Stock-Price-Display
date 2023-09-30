import { styled } from 'styled-components';

const StyledStockStream = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: 'center';
  align-items: 'center';

  .chartCardContainer {
    width: 80%;
    display: flex;
    align-self: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
  }
`;

export default StyledStockStream;
