import React from 'react'
import styled from 'styled-components'
import get from 'lodash/get'
import { GoMail } from 'react-icons/go'
import { Theme } from '../theme'
import { fetchGithubProfile, Repo } from '../services/github'
import { H3, P, A, H1 } from '../components/Text'
import Loader from '../components/Loader'
import Button from '../components/Button'
import { Input, TextArea } from '../components/TextInput'

interface State {
  isLoading: boolean
  error: boolean
  errorMsg: string
  form: {
    name: string
    email: string
    message: string
  }
}

class Contact extends React.Component<{}, State> {
  state = {
    isLoading: false,
    error: false,
    errorMsg: '',
    form: {
      name: '',
      email: '',
      message: ''
    }
  }

  /**
   * Update the form based on the id of the input
   * @param e - event object
   */
  updateForm = (e: React.SyntheticEvent) => {
    let target = e.target as HTMLInputElement
    this.setState({
      form: {
        ...this.state.form,
        [target.name]: target.value
      }
    })
  }

  render() {
    const { form } = this.state
    return (
      <Wrapper id="contact">
        <Inner>
          <br />
          <br />
          <Form>
              
              <TextWrap>
              <H3 block>Contact Me</H3>
              <br />
              <br/>
              <P>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non iure voluptatem voluptatibus iste magnam minus explicabo quidem quibusdam enim numquam! Nobis, illo nesciunt? Maxime debitis nemo, eius esse atque repudiandae.</P>
              </TextWrap>

              <Input
                label="Name"
                placeholder="John Doe"
                name="name"
                type="text"
                onChange={this.updateForm}
                value={form.name}
              />
              <Input
                label="Email Address"
                placeholder="example@domain.com"
                name="email"
                type="email"
                onChange={this.updateForm}
                value={form.email}
              />
              <TextArea
                placeholder="Your message here.."
                label="Message"
                name="message"
                onChange={this.updateForm}
                value={form.message}
              />
              <ButtonWrap>
              <Button>Hit me up</Button>
            </ButtonWrap>
          </Form>
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
    background: ${get(
      theme,
      'palette.background.light',
      'rgba(100, 255, 218, .1)'
    )};
    @media (max-width: ${get(theme, 'breakpoints.small', '700px')}) {
      padding: 100px 15px 100px;
      background: ${get(
        theme,
        'palette.gradients.linear',
        'rgba(100, 255, 218, .1)'
      )};
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

const Form = styled.form`
  margin: 0 auto;
  padding: 0 40px;
  border-radius: 3px;

  ${({ theme }: { theme: Theme }) => `
    @media (max-width: ${get(theme, 'breakpoints.medium', '1200px')}) {
        width: 80%;
    }
    @media (max-width: ${get(theme, 'breakpoints.small', '700px')}) {
        width: 100%;
        padding: 0;
    }
    `}
`

const ButtonWrap = styled.div`
  padding: 20px 20px 20px 0;
`
const TextWrap = styled.div`
  padding: 20px 20px 30px 0;
`

export default Contact
