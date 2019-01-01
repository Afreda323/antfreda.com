import React from 'react'
import styled from 'styled-components'
import get from 'lodash/get'
import {
  FaTwitterSquare,
  FaGithubSquare,
  FaLinkedin,
  FaEnvelopeSquare
} from 'react-icons/fa'
import { Theme } from '../theme'
import { A } from './Text'

function Social() {
  return (
    <Icons>
      <A href="mailto:anthonyfreda323@gmail.com">
        <FaEnvelopeSquare />
      </A>
      <A target="_blank" href="https://www.linkedin.com/in/antfreda323/">
        <FaLinkedin />
      </A>
      <A target="_blank" href="https://github.com/Afreda323">
        <FaGithubSquare />
      </A>
      <A target="_blank" href="https://twitter.com/anthonyfreda_">
        <FaTwitterSquare />
      </A>
    </Icons>
  )
}

const Icons = styled.span`
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0.8;

  ${({ theme }: { theme: Theme }) => `
  > a {
    font-size: 20px;
    padding: 5px 15px;
    color: ${get(theme, 'palette.text.main', 'rgba(21, 23, 39, 0.99)')}; 
  }
  :before {
      border-radius: 2px;
    content: '';
    height: 201px;
    width: 1px;
    background-color: ${get(
      theme,
      'palette.text.main',
      'rgba(21, 23, 39, 0.99)'
    )};
    margin-bottom: 12px;
    margin-right: 2px;
  }
  :after {
    border-radius: 2px;
    content: '';
    height: 121px;
    width: 1px;
    background-color: ${get(
      theme,
      'palette.text.main',
      'rgba(21, 23, 39, 0.99)'
    )};
    margin-top: 12px;
    margin-right: 2px;
  }
    @media (max-width: ${get(theme, 'breakpoints.small', '700px')}) {
        position: relative;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        > a {
            font-size: 20px;
            padding: 5px;
          }
        :before {
           display: none;
        }
        :after {
          display: none;
    }
    
  `}
`

export default Social
