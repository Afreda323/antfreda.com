import React from 'react'
import styled, { keyframes } from 'styled-components'
import get from 'lodash/get'
import { Theme } from '../theme'

function Loader() {
  return (
      <Outer>
          <Wrapper>
      <div />
      <div />
      <div />
      <div />
      <div />
    </Wrapper>
      </Outer>
    
  )
}
const fadeIn = keyframes`
    0% {
        opacity: 0;
    }
    50% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`
const load = keyframes`
    50% {
        filter: blur(5px);
        transform: translateY(-10px);
        opacity: 0.3;
    }
`
const Outer = styled.div`
    animation: ${fadeIn} 1.5s ;
`

const Wrapper = styled.div`
  width: 100px;
  height: 15px;
  margin: 0 auto 0 auto;
  position: relative;
  > div {
    height: 15px;
    width: 15px;
    ${({ theme }: { theme: Theme }) => `
            background-color: ${get(
              theme,
              'palette.text.highlight',
              '#eee'
            )};
        `}
    float: left;
    margin: 0 5px 0 0;
    animation: ${load} 0.7s infinite;
    opacity: 0.5;
    border-radius: 10%;
  }

  > div:nth-child(1) {
    animation-delay: 0.1s;
  }

  > div:nth-child(2) {
    animation-delay: 0.2s;
  }

  > div:nth-child(3) {
    animation-delay: 0.3s;
  }

  > div:nth-child(4) {
    animation-delay: 0.4s;
  }

  > div:nth-child(5) {
    animation-delay: 0.5s;
  }
`

export default Loader
