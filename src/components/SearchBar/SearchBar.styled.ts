import { styled } from 'styled-components';
import { colors } from '../../styles/constants';

const StyledSearchBar = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;

  input {
    max-width: 900px;
    width: 80%;
    height: 60px;
    padding: 12px;
    background-color: ${colors.lightGrey};
    font-size: 24px;
    border: none;
    border-radius: 8px;

    &:focus {
      outline: none;
    }
  }

  .resultsContainer {
    max-width: 900px;
    width: 80%;
    position: absolute;
    top: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .searchResult {
    height: 50px;
    max-width: 900px;
    width: 100%;
    background-color: ${colors.mediumGrey};
    border-radius: 8px;
    margin-top: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    font-size: 20px;
    cursor: pointer;

    &:hover {
      background-color: ${colors.lightGrey};
      color: white;
    }
  }
`;

export default StyledSearchBar;
