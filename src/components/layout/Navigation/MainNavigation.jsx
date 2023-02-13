import React, { useState } from "react"

import DesktopNav from "./DesktopNav"
import MobileNav from "./MobileNav"

import classes from "./MainNavigation.module.scss"
import closeMenu from "../../../assets/closeMenu.svg"
import openMenu from "../../../assets/openMenu.svg"

const MainNavigation = () => {
  const [isShowed, setIsShowed] = useState(false)

  const showNavHandler = () => {
    setIsShowed(true)
  }

  const hideNavHandler = () => {
    setIsShowed(false)
  }

  return (
    <>
      <header className={classes.header}>
        <div className={classes.logo}>
          <img src="/logo.png" alt="" />
        </div>
        <nav className={classes.nav}>
          {isShowed && <MobileNav onHide={hideNavHandler} />}
          <DesktopNav />
        </nav>
        <div className={classes.menu}>
          {isShowed && <img src={closeMenu} />}
          {!isShowed && <img src={openMenu} onClick={showNavHandler} />}
        </div>
      </header>
    </>
  )
}

export default MainNavigation
