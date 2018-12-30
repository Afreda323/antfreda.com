import styled from 'styled-components'
import { Theme } from '../theme'
import get from 'lodash/get'

interface Props {
  theme: Theme
}

const Page = styled.div.attrs({
  className: 'page'
})`
  width: 100vw;
  min-height: 100vh;
  ${({ theme }: Props) => `
    background-color: ${get(
      theme,
      'palette.background.main',
      'rgba(37, 41, 68, 0.99)'
    )};
    color: ${get(theme, 'palette.text.main', 'rgb(189, 201, 234)')};
  `}
`

export default Page
