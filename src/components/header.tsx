import { Button } from '@mui/material';
import React from 'react'
import styled, { useTheme } from 'styled-components';

const Wrapper = styled.div`
  width: 100vw;
  display: fixed;
  padding: 0.5em;
  display: flex;
  justify-content: space-between;
  border-bottom: solid 1px ${({theme}) => theme.palette?.divider};
  top: 0;
  left: 0;
  right: 0;
`;

const Header = () => {
  const theme = useTheme();
  return(
    <Wrapper theme={theme}>
      <Button variant='outlined' href='/'>
        Home
      </Button>
      <Button variant='outlined' href='/settings'>
        Settings
      </Button>
    </Wrapper>
  )
}

export default Header;
