import { styled } from 'styled-components';
import { colors } from '../../styles/constants';

const StyledSearchBar = styled.div<{ searchResultSizeSmall: boolean }>`
  margin-top: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;

  input {
    font-family: 'Roboto', sans-serif;
    max-width: 660px;
    width: 100%;
    padding: 6px;
    padding-left: 15px;
    background-color: #343a40;
    font-size: 22px;
    border: none;
    border-radius: 6px;
    height: 50px;
    color: ${colors.white}; /* Text color set to white */

    &::placeholder {
      color: ${colors.lightGrey};
    }

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
    max-width: 680px;
    max-height: 325px;
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
  }

  .searchResult {
    height: 50px;
    min-height: 50px;
    width: ${(p) => (p.searchResultSizeSmall ? '99%' : '100%')};
    background-color: #4a525a;
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
