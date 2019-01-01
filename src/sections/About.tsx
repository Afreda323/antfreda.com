import React from 'react'
import styled from 'styled-components'
import get from 'lodash/get'
import { Theme } from '../theme'
import { H3, P, Ul, Li } from '../components/Text'

function About() {
  return (
    <Wrapper id="about">
      <Inner>
        <H3 block>About Me</H3>
        <br />
        <br />
        <P>
          Based in Charlotte, North Carolina, Anthony is a software engineer
          with multiple years of experience working with both agencies and
          Fortune 25 companies. Anthony currently specializes in web application
          development and architecture using cutting edge technologies as well
          as tried and true development methodologies.
        </P>
        <br />
        <P>Things I have experience with:</P>
        <br />
        <Ul>
          <Li>JavaScript</Li>
          <Li>TypeScript</Li>
          <Li>HTML | Pug</Li>
          <Li>CSS/Sass</Li>
          <Li>React | Redux</Li>
          <Li>React Native</Li>
          <Li>Vue | Vuex</Li>
          <Li>PWA</Li>
          <Li>Serverless Framework</Li>
          <Li>AWS</Li>
          <Li>Testing</Li>
          <Li>Node</Li>
          <Li>Express | Koa</Li>
          <Li>MongoDB</Li>
          <Li>SQL</Li>
          <Li>Python</Li>
          <Li>Go</Li>
          <Li>C# w/ Unity</Li>
          <Li>Elm</Li>
          <Li>Dart/Flutter</Li>
        </Ul>
      </Inner>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 150px 30px 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }: { theme: Theme }) => `
    background-color: ${get(
      theme,
      'palette.background.dark',
      'rgba(37, 41, 68, 0.99)'
    )};
    @media (max-width: ${get(theme, 'breakpoints.small', '700px')}) {
      padding: 150px 15px 150px;
    }
  `}
`
const Inner = styled.div`
  width: 70%;
  ${({ theme }: { theme: Theme }) => `
        @media (max-width: ${get(theme, 'breakpoints.medium', '1200px')}) {
            width: 80%;
        }
        @media (max-width: ${get(theme, 'breakpoints.small', '700px')}) {
            width: 100%;
        }
    `}
`

export default About
