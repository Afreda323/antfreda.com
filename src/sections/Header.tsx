import React from 'react'
import styled from 'styled-components'
import { H1, H2, P, A } from '../components/Text'
import SmallBr from '../components/SmallBr'
import Button from '../components/Button';
import { Theme } from '../theme'
import get from 'lodash/get'

function Header() {
  return (
    <Wrapper id="top">
      <div>
        <H1>Anthony Freda</H1>
        <H2>
          Sofware Engineer <SmallBr /> <span>| Bank of America</span>
        </H2>
        <br />
        <br />
        <PWrapper>
        <P>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe culpa
          error consectetur amet cupiditate dolor non aliquid. Deserunt hic,
          nisi, natus aliquam quisquam consectetur fuga, possimus error
          reprehenderit incidunt exercitationem!
        </P>
        </PWrapper>
        <br />
        <br />
        <A href="#contact"><Button>Contact Me</Button></A>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
    height: 100vh;
    display: flex;
    padding: 200px 50px 100px;
    ${({ theme }: {theme: Theme}) => `
        @media (max-width: ${get(theme, 'breakpoints.small', '700px')}) {
            padding: 150px 10px 100px;
        }
    `}
`
const PWrapper = styled.div`
    width: 500px;
    ${({ theme }: {theme: Theme}) => `
        @media (max-width: ${get(theme, 'breakpoints.small', '700px')}) {
            width: 100%
        }
    `}
`

export default Header
