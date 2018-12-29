import React, { Component } from 'react'

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
        <Page>
          <Header />
          <About />
          <Exp />
          <Work />
          <Contact />
          <Footer />
        </Page>
    )
  }
}

export default withNavbar(App)
