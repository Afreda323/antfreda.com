import React from 'react'
import styled from 'styled-components'
import { P } from '../components/Text'
import Social from '../components/Social';

function Footer() {
  return (
    <Wrapper>
        <Social />
      <P>
        <Small>Developed in React with Typescript</Small>
      </P>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 10px 20px;
  text-align: center;
`
const Small = styled.small`
  font-size: 80%;
`

export default Footer
