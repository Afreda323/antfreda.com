import React from 'react'
import styled from 'styled-components'
import get from 'lodash/get'
import ResumeLink from './ResumeLink'
import { Theme } from '../theme'

interface State {
  isOpen: boolean
}

class Navbar extends React.Component<{}, State> {
  state = {
    isOpen: false
  }

  /**
   * Toggle the menu boolean in state
   * @param bool - The value to change the isOpen value to
   */
  toggleMenu = (bool: boolean) => {
    this.setState({ isOpen: bool })
  }

  render() {
    const { isOpen } = this.state
    return (
      <Wrapper isActive={this.state.isOpen}>
        <MenuButton onClick={() => this.toggleMenu(!isOpen)}>
          {!isOpen ? 'Menu' : 'Close'}
        </MenuButton>
        <Logo href="#top">_AFreda</Logo>
        <LinksWrap>
          <Link onClick={() => this.toggleMenu(false)} href="#about">About</Link>
          <Link onClick={() => this.toggleMenu(false)} href="#exp">Experience</Link>
          <Link onClick={() => this.toggleMenu(false)} href="#work">Work</Link>
          <Link onClick={() => this.toggleMenu(false)} style={{ marginRight: 10 }} href="#contact">
            Contact
          </Link>
          <Spacer />
          <ResumeLink />
        </LinksWrap>
      </Wrapper>
    )
  }
}

interface WrapperProps {
  theme: Theme
  isActive?: boolean
}

const MenuButton = styled.button`
  position: fixed;
  top: 10px;
  right: 10px;
  background-color: transparent;
  line-height: 1;
  cursor: pointer;
  margin-left: 10px;
  font-size: 13px;
  border-radius: 2px;
  padding: 6px 15px;
  text-decoration: none;
  transition: background-color 0.2s, box-shadow: .2s;
  margin-right: 5px;
  display: none;

  ${({ theme }: { theme: Theme }) => `
    border: 1px solid ${get(
      theme,
      'palette.text.highlight',
      'rgb(100, 255, 218)'
    )};
    color: ${get(theme, 'palette.text.highlight', 'rgb(100, 255, 218);')};
  `}

  :hover {
    ${({ theme }: { theme: Theme }) => `
    background-color: ${get(
      theme,
      'palette.background.highlight',
      'rgba(100, 255, 218, .1)'
    )};

    box-shadow: rgba(2, 12, 27, 0.9) 0px 2px 4px;
  `}
  }

  ${({ theme }: { theme: Theme }) => `
        @media (max-width: ${get(theme, 'breakpoints.small', '700px')}) {
          display: inline-block;
          background-color: ${get(
            theme,
            'palette.background.main',
            'rgba(100, 255, 218, .1)'
          )};
        }
    `}
`

const Wrapper = styled.div<WrapperProps>`
  display: flex;
  align-items: center;
  position: fixed;
  justify-content: space-between;
  top: 0px;
  z-index: 11;
  width: 100%;
  height: 70px;
  box-shadow: rgba(2, 12, 27, 0.9) 0px 2px 4px;
  pointer-events: auto !important;
  user-select: auto !important;
  padding: 0px 50px;
  transition: all 0.25s;
  ${({ theme }: WrapperProps) => `
    background-color: ${get(
      theme,
      'palette.background.dark',
      'rgba(21, 23, 39, 0.99)'
    )};
    color: ${get(theme, 'palette.text.main', 'rgb(189, 201, 234)')};
  `}

  ${({ theme, isActive }: WrapperProps) => `
        @media (max-width: ${get(theme, 'breakpoints.small', '700px')}) {
            right: 0;
            width: 250px;
            max-width: 100%;
            flex-direction: column;
            justify-content: flex-start;
            height: 100%;
            padding: 50px 0;
            ${!isActive ? 'right: -1000px;' : 'right: 0'};
        }
    `}
`

const LinksWrap = styled.div`
  ${({ theme }: { theme: Theme }) => `
        @media (max-width: ${get(theme, 'breakpoints.small', '700px')}) {
          display: flex;
          flex-direction: column;
          width: 100%;
          align-items: baseline;
          > button {
            margin-left: 20px;
          }
        }
    `}
`

const Logo = styled.a`
  font-size: 25px;
  cursor: pointer;
  text-decoration: none;
  font-family: 'Courier New', Courier, monospace !important;
  ${({ theme }: { theme: Theme }) => `
      color: ${get(theme, 'palette.text.highlight', 'rgb(87, 220, 204)')};
  `}
  ${({ theme }: { theme: Theme }) => `
        @media (max-width: ${get(theme, 'breakpoints.small', '700px')}) {
            width: 100%;
            padding: 20px; 
        }
    `}
`

const Spacer = styled.div`
  display: none;
  ${({ theme }: { theme: Theme }) => `
    @media (max-width: ${get(theme, 'breakpoints.small', '700px')}) {
        height: 20px;
        display: block;
    }
  `}
`

const Link = styled.a`
  font-size: 15px;
  display: inline-block;
  color: inherit;
  position: relative;
  cursor: pointer;
  text-decoration: none;
  padding: 12px 10px;
  transition: color 0.2s, background-color .2s;

  &:hover {
    ${({ theme }: { theme: Theme }) => `
      color: ${get(theme, 'palette.text.highlight', 'rgb(100, 255, 218)')};
  `}
  }

  ${({ theme }: { theme: Theme }) => `
        @media (max-width: ${get(theme, 'breakpoints.small', '700px')}) {
          font-size: 20px;
          width: 100%;
          padding: 12px 60px 12px 20px;
          &:hover {
            background-color: ${get(theme, 'palette.background.highlight', 'rgb(87, 220, 204);')}
          }
        }
    `}
`

export default Navbar
