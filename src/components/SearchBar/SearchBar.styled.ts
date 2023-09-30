import { styled } from 'styled-components';
import { colors } from '../../styles/constants';

const StyledSearchBar = styled.div`
  margin-top: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;

  input {
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap');
    font-family: 'Roboto', sans-serif;
    max-width: 900px;
    width: 100%;
    height: 40px;
    padding: 20px;
    padding-left: 50px;
    background-color: ${colors.lightGrey};
    font-size: 22px;
    border: none;
    border-radius: 40px;

    &:focus {
      outline: none;
    }
  }
  .backdrop {
    width: 80%;
    display: flex;
    justify-content: center;
  }
  .resultsContainer {
    max-width: 900px;
    max-height: 300px;
    overflow-y: auto;
    width: 80%;
    position: absolute;
    top: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    z-index: 3;
    font-family: 'Roboto', sans-serif;
    /* box-sizing: border-box; */
  }
  .searchResult {
    height: 50px;
    min-height: 50px;
    max-width: 100%; /* Adjusted to prevent horizontal overflow */
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
    z-index: 4;
    box-sizing: border-box;

    &:hover {
      background-color: ${colors.lightGrey};
      color: white;
    }
  }
`;

export default StyledSearchBar;
