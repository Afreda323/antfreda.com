import React from 'react'
import styled from 'styled-components'
import { H1, H2, P, A } from '../components/Text'
import SmallBr from '../components/SmallBr'
import Button from '../components/Button'
import { Theme } from '../theme'
import get from 'lodash/get'

function Header() {
  return (
    <Wrapper id="top">
      <div>
        <H1>Anthony Freda</H1>
        <H2>
          Sofware Engineer <SmallBr />{' '}
          <A target="_blank" href="https://bankofamerica.com">
            | Bank of America
          </A>
        </H2>
        <br />
        <br />
        <PWrapper>
          <P>
            Software Engineer working primarily with full stack{' '}
            <A target="_blank" href="https://www.javascript.com/">
              Javascript
            </A>{' '}
            and{' '}
            <A target="_blank" href="https://www.typescriptlang.org/">
              Typescript
            </A>
            . When not at work I like to spend some time trying to learn new
            technologies. I'm currently getting deep in the land of{' '}
            <A target="_blank" href="https://golang.org/">
              Go
            </A>{' '}
            and{' '}
            <A target="_blank" href="https://serverless.com/">
              Serverless
            </A>
            .
          </P>
        </PWrapper>
        <br />
        <br />
        <A href="#contact">
          <Button>Contact Me</Button>
        </A>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  padding: 200px 50px 100px;
  ${({ theme }: { theme: Theme }) => `
        @media (max-width: ${get(theme, 'breakpoints.small', '700px')}) {
            padding: 100px 10px 100px;
            min-height: 300px;
        }
    `}
`
const PWrapper = styled.div`
  width: 500px;
  ${({ theme }: { theme: Theme }) => `
        @media (max-width: ${get(theme, 'breakpoints.small', '700px')}) {
            width: 100%
        }
    `}
`

export default Header
