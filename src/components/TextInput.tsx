import React from 'react'
import styled, { css } from 'styled-components'
import get from 'lodash/get'
import { Theme } from '../theme'

interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  label: string
  name: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  value?: string
  type?: string
  error?: string
  required?: boolean
  placeholder?: string
}

export function Input({ label, ...props }: InputProps) {
  return (
    <div>
      <Label>
        {label}
        <StyledInput {...props} />
      </Label>
    </div>
  )
}

const Label = styled.label`
    text-align: left;
    font-size: 20px;
    ${({ theme }) => `
    @media (max-width: ${get(theme, 'breakpoints.small', '700px')}) {
        font-size: 16px;
      }
  `}
`

const inputStyles = css`
  transition: background-color 0.2s;
  display: block;
  width: 100%;
  padding: 10px 20px;
  margin: 10px 0 20px;
  line-height: 1.6;
  font-size: 20px;
  ${({ theme }) => `
    border: 1px solid ${get(
      theme,
      'palette.text.highlight',
      'rgb(100, 255, 218)'
    )};
    background: none;
    color: ${get(theme, 'palette.text.highlight', 'rgb(100, 255, 218)')};
    ::placeholder {
      color: ${get(theme, 'palette.text.dark', 'rgb(100, 255, 218)')};
    }
    @media (max-width: ${get(theme, 'breakpoints.small', '700px')}) {
        padding: 8px 16px;
        line-height: 1.4;
        font-size: 16px;
      }
  `}

  :hover,
  :focus {
    ${({ theme }) => `
    background-color: ${get(
      theme,
      'palette.background.highlight',
      'rgba(100, 255, 218, .1)'
    )};
  `}

    box-shadow: rgba(2, 12, 27, 0.9) 0px 2px 4px;
  }
`

const StyledInput = styled.input`
  ${inputStyles}
`

interface AreaProps extends React.HTMLAttributes<HTMLTextAreaElement> {
    label: string
    name: string
    onChange: React.ChangeEventHandler<HTMLTextAreaElement>
    value?: string
    type?: string
    error?: string
    required?: boolean
    placeholder?: string
  }

export function TextArea({ label, ...props }: AreaProps) {
    return (
      <div>
        <Label>
          {label}
          <StyledTextArea {...props} />
        </Label>
      </div>
    )
  }

const StyledTextArea = styled.textarea`
  ${inputStyles}
`
