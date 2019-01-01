import React from 'react'
import styled from 'styled-components'
import { GoLinkExternal, GoMarkGithub, GoFileCode } from 'react-icons/go'
import { Theme } from '../theme'
import get from 'lodash/get'
import compose from 'lodash/fp/compose'
import { Repo } from '../services/github'
import { P, H4, A } from './Text'
import { getColor } from '../services/langColor'

/**
 * Remove dashes from strings, replace with spaces
 * @param str - string you want to alter
 */
const removeDashes = (str: string) => str.replace(/(-|_)/g, ' ')

/**
 * Add an ellipse to strings longer than 18 chars
 * @param str - string you want to alter
 */
const addEllipse = (str: string) =>
  str.length > 18 ? str.substr(0, 18) + '...' : str

function Card({ repo }: { repo: Repo }) {
  return (
    <Wrapper>
      <div>
        <Top>
          <P title={repo.name} style={{ color: 'white' }}>
            {compose(
              addEllipse,
              removeDashes
            )(repo.name)}
          </P>
          <Links>
            <A target="_blank" href={repo.html_url} title="Open Github">
              <GoMarkGithub />
            </A>
            {repo.homepage && (
              <A
                style={{ marginLeft: 5 }}
                target="_blank"
                href={repo.homepage}
                title="Open Website"
              >
                <GoLinkExternal />
              </A>
            )}
          </Links>
        </Top>
        <Middle>
          <Desc>
            {repo.description || 'No description provided for this repo.'}
          </Desc>
        </Middle>
      </div>

      <Bottom>
        <H4>
          Written in{' '}
          <Lang style={{ color: getColor(repo.language) }}>
            {repo.language}
          </Lang>
        </H4>
      </Bottom>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: calc(33% - 10px);
  border-radius: 3px;
  box-shadow: rgba(2, 12, 27, 0.9) 0px 2px 4px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.2s;
  :hover {
    transform: translateY(-5px);
  }

  ${({ theme }: { theme: Theme }) => `
    background-color: ${get(
      theme,
      'palette.background.main',
      'rgba(100, 255, 218, .1)'
    )};
    @media (max-width: ${get(theme, 'breakpoints.medium', '1300px')}) {
        width: calc(50% - 10px);
      }

      @media (max-width: ${get(theme, 'breakpoints.small', '700px')}) {
        width: 100%;
      }
  `}
`

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 40px;
  align-items: center;
  padding: 20px 30px;

  ${({ theme }: { theme: Theme }) => `
    background: ${get(
      theme,
      'palette.gradients.linear',
      'rgba(100, 255, 218, .1)'
    )};
`}
`

const Middle = styled.div`
  padding: 10px 30px;
`
const Bottom = styled.div`
  padding: 20px 30px;
`
const Links = styled.div`
  font-size: 22px;
`
const Desc = styled.p`
  line-height: 1.3;
  font-size: 15px;
  margin-top: 5px;
  ${({ theme }: { theme: Theme }) => `
    color: ${get(theme, 'palette.text.main', 'rgb(100, 255, 218)')};
`}
`

const Lang = styled.span`
  ${({ theme }: { theme: Theme }) => `
        color: ${get(theme, 'palette.text.light', 'rgb(100, 255, 218)')};
    `}
`

export default Card
