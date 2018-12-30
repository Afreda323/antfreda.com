import React from 'react'
import styled, { keyframes, css } from 'styled-components'
import get from 'lodash/get'
import { H4, P, Ul, Li, A } from './Text'
import { Theme } from '../theme'

export interface Job {
  company: string
  companyLink: string
  title: string
  start: string
  end: string
  tasks: Array<string>
}

interface Props {
  exp: Array<Job>
}

interface State {
  activeIndex: number
}

class Timeline extends React.Component<Props, State> {
  state = {
    activeIndex: 0
  }

  /**
   * Update the timeline card that is currently displayed
   * @param i - The index you want selected
   */
  updateIndex = (i: number) => {
    this.setState({ activeIndex: i })
  }

  /**
   * Loop through props and render a <Company /> for each
   */
  mapCompanies = (): Array<JSX.Element> => {
    return this.props.exp.map(({ company }, i) => (
      <Company
        onClick={() => this.updateIndex(i)}
        isActive={i === this.state.activeIndex}
        key={`${company}-${i}`}
      >
        {company}
      </Company>
    ))
  }

  /**
   * Render a job card for the selected index
   */
  getJobs = (): Array<JSX.Element> => {
    return this.props.exp.map((job, i) => (
      <Summary
        key={`${job.company}-${job.title}-${i}`}
        isActive={i === this.state.activeIndex}
      >
        <P style={{ lineHeight: 1.2 }}>
          {job.title}{' '}
          <A target="_blank" href={job.companyLink}>
            @{job.company}
          </A>
          <br />
          <span style={{ paddingTop: 3, fontSize: '80%' }}>
            {job.start} – {job.end}
          </span>
        </P>
        <br />
        <Ul>
          {job.tasks.map((task, i) => (
            <Li key={`task-${i}`}>{task}</Li>
          ))}
        </Ul>
      </Summary>
    ))
  }

  render() {
    return (
      <Wrapper>
        <Companies>{this.mapCompanies()}</Companies>
        <div>{this.getJobs()}</div>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  display: flex;
  ${({ theme }: { theme: Theme }) => `
    border: 1px solid ${get(
      theme,
      'palette.background.light',
      'rgba(100, 255, 218, .1)'
    )};
    background-color: ${get(
      theme,
      'palette.background.dark',
      'rgba(37, 41, 68, 0.99)'
    )};
    @media (max-width: ${get(theme, 'breakpoints.small', '700px')}) {
        display: block
      }
  `}
`
const Companies = styled.div`
  ${({ theme }: { theme: Theme }) => `
    border-right: 1px solid ${get(
      theme,
      'palette.background.light',
      'rgba(100, 255, 218, .1)'
    )};
    @media (max-width: ${get(theme, 'breakpoints.small', '700px')}) {
        display: flex;
        justify-content: stretch;
        border-right: none;
        border-bottom: 1px solid ${get(
          theme,
          'palette.background.light',
          'rgba(100, 255, 218, .1)'
        )};
      }
  `}
`

const activeCompany = (theme: Theme) => `
  opacity: 1;
  pointer-events: all;
  color: ${get(theme, 'palette.text.highlight', 'rgba(100, 255, 218, .1)')};
  cursor: default;
  background-color: ${get(
    theme,
    'palette.background.highlight',
    'rgba(100, 255, 218, .1)'
  )};
`

const Company = styled.div`
  padding: 20px 20px;
  font-size: 15px;
  width: 150px;
  transition: background-color 0.2s, color 0.2s;
  cursor: pointer;

  ${({ theme, isActive }: { theme: Theme; isActive: boolean }) => `
      color: ${get(theme, 'palette.text.main', 'rgb(100, 255, 218)')};
      ${isActive ? activeCompany(theme) : ''}
      :hover {
        background-color: ${get(
          theme,
          'palette.background.highlight',
          'rgba(100, 255, 218, .1)'
        )} !important;
        color: ${get(
          theme,
          'palette.text.highlight',
          'rgba(100, 255, 218, .1)'
        )};
      }
       @media (max-width: ${get(theme, 'breakpoints.small', '700px')}) {
            flex: 1;
            text-align: center;
            padding: 20px 10px;
        }
    `}
`

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`

const activeSummary = css`
  opacity: 1;
  z-index: 2;
  position: relative;
  visibility: visible;
`
const inactiveSummary = css`
  opacity: 0;
  z-index: -1;
  position: absolute;
  visibility: hidden;
`
const Summary = styled.div`
  padding: 40px 20px;
  transition: all 0.8s;
  top: 0px;
  left: 0px;
  width: 100%;
  height: auto;
  ${({ theme, isActive }: { theme: Theme; isActive: boolean }) => `
    ${isActive ? activeSummary : inactiveSummary}
    @media (max-width: ${get(theme, 'breakpoints.small', '700px')}) {
        ul {
            display: block;
        }
        li {
            width: 100%;
        }
    }
  `}
`

export default Timeline
