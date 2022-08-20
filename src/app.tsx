import React from 'react';
import './app.css';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useFlags } from './settings/flags-provider';
import styled from 'styled-components';
import { darkTheme, lightTheme } from './settings/theme';

const Root = styled.div`
  display: flex;
  width: 100vw;
  & > *{
    flex: 1;
  }
`;

const App = (props: { children: React.ReactElement }) => {
  let { getFlags } = useFlags();
  
  return (
    <ThemeProvider theme={getFlags().theme === "dark" ? darkTheme :  lightTheme}>
      <Root className="App">
        <CssBaseline />
        { props.children }
      </Root>
    </ThemeProvider>
  );
}

export default App;
