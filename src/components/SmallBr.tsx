import styled from 'styled-components'
import get from 'lodash/get'
import { Theme } from '../theme'

export default styled.br`
  display: none
    ${({ theme }: { theme: Theme }) => `
    @media (max-width: ${get(theme, 'breakpoints.small', '700px')}) {
        // display: block;
    }
`};
`
