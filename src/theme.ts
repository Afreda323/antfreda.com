import get from 'lodash/get'

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
    gradients: {
      linear: string
      radial: string
    }
  }
  breakpoints?: {
    small: string
    medium: string
    large: string
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
      main: 'rgb(143, 152, 177)',
      dark: 'rgb(75, 81, 97)',
      highlight: 'rgb(100, 255, 218)'
    },
    background: {
      light: 'rgb(26, 28, 45)',
      main: 'rgba(21, 23, 39, 0.99)',
      dark: 'rgba(14, 16, 27, 0.99)',
      highlight: 'rgba(100, 255, 218, .1)'
    },
    gradients: {
      radial: `radial-gradient(
        ellipse at center, 
        rgba(14, 16, 27, 0.99) 10%, 
        rgba(21, 23, 39, 0.99) 50%, 
        rgba(14, 16, 27, 0.99)
      )`,
      linear: `linear-gradient(
        to top left, 
        rgba(14, 16, 27, 0.99) 10%, 
        rgba(21, 23, 39, 0.99) 50%, 
        rgba(14, 16, 27, 0.99)
      )`
    }
  },
  breakpoints: {
    large: '1600px',
    medium: '1200px',
    small: '700px'
  }
}

export default theme
