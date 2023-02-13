import React, { useContext } from "react"
import { NavLink } from "react-router-dom"
import AuthContext from "../../../context/auth-context"

import classes from "./MainNavigation.module.scss"

import useOutsideClick from "../../../hooks/use-outside-click"

const MobileNav = ({ onHide }) => {
  const ref = useOutsideClick(onHide)
  const { isLoggedIn } = useContext(AuthContext)

  return (
    <ul className={classes.mobile} ref={ref}>
      <li>
        <NavLink to="/posts" onClick={onHide}>
          All Posts
        </NavLink>
      </li>
      <li>
        <NavLink to="/new-post" onClick={onHide}>
          Add a Post
        </NavLink>
      </li>
      {isLoggedIn && (
        <li>
          <NavLink to="/profile" onClick={onHide}>
            Profile
          </NavLink>
        </li>
      )}
      {!isLoggedIn && (
        <li>
          <NavLink to="/auth" onClick={onHide}>
            Login
          </NavLink>
        </li>
      )}
    </ul>
  )
}

export default MobileNav
