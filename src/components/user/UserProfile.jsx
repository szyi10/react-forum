import React, { useContext, useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import { getUserData } from "../../lib/auth"
import AuthContext from "../../context/auth-context"

import classes from "./UserProfile.module.scss"
import { toast } from "react-toastify"

const UserProfile = () => {
  const [user, setUser] = useState({})

  const authCtx = useContext(AuthContext)

  useEffect(() => {
    getUserData(authCtx.token)
      .then((res) => {
        setUser(res)
      })
      .catch((err) => {
        console.log(err)
        authCtx.logout()
        toast.warning("You've been logout due to error. Please try again.")
      })
  }, [setUser, getUserData])

  if (!user.kind) {
    return <p className={classes.user}>Loading...</p>
  }

  const { displayName, createdAt, photoUrl, email } = user.users[0]
  const formattedDate = new Date(parseInt(createdAt)).toLocaleDateString(
    "en-UK"
  )

  return (
    <div className={classes.user}>
      {photoUrl && <img src={photoUrl} className={classes.img} />}
      {!photoUrl && <div className={classes.img} />}
      <h1>{displayName ? displayName : email}</h1>
      <p>Created in: {formattedDate}</p>
      <Outlet />
    </div>
  )
}

export default UserProfile
