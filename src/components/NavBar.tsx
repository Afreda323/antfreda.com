import React from 'react'
import styled from 'styled-components'
import get from 'lodash/get'
import ResumeLink from './ResumeLink'
import { Theme } from '../theme'

function Navbar() {
  return (
    <Wrapper>
      <Logo href="#top">AF</Logo>
      <div>
        <Link href="#about">About</Link>
        <Link href="#exp">Experience</Link>
        <Link href="#work">Work</Link>
        <Link href="#contact">Contact</Link>
        <ResumeLink />
      </div>
    </Wrapper>
  )
}

interface StyledProps {
  theme: Theme
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  justify-content: space-between;
  top: 0px;
  background-color: rgb(10, 25, 47);
  z-index: 11;
  width: 100%;
  height: 70px;
  font-size: 13px;
  box-shadow: rgba(2, 12, 27, 0.9) 0px 2px 4px;
  pointer-events: auto !important;
  user-select: auto !important;
  padding: 0px 50px;
  transition: all 0.25s;
  ${({ theme }: StyledProps) => `
    background-color: ${get(
      theme,
      'palette.background.dark',
      'rgba(37, 41, 68, 0.99)'
    )};
    color: ${get(theme, 'palette.text.main', 'rgb(189, 201, 234)')};
  `}
`

const Logo = styled.a`
  font-size: 1.5rem;
  cursor: pointer;
  text-decoration: none;
  ${({ theme }: StyledProps) => `
      color: ${get(theme, 'palette.text.highlight', 'rgb(87, 220, 204);')};
  `}
`

const Link = styled.a`
  display: inline-block;
  color: inherit;
  position: relative;
  cursor: pointer;
  text-decoration: none;
  padding: 12px 10px;
  transition: color 0.2s;

  &:hover {
    ${({ theme }: StyledProps) => `
      color: ${get(theme, 'palette.text.highlight', 'rgb(100, 255, 218)')};
  `}
  }
`

export default Navbar
