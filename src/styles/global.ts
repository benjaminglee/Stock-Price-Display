import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
body {
    font-family: 'Poppins', sans-serif;
    background-color: #1F2123;
    * {
        color: #F0F3EF
    };
    ::-webkit-scrollbar {
    width: 0px;
}

::-webkit-scrollbar-track {
  background-color: #09141a;
}

::-webkit-scrollbar-thumb {
  background-color: rgb(33, 54, 66);
  border-radius: 30px;
  z-index: 999;
  background-clip: content-box;
  opacity: 0;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
  width: 20px;
}
}
`;
