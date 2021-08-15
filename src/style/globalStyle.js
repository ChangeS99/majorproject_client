import {createGlobalStyle} from 'styled-components';

export const GlobalStyle = createGlobalStyle`

    html {
        box-sizing: border-box;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    body {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        
    }

    #root {
        margin: 0;
        padding: 0;
        width: 100vw;
        height: 100vh; 
    }

    *, *:before, *:after {
        box-sizing: inherit;
    }

`;