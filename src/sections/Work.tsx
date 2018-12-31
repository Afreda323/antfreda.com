import React from 'react'
import styled from 'styled-components'
import get from 'lodash/get'
import { Theme } from '../theme'
import { fetchGithubProfile, Repo } from '../services/github'
import Card from '../components/Card'
import { H3, P, A, Error } from '../components/Text'
import Loader from '../components/Loader'
import Button from '../components/Button'

interface State {
  isLoading: boolean
  data: Array<Repo>
  error: boolean
}

class Work extends React.Component<{}, State> {
  state = {
    isLoading: false,
    error: false,
    data: [] as Array<Repo>
  }
  /**
   * Fetches repo data from github
   */
  async componentDidMount() {
    try {
      this.setState({ isLoading: true })
      const data: Repo[] = await fetchGithubProfile()
      this.setState({ isLoading: false, data })
    } catch (e) {
      this.setState({ isLoading: false, error: true })
    }
  }

  /**
   * Check the state of the component,
   * render either cards, the error or the loading state
   */
  renderData() {
    const { isLoading, error, data } = this.state
    if (isLoading) {
      return <Loader />
    }
    if (error) {
      return <P><Error>Something went wrong fetching the repos.</Error></P>
    }
    if (data.length) {
      return (
        <WorkWrap>
          {data.map(repo => (
            <Card key={repo.id} repo={repo} />
          ))}
        </WorkWrap>
      )
    }

    return <p>No repos found</p>
  }

  render() {
    return (
      <Wrapper id="work">
        <Inner>
          <H3 block>My Code</H3>
          <br />
          <br />
          {this.renderData()}
          <ButtonWrap>
            <A target="_blank" href="https://github.com/Afreda323">
              <Button>View it all on Github</Button>
            </A>
          </ButtonWrap>
        </Inner>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  padding: 100px 30px 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }: { theme: Theme }) => `
    background: ${get(theme, 'palette.background.dark', '')};
    @media (max-width: ${get(theme, 'breakpoints.small', '700px')}) {
      padding: 100px 15px 100px;
  }
  `}
`

const Inner = styled.div`
  width: 70%;
  ${({ theme }: { theme: Theme }) => `
        @media (max-width: ${get(theme, 'breakpoints.medium', '1200px')}) {
            width: 80%;
        }
        @media (max-width: ${get(theme, 'breakpoints.small', '700px')}) {
            width: 100%;
        }
    `}
`

const ButtonWrap = styled.div`
  text-align: center;
  padding: 20px;
`

const WorkWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

export default Work
