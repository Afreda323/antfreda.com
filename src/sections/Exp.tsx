import React from 'react'
import styled from 'styled-components'
import get from 'lodash/get'
import { Theme } from '../theme'
import { H3 } from '../components/Text'
import Timeline, { Job } from '../components/Timeline'

const JOBS: Array<Job> = [
  {
    company: 'Bank of America',
    companyLink: 'https://bankofamerica.com',
    title: 'Assistant Vice President; Software Engineer',
    start: 'July 2017',
    end: 'Now',
    tasks: [
      'Developed workflow automation web applications for internal Info-Security teams.',
      'Worked closely with costumers to gather requirements and ensure timely product delivery.',
      'Architected front end application scaffold/pipeline and UI component library using React and Typescript.',
      'Led development of Mattermost(Enterprise slack alternative) integrations across multiple applications/processes.',
      'Architected application state using React Context, Redux and ReduxSaga.',
      'Developed Backend APIs using Express/Koa and MongoDB/mySQL'
    ]
  },
  {
    company: 'Burke',
    companyLink: 'https://burke.design',
    title: 'Web Developer',
    start: 'January 2017',
    end: 'July 2017',
    tasks: []
  },
  {
    company: 'Freelance',
    companyLink: '#',
    title: 'Web Developer',
    start: 'January 2015',
    end: 'January 2017',
    tasks: []
  }
]

function Exp() {
  return (
    <Wrapper id="exp">
      <Inner>
        <H3 block>Experience</H3>
        <br />
        <br />
        <Timeline exp={JOBS} />
      </Inner>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 100px 30px 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }: { theme: Theme }) => `
    background: ${get(theme, 'palette.gradients.linear', '')};
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

export default Exp
