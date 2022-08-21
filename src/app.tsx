import React from 'react';
import './app.css';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useFlags } from './settings/flags-provider';
import styled from 'styled-components';
import { darkTheme, lightTheme } from './settings/theme';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

const Root = styled.div`
  display: flex;
  width: 100vw;
  & > *{
    flex: 1;
  }
`;

const App = (props: { children: React.ReactElement }) => {
  let { getFlags } = useFlags();
  
  const client = new ApolloClient({
    uri: getFlags().API_URI,
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "no-cache"
      },
    },
  });
  
  return (
    <ThemeProvider theme={getFlags().theme === "dark" ? darkTheme :  lightTheme}>
      <ApolloProvider client={client}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <Root className="App">
            <CssBaseline />
            { props.children }
          </Root>
        </LocalizationProvider>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;
