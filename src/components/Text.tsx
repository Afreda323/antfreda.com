import styled from 'styled-components'
import get from 'lodash/get'
import { Theme } from '../theme'

interface Props {
  theme: Theme
}

export const H1 = styled.h1`
  font-size: 80px;
  ${({ theme }: Props) => `
    color: ${get(theme, 'palette.text.light', 'rgb(100, 255, 218)')};
    > span {
        color: ${get(theme, 'palette.text.main', 'rgb(100, 255, 218)')};
    }
  `}

  ${({ theme }: Props) => `
        @media (max-width: ${get(theme, 'breakpoints.medium', '1000px')}) {
            font-size: 60px;
        }
    `}

    ${({ theme }: Props) => `
        @media (max-width: ${get(theme, 'breakpoints.small', '700px')}) {
            font-size: 40px;
        }
    `}
    
`

export const H2 = styled.h2`
font-size: 60px;
  ${({ theme }: Props) => `
    color: ${get(theme, 'palette.text.main', 'rgb(100, 255, 218)')};
    > span {
        color: ${get(theme, 'palette.text.highlight', 'rgb(100, 255, 218)')};
    }
  `}

  ${({ theme }: Props) => `
        @media (max-width: ${get(theme, 'breakpoints.medium', '1000px')}) {
            font-size: 40px;
        }
    `}

    ${({ theme }: Props) => `
        @media (max-width: ${get(theme, 'breakpoints.small', '700px')}) {
            font-size: 20px;
        }
    `}
`

export const H3 = styled.h3``

export const H4 = styled.h4``

export const P = styled.p``

export const Ul = styled.ul``

export const Li = styled.li``

export const A = styled.a`
  text-decoration: none;
  ${({ theme }: Props) => `
    color: ${get(theme, 'palette.text.highlight', 'rgb(100, 255, 218)')};
`}
`
