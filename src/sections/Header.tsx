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
            Specialized in full stack{' '}
            <A target="_blank" href="https://www.javascript.com/">
              Javascript
            </A>{' '}
            ,{' '}
            <A target="_blank" href="https://www.typescriptlang.org/">
              Typescript
            </A>{' '}
            and all of their flavors. . When not at work I like to spend some
            time trying to learn new technologies. I'm currently getting deep in
            the land of{' '}
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
  padding: 220px 220px 220px;
  ${({ theme }: { theme: Theme }) => `
        background: ${get(theme, 'palette.gradients.radial', '')};
        @media (max-width: ${get(theme, 'breakpoints.medium', '1200px')}) {
            padding: 200px 120px 200px;
        }
        @media (max-width: ${get(theme, 'breakpoints.small', '700px')}) {
            padding: 200px 30px 200px;
            min-height: 300px;
            background: ${get(theme, 'palette.gradients.linear', '')};
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
