import React from "react"

import MainNavigation from "./Navigation/MainNavigation"
import classes from "./Layout.module.scss"

const Layout = ({ children }) => {
  return (
    <>
      <MainNavigation />
      <main className={classes.main}>{children}</main>
    </>
  )
}

export default Layout
