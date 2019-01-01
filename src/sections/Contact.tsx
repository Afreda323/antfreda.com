import React from 'react'
import styled from 'styled-components'
import get from 'lodash/get'
import { Theme } from '../theme'
import { submitContactForm, Form } from '../services/contact'
import { H3, P, Error } from '../components/Text'
import Button from '../components/Button'
import { Input, TextArea } from '../components/TextInput'
import Loader from '../components/Loader'

interface State {
  isLoading: boolean
  error: boolean
  errorMsg: string
  form: Form
  success: boolean
}

class Contact extends React.Component<{}, State> {
  state = {
    isLoading: false,
    error: false,
    success: false,
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

  /**
   * Submit form to lambda
   * @param e - event object
   */
  submitForm = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (this.state.isLoading) {
      return
    }

    this.setState({ isLoading: true, error: false, errorMsg: '' })

    try {
      const res = await submitContactForm(this.state.form)
      this.setState({ success: true })
    } catch (e) {
      return this.setState({
        error: true,
        errorMsg: e.message,
        isLoading: false
      })
    }

    this.setState({ isLoading: false })
  }

  render() {
    const { form, error, errorMsg, isLoading, success } = this.state
    return (
      <Wrapper id="contact">
        <Inner>
          <br />
          <br />
          <ContactForm onSubmit={this.submitForm}>
            <TextWrap>
              <H3 block>Contact Me</H3>
              <br />
              <br />
              <P>
                If you are in need of a website, web app, mobile app or even
                some advice regarding software development/design, be sure to
                full out the form. I will be sure to respond within 24 hours of
                recieving the email.
              </P>
            </TextWrap>

            <Input
              label="Name"
              required
              placeholder="John Doe"
              name="name"
              type="text"
              onChange={this.updateForm}
              value={form.name}
            />
            <Input
              label="Email Address"
              required
              placeholder="example@domain.com"
              name="email"
              type="email"
              onChange={this.updateForm}
              value={form.email}
            />
            <TextArea
              required
              placeholder="Your message here.."
              label="Message"
              name="message"
              onChange={this.updateForm}
              value={form.message}
            />
            {error && (
              <P>
                <Error>{errorMsg}</Error>
              </P>
            )}
            {isLoading && <Loader />}
            {success ? (
              <P>
                Your message has beem delivered. Please allow up to 24 hours for
                me to respond.
              </P>
            ) : (
              <ButtonWrap>
                <Button>{isLoading ? 'Loading...' : 'Hit me up!'}</Button>
              </ButtonWrap>
            )}
          </ContactForm>
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
        width: 90%;
    }
    @media (max-width: ${get(theme, 'breakpoints.small', '700px')}) {
        width: 100%;
    }
`}
`

const ContactForm = styled.form`
  margin: 0 auto;
  padding: 0 40px;
  border-radius: 3px;

  ${({ theme }: { theme: Theme }) => `
    @media (max-width: ${get(theme, 'breakpoints.medium', '1200px')}) {
        width: 90%;
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
