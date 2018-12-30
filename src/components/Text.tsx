import styled from 'styled-components'
import get from 'lodash/get'
import { Theme } from '../theme'

interface Props {
  theme: Theme
}

export const H1 = styled.h1`
  font-size: 80px;
  font-weight: 700;
  ${({ theme }: Props) => `
    color: ${get(theme, 'palette.text.light', 'rgb(100, 255, 218)')};
    @media (max-width: ${get(theme, 'breakpoints.medium', '1000px')}) {
        font-size: 60px;
    }
    @media (max-width: ${get(theme, 'breakpoints.small', '700px')}) {
        font-size: 40px;
        margin-bottom: 7px;
    }
  `}
`

export const H2 = styled.h2`
  font-size: 60px;
  ${({ theme }: Props) => `
    color: ${get(theme, 'palette.text.main', 'rgb(100, 255, 218)')};
    @media (max-width: ${get(theme, 'breakpoints.medium', '1000px')}) {
        font-size: 45px;
    }
    @media (max-width: ${get(theme, 'breakpoints.small', '700px')}) {
        font-size: 22px;
    }
  `}
`

export const H3 = styled.h3`
  font-size: 50px;
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  white-space: nowrap;
  font-size: 30px;
  position: relative;

  ${({ theme }: Props) => `
  color: ${get(theme, 'palette.text.main', 'rgb(100, 255, 218)')};
  :after {
    content: "";
    display: block;
    height: 1px;
    width: 300px;
    background-color: ${get(
      theme,
      'palette.background.light',
      'rgb(45, 57, 82)'
    )};
    position: relative;
    margin: 0 20px;
}
`}

  ${({ theme }: Props) => `
      @media (max-width: ${get(theme, 'breakpoints.medium', '1000px')}) {
          font-size: 25px;
      }
      @media (max-width: ${get(theme, 'breakpoints.small', '700px')}) {
        font-size: 20px;
    }
  `}
`

export const H4 = styled.h4``

export const P = styled.p`
  line-height: 1.6;
  font-size: 20px;
  ${({ theme }: Props) => `
        color: ${get(theme, 'palette.text.main', 'rgb(100, 255, 218)')};
        @media (max-width: ${get(theme, 'breakpoints.medium', '1000px')}) {
            font-size: 18px;
        }
        @media (max-width: ${get(theme, 'breakpoints.small', '700px')}) {
            font-size: 16px;
        }
    `}
`

export const Ul = styled.ul`
  display: flex;
  flex-wrap: wrap;
`

export const Li = styled.li`
  position: relative;
  margin-bottom: 10px;
  padding-left: 20px;
  font-size: 15px;
  width: 33%;
  color: rgb(136, 146, 176);
  :before {
    content: '»';
    position: absolute;
    left: 0px;
    font-size: 22px;
    line-height: 12px;
    ${({ theme }: Props) => `
      color: ${get(theme, 'palette.text.highlight', 'rgb(100, 255, 218)')};
      @media (max-width: ${get(theme, 'breakpoints.medium', '1300px')}) {
        width: 50%;
    }
  `}
  }
`

export const A = styled.a`
  text-decoration: none;
  ${({ theme }: Props) => `
    color: ${get(theme, 'palette.text.highlight', 'rgb(100, 255, 218)')};
`}
`
