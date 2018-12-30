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

const theme: Theme = {
  palette: {
    white: '#fff',
    black: '#000',
    primary: {
      light: 'string',
      main: 'string',
      dark: 'string'
    },
    secondary: {
      light: 'string',
      main: 'string',
      dark: 'string'
    },
    error: {
      light: 'string',
      main: 'string',
      dark: 'string'
    },
    text: {
      light: 'rgb(230, 241, 255)',
      main: 'rgb(189, 201, 234)',
      dark: 'string',
      highlight: 'rgb(100, 255, 218)'
    },
    background: {
      light: 'string',
      main: 'rgba(21, 23, 39, 0.99)',
      dark: 'rgba(14, 16, 27, 0.99)',
      highlight: 'rgba(100, 255, 218, .1)'
    }
  },
  breakpoints: {
    sm: '1300px',
    md: '1000px',
    lg: '700px'
  }
}

export default theme
