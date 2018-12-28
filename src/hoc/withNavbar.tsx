import React from 'react'
import Navbar from '../components/Navbar'

function withNavbar(Component: React.ComponentType) {
  return (props: {}) => (
    <div>
      <Navbar />
      <Component {...props} />
    </div>
  )
}

export default withNavbar
