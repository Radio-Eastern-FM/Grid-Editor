import React from 'react'
import styled from 'styled-components';
import Header from './header'

const Wrapper = styled.div`
  padding: ${(props: {padding: string}) => props.padding};
`;

export const Page = (props:{children: any, padding?: string}) => {
  return(
    <div>
      <Header />
      <Wrapper padding={props.padding ?? 'unset'}>
        {props.children}
      </Wrapper>
    </div>
  )
}
