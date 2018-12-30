import styled from 'styled-components'
import get from 'lodash/get'
import { Theme } from '../theme'

interface Props {
  theme: Theme
}

export default styled.button`
  background-color: transparent;
  line-height: 1;
  cursor: pointer;
  font-size: 16px;
  border-radius: 2px;
  padding: 12px 17px;
  text-decoration: none;
  transition: background-color 0.2s, box-shadow .2s;;

  ${({ theme }: Props) => `
    border: 1px solid ${get(
      theme,
      'palette.text.highlight',
      'rgb(100, 255, 218)'
    )};
    color: ${get(theme, 'palette.text.highlight', 'rgb(100, 255, 218)')};
  `}

  :hover {
    ${({ theme }: Props) => `
    background-color: ${get(
      theme,
      'palette.background.highlight',
      'rgba(100, 255, 218, .1)'
    )};
  `}

    box-shadow: rgba(2, 12, 27, 0.9) 0px 2px 4px;
  }
`
