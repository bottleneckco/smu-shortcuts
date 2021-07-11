import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html {
    margin: 0;
    background-image: ${(props) => props.theme.background.gradient},
      url(/images/wallpapers/wallpaper-1.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center; 
`;

export default GlobalStyle;
