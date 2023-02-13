import React, { useContext } from "react"
import { NavLink } from "react-router-dom"
import AuthContext from "../../../context/auth-context"

import classes from "./MainNavigation.module.scss"

const DesktopNav = () => {
  const { isLoggedIn } = useContext(AuthContext)

  return (
    <ul className={classes.desktop}>
      <li>
        <NavLink to="/posts">All Posts</NavLink>
      </li>
      {isLoggedIn && (
        <>
          <li>
            <NavLink to="/new-post">Add a Post</NavLink>
          </li>
          <li>
            <NavLink to="/profile">Profile</NavLink>
          </li>
        </>
      )}
      {!isLoggedIn && (
        <li>
          <NavLink to="/auth">Login</NavLink>
        </li>
      )}
    </ul>
  )
}

export default DesktopNav
