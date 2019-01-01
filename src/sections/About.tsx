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
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam
          sit nisi laborum aspernatur itaque adipisci dolores tempore dolorem,
          dolore odit explicabo tenetur magni sequi amet voluptate? Beatae
          minima consequatur assumenda! Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Inventore, deserunt quis veniam, officiis debitis,
          reiciendis quasi fuga similique sunt earum minus dolorem. Nesciunt
          voluptatem fuga numquam culpa vero fugit iste.
        </P>
        <br />
        <P>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta
          fugiat, provident illo nesciunt perspiciatis repellendus reprehenderit
          molestias minus corporis vitae. Ipsa dolor ab modi nihil doloribus
          maiores nesciunt doloremque laboriosam?
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
