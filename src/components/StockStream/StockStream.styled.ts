import { styled } from 'styled-components';

const StyledStockStream = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: 'center';
  align-items: 'center';
  padding-bottom: 30px;

  .chartCardContainer {
    width: 80%;
    max-width: 900px;
    display: flex;
    align-self: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 30px;
    margin-bottom: 30px;
  }
`;

export default StyledStockStream;
