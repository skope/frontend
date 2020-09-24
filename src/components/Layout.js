import React, { Fragment } from 'react'

import Header from './Header'
import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'

const Layout = ({ children }) => {
  return (
    <Fragment>
      <Header />

      <LoginModal />
      <RegisterModal />

      {children}
    </Fragment>
  )
}

export default Layout
