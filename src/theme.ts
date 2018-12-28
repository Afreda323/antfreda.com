export interface Theme {
  palette?: {
    white?: string
    black?: string
    primary?: {
      light: string
      main: string
      dark: string
    }
    secondary?: {
      light: string
      main: string
      dark: string
    }
    error?: {
      light: string
      main: string
      dark: string
    }
    text?: {
      light: string
      main: string
      dark: string
      highlight: string
    }
    background?: {
      light: string
      main: string
      dark: string
      highlight: string
    }
  }
  breakpoints?: {
    sm: string
    md: string
    lg: string
  }
}

const theme: Theme = {}

export default theme
