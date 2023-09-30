import { styled } from 'styled-components';
import { colors } from '../../styles/constants';

const StyledChartCard = styled.div<{ positive: boolean }>`
  z-index: 2;
  width: 240px;
  height: 240px;
  margin-top: 30px;
  padding: 15px;
  border: 1px solid ${colors.lightGrey};
  border-radius: 10px;

  .chartBackground {
    width: 240px;
    height: 200px;
  }
  .stockInformationContainer {
    display: flex;
    align-items: 'center';
    width: 100%;
    position: relative;
    justify-content: space-between;
  }
  .priceDifference {
    width: 33%;
    justify-content: center;
    display: flex;
    justify-content: center;
  }
  .priceDifferenceChip {
    width: 70px;
    border-radius: 10px;
    background-color: ${(p) => (p.positive ? '#4CAF50' : '#E57373')};
    display: flex;
    justify-content: center;
    padding-right: 10px;
  }
  .priceDifferenceNumber {
    width: 70px;
    text-align: right;
  }
  .symbol {
    width: 33%;
  }
  .stockPrice {
    width: 33%;
    text-align: end;
  }
  .closeChartButton {
    cursor: pointer;
    width: 15px;
    padding: 3px;
  }
`;

export default StyledChartCard;
