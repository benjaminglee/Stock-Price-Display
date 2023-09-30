import { styled } from 'styled-components';
import { colors } from '../../styles/constants';

const StyledChartCard = styled.div<{ positive: boolean }>`
  z-index: 2;
  width: 300px;
  height: 200px;
  padding: 15px;
  border: 1px solid ${colors.lightGrey};
  border-radius: 10px;
  position: relative;

  .chartBackground {
    width: 300px;
    height: 200px;
  }
  .stockInformationContainer {
    display: flex;
    align-items: 'center';
    width: 100%;
    position: absolute;
    justify-content: space-between;
    margin-top: 5px;
    padding-bottom: 10px;
    bottom: 0;
    left: 0;
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
    padding-left: 10px;
  }
  .stockPrice {
    width: 33%;
    text-align: end;
    padding-right: 10px;
  }
  .closeChartButton {
    cursor: pointer;
    width: 15px;
    padding: 3px;
  }
  canvas {
    width: 300px !important;
    height: 150px !important;
  }
`;

export default StyledChartCard;
