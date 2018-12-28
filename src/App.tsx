import React, { Component } from 'react'
import { ThemeProvider } from 'styled-components'

import theme from './theme'

import withNavbar from './hoc/withNavbar'

import Page from './components/Page'

import Header from './sections/Header'
import About from './sections/About'
import Exp from './sections/Exp'
import Work from './sections/Work'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Page>
          <Header />
          <About />
          <Exp />
          <Work />
          <Contact />
          <Footer />
        </Page>
      </ThemeProvider>
    )
  }
}

export default withNavbar(App)
