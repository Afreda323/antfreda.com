import styled from 'styled-components'
import { Theme } from '../theme'
import get from 'lodash/get'

interface Props {
  theme: Theme
}

const Page = styled.div.attrs({
  className: 'page'
})`
  padding: 20px;
  height: 100vh;
  width: 100vw;
  max-height: 100vh;
  overflow: auto;
  padding-top: 100px;
  ${({ theme }: Props) => `
    background-color: ${get(
      theme,
      'palette.background.dark',
      'rgba(37, 41, 68, 0.99)'
    )};
    color: ${get(theme, 'palette.text.main', 'rgb(189, 201, 234)')};
    @media (max-width: ${get(theme, 'breakpoints.small', '700px')}) {
        padding-top: 50px;
    }
  `}
`

export default Page
