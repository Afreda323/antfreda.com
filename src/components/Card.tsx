import React from 'react'
import styled from 'styled-components'
import { GoLinkExternal, GoMarkGithub, GoFileCode } from 'react-icons/go'
import { Theme } from '../theme'
import get from 'lodash/get'
import { Repo } from '../services/github'
import { P, H4, A } from './Text'

function Card({ repo }: { repo: Repo }) {
  return (
    <Wrapper>
      <GoFileCode />
      <A target="_blank" href={repo.html_url}>
        <GoMarkGithub />
      </A>
      {repo.homepage && (
        <A target="_blank" href={repo.homepage}>
          <GoLinkExternal />
        </A>
      )}
      <P style={{color: 'white'}}>{repo.name}</P>
      <Desc>
        {repo.description || 'No description provided for this repo.'}
      </Desc>
      <P>Written in {repo.language}</P>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: calc(50% - 10px);
  border-radius: 3px;
  box-shadow: rgba(2, 12, 27, 0.9) 0px 2px 4px;
  padding: 20px;
  margin-bottom: 20px;
  ${({ theme }: { theme: Theme }) => `
    background-color: ${get(
      theme,
      'palette.background.main',
      'rgba(100, 255, 218, .1)'
    )};
  `}
`

const Desc = styled.p`
  line-height: 1.3;
  font-size: 15px;
  ${({ theme }: { theme: Theme }) => `
    color: ${get(theme, 'palette.text.main', 'rgb(100, 255, 218)')};
`}
`

export default Card
