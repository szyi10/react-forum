import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import AuthContext from "../../context/auth-context"
import { deleteUser } from "../../lib/auth"

import ProfileForm from "./ProfileForm"
import SecurityForm from "./SecurityForm"
import classes from "./UserSettings.module.scss"

const UserSettings = () => {
  const authCtx = useContext(AuthContext)

  const deleteHandler = () => {
    console.log(authCtx)
    deleteUser(authCtx.token)
    authCtx.logout()
    toast.error("Account deleted.")
  }

  const logoutHandler = () => {
    authCtx.logout()
    toast.info("Logout succesfully!")
  }

  return (
    <div className={classes.user}>
      <Link className="btn-warning" to="/profile">
        Hide Settings
      </Link>
      <ProfileForm />
      <SecurityForm />
      <div className={classes.settings}>
        <button className="btn-warning" onClick={deleteHandler}>
          Delete Account
        </button>
        <button className="btn-warning" onClick={logoutHandler}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default UserSettings
